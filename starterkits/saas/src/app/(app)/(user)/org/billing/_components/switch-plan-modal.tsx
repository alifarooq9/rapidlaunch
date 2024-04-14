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
};

export function SwitchPlanModal({
    cardBrand,
    currencyCode,
    currencySymbol,
    lastCardDigits,
    planName,
    price,
    variantId,
}: SwitchPlanModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <AlertDialog open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Switch to {currencySymbol}
                    {price} {currencyCode} per month
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to switch to the {planName} plan?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You will be charged the pro-rated amount for the rest of
                        plan. Your billing card brand{" "}
                        <strong className="capitalize">{cardBrand}</strong>{" "}
                        ending in <strong>{lastCardDigits}</strong> will be
                        charged.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <SubscribeBtn variantId={variantId}>Continue</SubscribeBtn>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
