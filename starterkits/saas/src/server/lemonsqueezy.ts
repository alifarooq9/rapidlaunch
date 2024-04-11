import { env } from "@/env";
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export function configureLemonSqueezy() {
    lemonSqueezySetup({
        apiKey: env.LEMONSQUEEZY_API_KEY,
        onError: (error) => {
            console.error(error);
            throw new Error(`Lemon Squeezy API error: ${error.message}`);
        },
    });
}
