import { Background } from "@/components/background";
import { Icons } from "@/components/icons";
import {
    PageActions,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/layout/page-layout";
import { Announcment } from "@/components/marketing/announment";
import { BentoGrid, BentoItem } from "@/components/ui/bento";
import { BorderBeam } from "@/components/ui/border-beam";
import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <Background>
            <section className="flex flex-col items-center justify-center gap-6 py-16">
                <Announcment />

                <div className="grid place-items-center gap-2">
                    <PageHeaderHeading>Copy. Build. Launch.</PageHeaderHeading>
                    <PageHeaderDescription>
                        <span className="font-bold">Open Source </span> SaaS
                        Starterkit, Building Blocks and Guides
                    </PageHeaderDescription>
                    <PageActions>
                        <Link
                            href={siteUrls.docs.base}
                            className={buttonVariants()}
                        >
                            Get Started
                        </Link>
                        <Link
                            href={siteUrls.socials.github}
                            className={buttonVariants({
                                variant: "outline",
                            })}
                        >
                            <Icons.gitHub className="mr-1.5 h-4 w-4" />
                            Github
                        </Link>
                    </PageActions>
                </div>

                <BentoGrid className="w-full max-w-6xl">
                    <BentoItem
                        headingAs="h2"
                        title="Customizable. Extensible. Flexible."
                        description="Open Source SaaS Starterkit built using Next.js 14.2, Shadcn UI, Tailwind CSS, Typescript, NextAuth, Drizzle, and more."
                        wrapperClassName="md:col-span-3 md:aspect-video relative"
                        badge="SaaS Starterkit"
                        href={siteUrls.saasStarterkit.base}
                        cta="Get it Now"
                    >
                        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-border p-4">
                            <Image
                                src="/saasdemo.png"
                                alt="SaaS Demo"
                                fill
                                objectFit="cover"
                                objectPosition="top"
                            />

                            <BorderBeam size={300} duration={12} delay={16} />
                        </div>
                    </BentoItem>

                    <BentoItem
                        headingAs="h2"
                        title="Beautiful Building Blocks"
                        description="Build your SaaS app with our beautiful building blocks. We have a collection of components that you can use to build your app."
                        wrapperClassName="md:col-span-2"
                        badge="Blocks"
                        href={siteUrls.saasStarterkit.base}
                        cta="Coming Soom"
                        ctaDisabled
                    />

                    <BentoItem
                        headingAs="h2"
                        title="Guides"
                        description="Learn how to build your SaaS app with our guides. We have a collection of guides that you can use to build your app."
                        wrapperClassName="md:col-span-1"
                        badge="Guides"
                        href={siteUrls.saasStarterkit.base}
                        cta="Coming Soon"
                        ctaDisabled
                    />
                </BentoGrid>
            </section>
        </Background>
    );
}
