"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { siteUrls } from "@/config/urls";
import { buttonVariants } from "@/components/ui/button";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Promotion() {
    return (
        <section className="flex py-4 w-full items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
                <GlowingStarsTitle>Launch your SaaS in just a few days 🚀</GlowingStarsTitle>
                <div className="sm:flex md:justify-between items-end space-y-4">
                    <GlowingStarsDescription>
                        Rapidlaunch comes with a SaaS starter kit, Blocks and
                        guides, and more, you can launch your SaaS in just a few days.
                        Get started with our starter kits, components, building guides,
                        and more. Customizable.{" "} <span className="font-semibold text-foreground">
                            Open Source.
                        </span>
                    </GlowingStarsDescription>
                    <div className="rounded-full items-center justify-center">
                        <Icon />
                    </div>
                </div>
            </GlowingStarsBackgroundCard>
        </section>
    );
}

const Icon = () => {
    return (
        <Link
            href={siteUrls.github}
            target="_blank"
            className={buttonVariants({ variant: "outline" })}
            rel="noopener noreferrer"
        >
            <p className="text-foreground text-sm w-14 font-semibold">GitHub</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-4 w-4 text-foreground stroke-2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
            </svg>
        </Link>
    );
};


export const GlowingStarsBackgroundCard = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    const [mouseEnter, setMouseEnter] = useState(false);

    return (
        <div
            onMouseEnter={() => {
                setMouseEnter(true);
            }}
            onMouseLeave={() => {
                setMouseEnter(false);
            }}
            className={cn(
                "bg-muted/50 p-4 h-full w-full rounded-[26px] border transition-colors duration-300 ",
                className
            )}
        >
            <div className="flex justify-center items-center">
                <Illustration mouseEnter={mouseEnter} />
            </div>
            <div className="px-2 pb-2">{children}</div>
        </div>
    );
};

export const GlowingStarsDescription = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <p className={cn("text-base text-muted-foreground max-w-[50rem]", className)}>
            {children}
        </p>
    );
};

export const GlowingStarsTitle = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <h2 className={cn("font-bold text-2xl text-foreground pb-2", className)}>
            {children}
        </h2>
    );
};

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
    const stars = 216;
    const columns = 36;

    const [glowingStars, setGlowingStars] = useState<number[]>([]);

    const highlightedStars = useRef<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            highlightedStars.current = Array.from({ length: 20 }, () =>
                Math.floor(Math.random() * stars)
            );
            setGlowingStars([...highlightedStars.current]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="h-48 p-1 w-full"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `1px`,
            }}
        >
            {Array.from({ length: stars }).map((_, starIdx) => {
                const isGlowing = glowingStars.includes(starIdx);
                const delay = (starIdx % 10) * 0.1;
                const staticDelay = starIdx * 0.01;
                return (
                    <div
                        key={`matrix-col-${starIdx}}`}
                        className="relative flex items-center justify-center"
                    >
                        <Star
                            isGlowing={mouseEnter ? true : isGlowing}
                            delay={mouseEnter ? staticDelay : delay}
                        />
                        {mouseEnter && <Glow delay={staticDelay} />}
                        <AnimatePresence mode="wait">
                            {isGlowing && <Glow delay={delay} />}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
    return (
        <motion.div
            key={delay}
            initial={{
                scale: 1,
            }}
            animate={{
                scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
                background: isGlowing ? "#fff" : "#666",
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                delay: delay,
            }}
            className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
        ></motion.div>
    );
};

const Glow = ({ delay }: { delay: number }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                delay: delay,
            }}
            exit={{
                opacity: 0,
            }}
            className="absolute  left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
        />
    );
};
