import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import { getUser } from "@/server/auth";
import Link from "next/link";
import { Fragment } from "react";

export async function HeaderAuth() {
    const user = await getUser();

    return (
        <section className="flex items-center space-x-2">
            {user ? (
                <Link
                    href={siteUrls.dashboard.home}
                    className={buttonVariants({
                        className: "flex items-center space-x-1",
                    })}
                >
                    <span>Dashboard</span>
                </Link>
            ) : (
                <Fragment>
                    <Link
                        href={siteUrls.auth.signup}
                        className={buttonVariants({
                            className: "flex items-center space-x-1",
                        })}
                    >
                        <span>Sign Up</span>
                        <span className="font-light italic">
                            {" "}
                            — it&apos;s free
                        </span>
                    </Link>
                </Fragment>
            )}
        </section>
    );
}
