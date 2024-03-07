/**
 * @purpose This file contains all the site urls
 *
 * To add a new URL:
 * 1. Add a new property to the siteUrls object with the URL path.
 * 2. Import the siteUrls object from "@/config/urls" in the file where you want to use the URL.
 * 3. Use the URL in the file.
 */

export const siteUrls = {
    publicUrl: "https://www.rapidlaunch.xyz",
    home: "/",
    auth: {
        login: "/auth/login",
        signup: "/auth/signup",
    },
    pricing: "/pricing",
    features: "/features",
    support: "/support",
    blog: "/blog",
    rapidlaunch: "https://www.rapidlaunch.xyz",
    dashboard: {
        home: "/dashboard",
    },
    organization: {
        members: {
            home: "/org/members",
            invite: "/org/members/invite",
        },
        settings: "/org/settings",
    },
    admin: {
        dashboard: "/admin/dashboard",
        users: "/admin/users",
        blog: "/admin/blog",
        settings: "/admin/settings",
        feedback: "/admin/feedback",
    },
    profile: {
        settings: "/profile/settings",
        billing: "/profile/billing",
    },
    docs: {
        home: "/docs",
    },
} as const;
