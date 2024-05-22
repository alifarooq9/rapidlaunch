import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ClassValue } from "class-variance-authority/types";
import Link from "next/link";
import * as React from "react";

const BentoGrid = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn("grid w-full grid-cols-3 gap-4", className)}
            {...props}
        />
    );
};

interface BentoItemProps {
    title: string;
    description: string;
    badge?: React.ReactNode;
    wrapperClassName?: ClassValue;
    children?: React.ReactNode;
    href?: string;
    cta?: string;
    ctaDisabled?: boolean;
    headingAs?: React.ElementType;
}

const BentoItem = ({
    wrapperClassName,
    title,
    description,
    badge,
    children,
    href,
    cta,
    ctaDisabled,
    headingAs,
}: BentoItemProps) => {
    const HeadingComp = headingAs ?? "h3";

    return (
        <div
            className={cn(
                "flex flex-col items-start justify-start overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-lg",
                wrapperClassName,
            )}
        >
            <div className="p-4">
                {badge && (
                    <Badge
                        className="mb-6 flex-shrink-0 rounded-lg"
                        size="sm"
                        variant="secondary"
                    >
                        {badge}
                    </Badge>
                )}
                <HeadingComp className="text-xl font-semibold">
                    {title}
                </HeadingComp>
                <p className="mt-3 max-w-xl text-muted-foreground">
                    {description}
                </p>
                {href && (
                    <Link
                        aria-disabled={ctaDisabled}
                        href={href}
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                className: "mt-5 flex-shrink-0",
                            }),
                            ctaDisabled && "pointer-events-none opacity-50",
                        )}
                    >
                        {cta ?? "Learn More"}
                    </Link>
                )}
            </div>

            {children && children}
        </div>
    );
};

export { BentoGrid, BentoItem };
