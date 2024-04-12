"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { changePlan } from "@/server/actions/plans/mutations";
import {
    getCheckoutURL,
    getOrgSubscription,
} from "@/server/actions/plans/query";
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
            await startAwaitableTransition(() => {
                router.refresh();
            });
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

        if (!subscription?.id) {
            return getCheckoutURL(variantId);
        } else {
            return await changePlan(subscription?.variantId, variantId!);
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
