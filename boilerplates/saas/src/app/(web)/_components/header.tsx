import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import WebHeaderNav from "@/app/(web)/_components/header-nav";
import { siteConfig } from "@/config/site";
import { badgeVariants } from "@/components/ui/badge";
import { ChevronRightIcon } from "lucide-react";

export default function WebHeader() {
  return (
    <header className="flex h-20 w-screen items-center justify-between px-4 sm:px-12">
      <div className="flex items-center justify-center space-x-4">
        <Link
          href={siteConfig.urls.home}
          className="flex items-center space-x-2 text-xl font-bold transition-transform hover:scale-90"
        >
          <span>{siteConfig.logo}</span>
          <span>{siteConfig.name}</span>
        </Link>

        {/*if there is a promotion in the header, show it here*/}
        {siteConfig.promotions.header && (
          <Link
            href={siteConfig.promotions.header.href}
            className={badgeVariants({
              variant: "secondary",
              size: "lg",
              className: "flex items-center space-x-1",
            })}
          >
            <span>{siteConfig.promotions.header.label}</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-6">
        <WebHeaderNav />

        <section className="flex items-center space-x-2">
          <Link
            href={siteConfig.urls.auth.login}
            className={buttonVariants({ variant: "secondary" })}
          >
            Login
          </Link>
          <Link
            href={siteConfig.urls.auth.signup}
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
