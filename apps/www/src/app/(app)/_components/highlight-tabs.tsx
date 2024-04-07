import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TabsProps } from "@radix-ui/react-tabs";
import { SaasStarterkitHighlight } from "@/app/(app)/_components/saas-startkit-highlight";

const highlights = [
    {
        id: "saas-starterkit",
        title: "SaaS Starterkit",
        description:
            "Auth, Dashboard, Landing Pages, billing and more — everything you need to launch your MVP faster.",
        badge: "Almost Ready",
    },
    {
        id: "blocks",
        title: "Blocks",
        description:
            "Auth forms, modals, hero sections, pricing tables, and more — all customizable and open source.",
        disabled: true,
        badge: "Coming Soon",
    },
    {
        id: "guides",
        title: "Guides",
        description:
            "Authenticating users, setting up billing, and more — all the guides you need to launch your app.",
        disabled: true,
        badge: "Coming Soon",
    },
];

type HighlightNavProps = TabsProps;

export function HighlightTabs({ className, ...props }: HighlightNavProps) {
    return (
        <Tabs
            className={cn("space-y-10", className)}
            defaultValue={highlights[0]?.id}
            {...props}
        >
            <TabsList className="grid h-auto grid-cols-3 items-start bg-transparent p-0">
                {highlights.map((highlight) => (
                    <TabsTrigger
                        value={highlight.id}
                        key={highlight.id}
                        disabled={highlight.disabled}
                        className="group flex flex-col items-start justify-start gap-2 whitespace-normal rounded-none border-t py-6 text-start data-[state=active]:border-primary data-[state=active]:shadow-none"
                    >
                        <div className="flex items-center gap-2">
                            <h2 className="font-medium">{highlight.title}</h2>
                            {highlight?.badge && (
                                <span className="rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                    {highlight.badge}
                                </span>
                            )}
                        </div>
                        <p className="font-normal text-muted-foreground transition-all">
                            {highlight.description}
                        </p>
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="saas-starterkit">
                <SaasStarterkitHighlight />
            </TabsContent>
        </Tabs>
    );
}
