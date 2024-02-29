import { useTransition, type TransitionStartFunction, useEffect } from "react";
import { toast } from "sonner";

type UseOrgTransition = {
    isPending: boolean;
    startTransition: TransitionStartFunction;
};

export const UseOrgTransition: () => UseOrgTransition = () => {
    const [isPending, startTransition] = useTransition();

    const TOAST_ID = "org-transition";

    useEffect(() => {
        if (isPending) {
            toast.loading("Refreshing organization data...", {
                id: TOAST_ID,
            });
        } else {
            toast.dismiss(TOAST_ID);
        }
    }, [isPending]);

    return {
        isPending,
        startTransition,
    };
};
