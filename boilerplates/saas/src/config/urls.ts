// Purpose: Export all urls used in the application.

export const siteUrls = {
    publicUrl: "https://www.rapidlaunch.xyz",
    home: "/",
    auth: {
        login: "/auth/login",
        signup: "/auth/signup",
    },
    pricing: "/pricing",
    features: "/features",
    contact: "/contact",
    blog: "/blog",
    rapidlaunch: "https://www.rapidlaunch.xyz",
    dashboard: {
        home: "/dashboard",
        settings: "/dashboard/settings",
        billing: "/dashboard/billing",
    },
} as const;
