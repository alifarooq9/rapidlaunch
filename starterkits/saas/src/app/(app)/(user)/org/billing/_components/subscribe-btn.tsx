"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { changePlan } from "@/server/actions/subscription/mutations";
import {
    getCheckoutURL,
    getOrgSubscription,
} from "@/server/actions/subscription/query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SubscribeBtnProps = {
    variantId?: number;
} & ButtonProps;

export function SubscribeBtn({ variantId, ...props }: SubscribeBtnProps) {
    const router = useRouter();

    const [, startAwaitableTransition] = useAwaitableTransition();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const data = await handleSubscription();

            if (typeof data !== "string") {
                await startAwaitableTransition(() => {
                    router.refresh();
                    router.push(siteUrls.organization.plansAndBilling);
                });
            }

            return data;
        },
        onError: (error) => {
            toast.error(error.message ?? "An error occurred.");
        },
        onSuccess: (checkoutUrl) => {
            if (checkoutUrl && typeof checkoutUrl === "string") {
                router.push(checkoutUrl);
            }
        },
    });

    const handleSubscription = async () => {
        const subscription = await getOrgSubscription();

        if (!subscription) {
            return getCheckoutURL(variantId);
        } else {
            return await changePlan(subscription.variant_id, variantId!);
        }
    };

    return (
        <Button
            disabled={isPending || props.disabled}
            onClick={() => mutate()}
            {...props}
        >
            {isPending && <Icons.loader className="mr-2 h-4 w-4" />}
            {props.children}
        </Button>
    );
}
