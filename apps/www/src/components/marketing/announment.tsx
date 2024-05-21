import { Icons } from "@/components/icons";
import { badgeVariants } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { siteUrls } from "@/config/urls";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Announcment() {
    return (
        <Link
            href={siteUrls.marketing.earlyAccess}
            className={cn(
                badgeVariants({
                    variant: "outline",
                    className:
                        "relative transition-all hover:border-primary/30",
                }),
            )}
        >
            Get Early Access for SaaS Starterkit
            <Icons.externalLink className="ml-2 h-3.5 w-3.5" />
            <BorderBeam size={40} duration={5} borderWidth={2} delay={16} />
        </Link>
    );
}
