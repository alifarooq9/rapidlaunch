import { env } from "@/env";
import crypto from "node:crypto";
import { webhookHasMeta } from "@/validations/lemonsqueezy";
import {
    processWebhookEvent,
    storeWebhookEvent,
} from "@/server/actions/subscription/mutations";

export async function POST(request: Request) {
    const rawBody = await request.text();
    const secret = env.LEMONSQUEEZY_WEBHOOK_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(
        request.headers.get("X-Signature") ?? "",
        "utf8",
    );

    if (!crypto.timingSafeEqual(digest, signature)) {
        throw new Error("Invalid signature.");
    }

    const data = JSON.parse(rawBody) as unknown;

    if (webhookHasMeta(data)) {
        const webhookEventId = await storeWebhookEvent(
            data.meta.event_name,
            data,
        );

        // Non-blocking call to process the webhook event.
        void processWebhookEvent(webhookEventId!);

        return new Response("OK", { status: 200 });
    }

    return new Response("Data invalid", { status: 400 });
}
