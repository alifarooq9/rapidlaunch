"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { docsConfig } from "@/config/docs";
import { cn, isLinkActive } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkStyleProps = {
    active?: boolean;
    disabled?: boolean;
    className?: string;
} & VariantProps<typeof buttonVariants>;

function linkStyles({ active, disabled, className, ...props }: LinkStyleProps) {
    return cn(
        buttonVariants({
            variant: active ? "secondary" : "ghost",
            size: props.size,
            ...props,
        }),
        "flex h-8 w-full items-center justify-start gap-3 px-3",
        active ? "font-medium" : "font-normal",
        disabled && "pointer-events-none opacity-50",
        className,
    );
}

export function DocsSidebarNav() {
    const pathname = usePathname();

    const params = pathname.split("/");

    return (
        <nav className="grid gap-4 py-4">
            {docsConfig.nav.map((section) => (
                <section key={section.id} className="grid gap-2">
                    <h2 className="text-sm font-semibold">{section.label}</h2>
                    <ul className="grid gap-1">
                        <Accordion
                            type="multiple"
                            key={section.id}
                            defaultValue={[params[3]!]}
                            className="grid gap-1"
                        >
                            {section.items.map((mainItem) => {
                                if (mainItem.subItems) {
                                    return (
                                        <AccordionItem
                                            key={mainItem.id}
                                            value={mainItem.id}
                                            defaultChecked={
                                                params[2] === mainItem.id
                                            }
                                        >
                                            <AccordionTrigger
                                                className={linkStyles({
                                                    className:
                                                        "justify-between",
                                                })}
                                            >
                                                <span className="truncate">
                                                    {mainItem.label}
                                                </span>
                                                {mainItem.badge && (
                                                    <Badge
                                                        variant="secondary"
                                                        size="sm"
                                                    >
                                                        {mainItem.badge}
                                                    </Badge>
                                                )}
                                            </AccordionTrigger>
                                            <AccordionContent
                                                className={cn(
                                                    "relative w-full pl-4 pt-1",
                                                )}
                                            >
                                                <ul className="grid gap-1">
                                                    {mainItem.subItems.map(
                                                        (subItem) => (
                                                            <li
                                                                key={subItem.id}
                                                            >
                                                                <NavLink
                                                                    href={
                                                                        subItem.href
                                                                    }
                                                                    label={
                                                                        subItem.label
                                                                    }
                                                                    pathname={
                                                                        pathname
                                                                    }
                                                                    disabled={
                                                                        subItem.disabled
                                                                    }
                                                                    badge={
                                                                        subItem.badge
                                                                    }
                                                                />
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>

                                                <Separator
                                                    orientation="vertical"
                                                    className="absolute bottom-0 left-2 right-auto"
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                }

                                return (
                                    <li key={mainItem.id} className="w-full">
                                        <NavLink
                                            href={mainItem.href}
                                            label={mainItem.label}
                                            pathname={pathname}
                                            disabled={mainItem.disabled}
                                            badge={mainItem.badge}
                                        />
                                    </li>
                                );
                            })}
                        </Accordion>
                    </ul>
                </section>
            ))}
        </nav>
    );
}

type NavLinkProps = {
    label: string;
    href: string;
    pathname: string;
    className?: string;
    disabled?: boolean;
    badge?: string;
};

function NavLink(props: NavLinkProps) {
    return (
        <Link
            href={props.href}
            className={linkStyles({
                active: isLinkActive(props.href, props.pathname),
                className: props.className,
                disabled: props.disabled,
            })}
        >
            <span>{props.label}</span>
            {props.badge && (
                <Badge variant={"secondary"} size="sm">
                    {props.badge}
                </Badge>
            )}
        </Link>
    );
}
