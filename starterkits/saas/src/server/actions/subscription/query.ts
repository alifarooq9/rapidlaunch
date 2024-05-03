"use server";

import { pricingPlans } from "@/config/pricing";
import { siteUrls } from "@/config/urls";
import { env } from "@/env";
import { getAbsoluteUrl } from "@/lib/utils";
import { getOrganizations } from "@/server/actions/organization/queries";
import { getUser } from "@/server/auth";
import { db } from "@/server/db";
import { subscriptions } from "@/server/db/schema";
import { configureLemonSqueezy } from "@/server/lemonsqueezy";
import { protectedProcedure } from "@/server/procedures";
import {
    createCheckout,
    getSubscription,
    listSubscriptions,
    listOrders,
    type Subscription,
} from "@lemonsqueezy/lemonsqueezy.js";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { eachMonthOfInterval, format, startOfMonth, subMonths } from "date-fns";

export async function getCheckoutURL(variantId?: number, embed = false) {
    await protectedProcedure();
    configureLemonSqueezy();

    const user = await getUser();

    const { currentOrg } = await getOrganizations();

    if (!user || !currentOrg) {
        return redirect(siteUrls.auth.login);
    }

    if (!variantId) {
        return redirect(siteUrls.dashboard.home);
    }

    const checkout = await createCheckout(
        env.LEMONSQUEEZY_STORE_ID,
        variantId,
        {
            checkoutOptions: {
                embed,
                media: false,
                logo: !embed,
                dark: true,
            },
            checkoutData: {
                email: currentOrg.email ?? undefined,
                custom: {
                    user_id: user.id,
                    org_id: currentOrg.id,
                },
            },
            productOptions: {
                redirectUrl: getAbsoluteUrl(
                    siteUrls.organization.plansAndBilling,
                ),
                receiptButtonText: "Go to Dashboard",
                receiptThankYouNote: "Thank you for signing up to RapidLaunch!",
            },
            testMode: true,
        },
    );

    return checkout.data?.data.attributes.url;
}

export async function getOrgSubscription() {
    try {
        await protectedProcedure();
        configureLemonSqueezy();

        const { currentOrg } = await getOrganizations();

        const orgSubscription = await db.query.subscriptions.findFirst({
            where: eq(subscriptions.orgId, currentOrg.id),
        });

        if (!orgSubscription) {
            return null;
        }

        const lemonSubscription = await getSubscription(
            orgSubscription?.lemonSqueezyId,
        );

        if (!lemonSubscription.data?.data) {
            return null;
        }

        const customerPortalUrl =
            lemonSubscription.data.data.attributes.urls.customer_portal;

        // add plan details to the subscription
        const plan = pricingPlans.find(
            (p) =>
                p.variantId?.monthly === orgSubscription?.variantId ||
                p.variantId?.yearly === orgSubscription?.variantId,
        );

        return {
            ...lemonSubscription.data.data.attributes,
            lemonSqueezyId: lemonSubscription.data.data.id,
            customerPortalUrl,
            id: orgSubscription.id,
            plan,
        };
    } catch (error) {
        return null;
    }
}

type SubscriptionCountByMonth = {
    status?: Subscription["data"]["attributes"]["status"];
};

export async function getSubscriptionsCount({
    status,
}: SubscriptionCountByMonth) {
    await protectedProcedure();
    configureLemonSqueezy();

    const dateBeforeMonths = subMonths(new Date(), 6);

    const startDateOfTheMonth = startOfMonth(dateBeforeMonths);

    const subscriptions = await listSubscriptions({
        filter: {
            storeId: env.LEMONSQUEEZY_STORE_ID,
            status,
        },
    });

    const months = eachMonthOfInterval({
        start: startDateOfTheMonth,
        end: new Date(),
    });

    const subscriptionsCountByMonth = months.map((month) => {
        const monthStr = format(month, "MMM-yyy");
        const count =
            subscriptions.data?.data.filter(
                (subscription) =>
                    format(
                        new Date(subscription.attributes.created_at),
                        "MMM-yyy",
                    ) === monthStr,
            )?.length ?? 0;
        return { Date: monthStr, SubsCount: count };
    });

    return {
        totalCount: subscriptions.data?.data.length ?? 0,
        subscriptionsCountByMonth,
    };
}

export async function getRevenueCount() {
    await protectedProcedure();
    configureLemonSqueezy();

    const dateBeforeMonths = subMonths(new Date(), 6);

    const startDateOfTheMonth = startOfMonth(dateBeforeMonths);

    const orders = await listOrders({
        filter: {
            storeId: env.LEMONSQUEEZY_STORE_ID,
        },
    });

    const totalRevenue =
        orders.data?.data.reduce(
            (acc, order) => acc + order.attributes.total,
            0,
        ) ?? 0;

    const months = eachMonthOfInterval({
        start: startDateOfTheMonth,
        end: new Date(),
    });

    const revenueCountByMonth = months.map((month) => {
        const monthStr = format(month, "MMM-yyy");
        const revenueCount =
            orders.data?.data
                .filter(
                    (order) =>
                        format(
                            new Date(order.attributes.created_at),
                            "MMM-yyy",
                        ) === monthStr,
                )
                ?.reduce((acc, order) => acc + order.attributes.total, 0) ?? 0;

        const count = revenueCount / 100;
        return { Date: monthStr, RevenueCount: count };
    });

    return {
        totalRevenue: totalRevenue / 100,
        revenueCountByMonth,
    };
}
