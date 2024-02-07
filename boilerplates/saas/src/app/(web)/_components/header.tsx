import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import WebHeaderNav from "@/app/(web)/_components/header-nav";
import { siteConfig } from "@/config/site";
import { badgeVariants } from "@/components/ui/badge";
import { ChevronRightIcon } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import { promotions } from "@/config/promotions";

export default function WebHeader() {
    return (
        <header className="flex h-20 w-screen items-center justify-between px-4 sm:px-12">
            <div className="flex items-center justify-center space-x-4">
                <Link
                    href={siteUrls.home}
                    className="flex items-center space-x-2 text-xl font-bold transition-transform hover:scale-90"
                >
                    <Icons.logo className="h-6 w-6 fill-primary" />
                    <span>{siteConfig.name}</span>
                </Link>

                {/*if there is a promotion in the header, show it here*/}
                {promotions.header && (
                    <Link
                        href={promotions.header.href}
                        className={badgeVariants({
                            variant: "secondary",
                            size: "lg",
                            className: "flex items-center space-x-1",
                        })}
                    >
                        <span>{promotions.header.label}</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                )}
            </div>
            <div className="flex items-center space-x-6">
                <WebHeaderNav />

                <section className="flex items-center space-x-2">
                    <Link
                        href={siteUrls.auth.login}
                        className={buttonVariants({ variant: "secondary" })}
                    >
                        Login
                    </Link>
                    <Link
                        href={siteUrls.auth.signup}
                        className={buttonVariants({
                            className: "flex items-center space-x-1",
                        })}
                    >
                        <span>Sign Up</span>
                        <span className="font-normal"> — it&apos;s free</span>
                    </Link>
                </section>
            </div>
        </header>
    );
}
