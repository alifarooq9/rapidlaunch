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
import { createCheckout, getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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
    configureLemonSqueezy();
    await protectedProcedure();

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

    const customerPortalUrl =
        lemonSubscription.data?.data?.attributes?.urls?.customer_portal;

    // add plan details to the subscription
    const plan = pricingPlans.find(
        (p) =>
            p.variantId?.monthly === orgSubscription?.variantId ||
            p.variantId?.yearly === orgSubscription?.variantId,
    );

    return {
        ...orgSubscription,
        customerPortalUrl,
        plan,
    };
}
