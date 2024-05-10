/**
 * This file contains the pricing data for the pricing page.
 *
 * @add a new pricing plan, add a new object to the `pricing` array.
 * 1. Add id to the pricingIds object then use it as the id of the new pricing object.
 * 2. Add badge(optional), title, description, price, currency, duration, highlight, popular, and uniqueFeatures(optional) to the new pricing object.
 * 3. if the new pricing plan has unique features, add a new object to the `uniqueFeatures` array.
 *
 * @add a new feature, add a new object to the `features` array.
 * 1. Add id to the features object then use it as the id of the new feature object.
 * 2. Add title and inludedIn to the new feature object. (inludedIn is an array of pricing plan ids that include this feature)
 */

export type PrincingPlan = {
    id: string;
    badge?: string;
    title: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    currency: {
        code: string;
        symbol: string;
    };
    duration: string;
    highlight: string;
    buttonHighlighted: boolean;
    uniqueFeatures?: string[];
    variantId?: {
        monthly: number;
        yearly: number;
    };
};

export type PricingFeature = {
    id: string;
    title: string;
    inludedIn: string[];
};

export const pricingIds = {
    free: "free",
    pro: "pro",
    premium: "premium",
} as const;

export const pricingFeatures: PricingFeature[] = [
    {
        id: "1",
        title: "SSO with unlimited social connections and MFA",
        inludedIn: [pricingIds.free, pricingIds.pro, pricingIds.premium],
    },
    {
        id: "2",
        title: "Custom domains",
        inludedIn: [pricingIds.free, pricingIds.pro, pricingIds.premium],
    },
    {
        id: "3",
        title: "Basic role and permission management",
        inludedIn: [pricingIds.free, pricingIds.pro, pricingIds.premium],
    },
    {
        id: "4",
        title: "View and manage users",
        inludedIn: [pricingIds.free, pricingIds.pro, pricingIds.premium],
    },
    {
        id: "5",
        title: "Custom Branding",
        inludedIn: [pricingIds.pro, pricingIds.premium],
    },
    {
        id: "7",
        title: "Rapidlaunch Branding",
        inludedIn: [pricingIds.pro, pricingIds.premium],
    },
    {
        id: "8",
        title: "Custom Branding",
        inludedIn: [pricingIds.pro, pricingIds.premium],
    },
    {
        id: "9",
        title: "Up to 2,000 machine to machine (M2M) connections",
        inludedIn: [pricingIds.pro, pricingIds.premium],
    },
    {
        id: "10",
        title: "Rapidlaunch Branding",
        inludedIn: [pricingIds.premium],
    },
    {
        id: "11",
        title: "Custom Branding",
        inludedIn: [pricingIds.premium],
    },
    {
        id: "12",
        title: "Up to 2,000 machine to machine (M2M) connections",
        inludedIn: [pricingIds.premium],
    },
    {
        id: "13",
        title: "Rapidlaunch Branding",
        inludedIn: [pricingIds.premium],
    },
];

export const pricingPlans: PrincingPlan[] = [
    {
        id: pricingIds.free,
        title: "Free",
        description:
            "Everything you need to get started with 10,500 free MAU. No setup fees, monthly fees, or hidden fees.",
        price: {
            monthly: 0,
            yearly: 0,
        },
        currency: {
            code: "USD",
            symbol: "$",
        },
        duration: "Forever",
        highlight:
            "No credit card required. 30-day money-back guarantee. No hidden fees.",
        buttonHighlighted: false,
        uniqueFeatures: ["Up to 2,000 machine to machine (M2M) connections"],
    },
    {
        id: pricingIds.pro,
        badge: "Most Popular",
        title: "Pro",
        description:
            "Advanced features to help you scale any business without limits.",
        price: {
            monthly: 99,
            yearly: 999,
        },
        variantId: { monthly: 362869, yearly: 362870 },
        currency: {
            code: "USD",
            symbol: "$",
        },
        duration: "per month",
        highlight:
            "No credit card required. 30-day money-back guarantee. No hidden fees.",
        buttonHighlighted: true,
        uniqueFeatures: ["Up to 5,000 machine to machine (M2M) connections"],
    },
    {
        id: pricingIds.premium,
        title: "Premium",
        description:
            "For teams with more complex needs requiring the highest levels of support.",
        price: {
            monthly: 199,
            yearly: 1999,
        },
        variantId: { monthly: 362872, yearly: 362874 },
        currency: {
            code: "USD",
            symbol: "$",
        },
        duration: "per month",
        highlight:
            "No credit card required. 30-day money-back guarantee. No hidden fees.",
        buttonHighlighted: false,
        uniqueFeatures: ["Up to 100,000 machine to machine (M2M) connections"],
    },
];
