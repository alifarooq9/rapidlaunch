import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { WebHeaderNav } from "@/app/(web)/_components/header-nav";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import { ThemeToggle } from "@/components/theme-toggle";

export function WebHeader() {
    return (
        <header className="flex h-24 w-screen items-center justify-between px-4 sm:px-12">
            <div className="flex items-center justify-start space-x-4">
                <Link
                    href={siteUrls.home}
                    className="flex items-center space-x-2 text-xl font-medium transition-transform hover:scale-90"
                >
                    <Icons.logo className="h-6 w-6 fill-primary" />
                    <span>{siteConfig.name}</span>
                </Link>
            </div>
            <WebHeaderNav />
            <div className="flex items-center space-x-2">
                <ThemeToggle />
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
