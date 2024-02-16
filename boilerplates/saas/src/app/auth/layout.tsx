import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { siteUrls } from "@/config/urls";
import Link from "next/link";

type AuthLayoutProps = {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="grid min-h-screen w-screen grid-cols-3">
            <main className="col-span-2 flex items-center justify-center">
                {children}
            </main>
            <aside className="col-span-1 flex flex-col items-start justify-center gap-6 border-l border-border bg-muted/30 p-10">
                <h3 className="flex items-center justify-center space-x-2">
                    <Icons.logo className="h-6 w-6 fill-primary" />
                    <span className="text-xl font-semibold">
                        {siteConfig.name}
                    </span>
                </h3>
                <h2 className="text-3xl font-medium">
                    Build and launch your SaaS this weekend
                </h2>
                <p className="font-light text-muted-foreground">
                    Say goodbye to long development cycles. Build and launch
                    your SaaS faster with our elite boilerplate. Start today!{" "}
                    <Link
                        href={siteUrls.rapidlaunch}
                        className="font-medium text-foreground underline underline-offset-4"
                    >
                        Rapidlaunch.xyz
                    </Link>
                </p>
            </aside>
        </div>
    );
}
