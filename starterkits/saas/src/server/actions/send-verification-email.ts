"use server";

import { type SendVerificationRequestParams } from "next-auth/providers/email";
import { resend } from "@/server/resend";
import { siteConfig } from "@/config/site";
import { siteUrls } from "@/config/urls";

interface SendVerificationEmailProps {
    params: SendVerificationRequestParams;
}

// Send a verification email to the user

export async function sendVerificationEmail({
    params,
}: SendVerificationEmailProps) {
    try {
        //send email to user via resend
        await resend.emails.send({
            from: siteConfig.noReplyEmail,
            to: params.identifier,
            subject: `Verify your email address | ${siteConfig.name}`,
            html: `
                <div>
                    <a href="${siteUrls.rapidlaunch}">${siteConfig.name}</a>
                    <h1>🪄 Your magic link</h1>
                    <p>
                        Click the link below to verify your email address and
                        sign in.
                    </p>
                    <a href="${params.url}">Verify your email</a>

                    <p> or </p>

                    <p>
                        Copy and paste the following link in your browser:
                        <br />
                        ${params.url}
                    </p>

                    <hr />
                    <p>
                        If you didn't request this email, you can ignore it.
                    </p>
                </div>`,
            text: `Click the link below to verify your email address and sign in. ${params.url}`,
            tags: [
                {
                    name: "category",
                    value: "confirm_email",
                },
            ],
        });
    } catch (error) {
        throw new Error("Failed to send verification email");
    }
}
