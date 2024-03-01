"use client";

import {
    type TransitionFunction,
    useCallback,
    useEffect,
    useRef,
    useTransition,
} from "react";

export function useAwaitableTransition(): [
    boolean,
    (callback: TransitionFunction) => Promise<unknown>,
] {
    const [isPending, startTransition] = useTransition();
    const resolveRef = useRef<(value?: unknown) => void>();
    const rejectRef = useRef<(reason?: unknown) => void>();

    const wrappedStartTransition = useCallback(
        (callback: TransitionFunction) => {
            return new Promise((resolve, reject) => {
                rejectRef.current?.();

                resolveRef.current = resolve;
                rejectRef.current = reject;

                startTransition(() => {
                    callback();
                });
            });
        },
        [startTransition, rejectRef],
    );

    useEffect(() => {
        if (!isPending) {
            resolveRef.current?.();

            resolveRef.current = undefined;
            rejectRef.current = undefined;
        }
    }, [isPending]);

    return [isPending, wrappedStartTransition];
}
