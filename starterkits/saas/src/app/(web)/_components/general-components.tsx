import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type ElementType } from "react";
import Balancer from "react-wrap-balancer";

// This is a page wrapper used in all public web pages
export function WebPageWrapper({
    children,
    as,
    className,
}: {
    children: React.ReactNode;
    as?: ElementType;
    className?: string;
}) {
    const Comp: ElementType = as ?? "main";

    return (
        <Comp
            className={cn(
                "container flex flex-col items-center justify-center gap-24 py-10",
                className,
            )}
        >
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-muted-foreground/25 [mask-image:radial-gradient(100%_150%_at_top,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                />
            </svg>
            {children}
        </Comp>
    );
}

// This is a page heading used in all public web pages
export function WebPageHeader({
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
            <Balancer
                as="h1"
                className="max-w-2xl text-center font-heading text-5xl font-bold leading-none sm:text-5xl"
            >
                {title}
            </Balancer>

            {children && children}
        </div>
    );
}
