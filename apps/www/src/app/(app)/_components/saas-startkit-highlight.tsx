import { badgeVariants } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteUrls } from "@/config/urls";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const saasStarterkitHighlights = [
    {
        id: "user-dashboard",
        title: "User Dashboard",
        imageLight:
            "https://utfs.io/f/43bbc3c8-cf3c-4fae-a0eb-9183f1779489-294m81.png",
        imageDark:
            "https://utfs.io/f/fddea366-51c6-45f4-bd54-84d273ad9fb9-1ly324.png",
    },
    {
        id: "auth",
        title: "Authentication",
        imageLight:
            "https://utfs.io/f/805616c1-22b8-4508-9890-9ba9e2867a41-p24dnn.png",
        imageDark:
            "https://utfs.io/f/9074c0de-d9ea-4c0b-9d49-55dca1253a3f-6ig3yq.png",
    },
    {
        id: "user-settings",
        title: "User Settings",
        imageLight:
            "https://utfs.io/f/da560e34-84ca-4283-8060-65d727def753-eqmy3s.png",
        imageDark:
            "https://utfs.io/f/e365451e-1a36-43a7-8d1c-7315e5aae430-63u1th.png",
    },
    {
        id: "Users-management",
        title: "Users Management",
        imageLight:
            "https://utfs.io/f/72a2c035-69e0-46ca-84a8-446e4dabf77c-3koi6e.png",
        imageDark:
            "https://utfs.io/f/89099112-4273-4375-9e44-1b3394600e21-c6ikq1.png",
    },
];

export function SaasStarterkitHighlight() {
    return (
        <div className="space-y-4">
            <p className="gap-2 text-center text-sm sm:text-left">
                For more information, Visit the{" "}
                <Link
                    href={siteUrls.saasStarterkit}
                    className={badgeVariants({
                        variant: "secondary",
                        className: "ml-1 mt-1 gap-0.5 sm:mt-0",
                    })}
                >
                    <span>SaaS Starterkit</span>
                    <ArrowRightIcon className="h-3 w-3" />
                </Link>
            </p>
            <Tabs defaultValue="user-dashboard" className="h-auto">
                <TabsList className="h-auto flex-wrap items-center justify-center gap-2 bg-transparent p-0 sm:justify-start">
                    {saasStarterkitHighlights.map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="data-[state=active]:bg-secondary"
                        >
                            {tab.title}
                        </TabsTrigger>
                    ))}

                    <Link
                        href={siteUrls.saasStarterkit}
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                            className: "gap-1",
                        })}
                    >
                        <span>View all</span>
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </TabsList>
                {saasStarterkitHighlights.map((tab) => (
                    <TabsContent
                        className="relative aspect-video rounded-md bg-muted"
                        key={tab.id}
                        value={tab.id}
                    >
                        <Image
                            src={tab.imageLight}
                            alt={tab.title}
                            fill
                            className="block rounded-md border border-border dark:hidden"
                            priority
                        />

                        <Image
                            src={tab.imageDark}
                            alt={tab.title}
                            fill
                            className="hidden rounded-md border border-border dark:block"
                            priority
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
