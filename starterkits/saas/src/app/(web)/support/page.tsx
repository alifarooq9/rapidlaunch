import {
    WebPageHeader,
    WebPageWrapper,
} from "@/app/(web)/_components/general-components";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { type SupportInfo, supportInfos } from "@/config/support";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { type Metadata } from "next";
import { supportPageConfig } from "@/app/(web)/support/_constants/page-config";

export const metadata: Metadata = {
    title: supportPageConfig.title,
    description: supportPageConfig.description,
};

export default function ContactPage() {
    return (
        <WebPageWrapper>
            <WebPageHeader
                title={supportPageConfig.title}
                badge="Get in touch with us"
            >
                <p>
                    If you have any questions or need help, feel free to reach
                    out to us.
                </p>
            </WebPageHeader>

            <div className="grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
                {supportInfos.map((supportInfo) => (
                    <SupportCard key={supportInfo.title} {...supportInfo} />
                ))}
            </div>
        </WebPageWrapper>
    );
}

function SupportCard({
    buttonHref,
    buttonText,
    description,
    title,
    email,
}: SupportInfo) {
    return (
        <Card>
            <CardHeader className="flex h-full flex-col items-start justify-between gap-3">
                <div className="flex flex-col gap-2">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                    {email && <p className="text-base text-primary">{email}</p>}
                </div>
                <Link
                    href={buttonHref}
                    className={buttonVariants({
                        className:
                            "w-fit gap-1 transition-all duration-300 ease-in-out hover:gap-3",
                        variant: "secondary",
                    })}
                >
                    <span>{buttonText}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </CardHeader>
        </Card>
    );
}
