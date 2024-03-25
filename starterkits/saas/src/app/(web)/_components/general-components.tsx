import { Badge } from "@/components/ui/badge";
import { type ElementType } from "react";

// This is a page wrapper used in all public web pages
export function WebPageWrapper({
    children,
    as,
}: {
    children: React.ReactNode;
    as?: ElementType;
}) {
    const Comp: ElementType = as ?? "main";

    return (
        <Comp className="container flex flex-col items-center justify-center gap-24 py-10">
            {children}
        </Comp>
    );
}

// This is a page heading used in all public web pages
export function WebPageHeading({
    title,
    badge,
    children,
}: {
    title: string;
    badge?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            {badge && (
                <Badge>
                    <p className="text-center text-base">{badge}</p>
                </Badge>
            )}
            <h1 className="max-w-2xl text-center text-5xl font-extrabold leading-none sm:text-7xl">
                {title}
            </h1>

            {children && children}
        </div>
    );
}
