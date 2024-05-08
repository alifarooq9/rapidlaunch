"use client";

import { SubscribeBtn } from "@/app/(app)/(user)/org/billing/_components/subscribe-btn";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SwitchPlanModalProps = {
    variantId: number | undefined;
    lastCardDigits: string;
    cardBrand: string;
    currencySymbol: string;
    price: number;
    currencyCode: string;
    planName: string;
    status: string;
};

export function SwitchPlanModal({
    cardBrand,
    currencyCode,
    currencySymbol,
    lastCardDigits,
    planName,
    price,
    variantId,
    status
}: SwitchPlanModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <AlertDialog open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
            <AlertDialogTrigger asChild>
                {status === "active" ? (
                    <Button variant="outline" className="w-full">
                        Switch to {currencySymbol}
                        {price} {currencyCode} per month
                    </Button>
                ) : (
                    <Button variant="outline" className="w-full">
                        Subscribe to {currencySymbol}
                        {price} {currencyCode} per month
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to {status === "active" ? "switch" : "subscribe"} to{" "} {planName} plan?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {status === "active" ? (
                            <p>
                                You are currently subscribed to a different plan. By switching to the <strong>{planName} plan</strong>, your {cardBrand} card ending in {lastCardDigits} will be charged <strong>{price} {currencyCode}</strong> upon confirmation.
                            </p>
                        ) : (
                            <p>
                                By subscribing to the <strong>{planName} plan</strong>, you will be charged <strong>{price} {currencyCode}</strong> upon confirmation. This will be a recurring charge until you cancel your subscription.
                            </p>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <SubscribeBtn variantId={variantId}>{status === "active" ? "Switch" : "Subscribe"}</SubscribeBtn>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
