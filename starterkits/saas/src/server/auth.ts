import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";

import { db } from "@/server/db";
import { createTable, users } from "@/server/db/schema";
import { siteUrls } from "@/config/urls";

//Next Auth Providers
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { sendVerificationEmail } from "@/server/actions/send-verification-email";
import { env } from "@/env";
import { eq } from "drizzle-orm";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
type UserRole = typeof users.$inferSelect.role;

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: UserRole;
            createdAt: Date;
            emailVerified: Date | null;
            isNewUser: boolean;
            // ...other properties
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        role: UserRole;
        createdAt: Date;
        emailVerified: Date | null;
        isNewUser: boolean;
        // ...other properties
    }
}

/**
 * Module augmentation for `next-auth/jwt` types. Allows us to add custom properties to the `jwt`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth/jwt" {
    // /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        id: string;
        role: UserRole;
        createdAt: Date;
        emailVerified: Date | null;
        isNewUser: boolean;
        // ...other properties
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ token, session }) {
            if (token) {
                // Add the user id to the session, so it's available in the client app
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.role = token.role;
                session.user.createdAt = token.createdAt;
                session.user.emailVerified = token.emailVerified;
                session.user.isNewUser = token.isNewUser;
            }

            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await db.query.users.findFirst({
                where: eq(users.email, token.email!),
            });

            if (!dbUser) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }

            return {
                id: dbUser.id,
                role: dbUser.role,
                createdAt: dbUser.createdAt,
                emailVerified: dbUser.emailVerified,
                email: dbUser.email,
                name: dbUser.name,
                picture: dbUser.image,
                isNewUser: dbUser.isNewUser,
            };
        },
    },

    secret: env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    adapter: DrizzleAdapter(db, createTable) as Adapter,
    pages: {
        signIn: siteUrls.auth.login,
        signOut: siteUrls.auth.login,
        error: siteUrls.auth.login,
        verifyRequest: siteUrls.auth.login,
    },
    providers: [
        EmailProvider({
            async sendVerificationRequest(params) {
                return await sendVerificationEmail({ params });
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

/**
 * Get the current user from the session. This is a convenience function so that you don't need to import the `getServerSession` and `authOptions` in every file.
 *
 * @returns The user object or `null` if the user is not authenticated.
 */
export const getUser = async () => {
    const session = await getServerAuthSession();
    return session?.user ?? null;
};
