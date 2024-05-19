import {
    WebPageHeader,
    WebPageWrapper,
} from "@/app/(web)/_components/general-components";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { format } from "date-fns";
import Image from "next/image";
import type { Metadata } from "next";
import { changelogPageConfig } from "@/app/(web)/changelogs/_constants/page-config";
import { changelogs } from "@/app/source";
import { type InferPageType } from "fumadocs-core/source";
import { useMDXComponents } from "mdx-components";
import { DocsBody } from "fumadocs-ui/page";

export const metadata: Metadata = {
    title: changelogPageConfig.title,
};

export const dynamic = "force-static";

export default async function ChangeLogPage() {
    //filter changelogs by publishedAt
    const sortedChangelogs = changelogs
        .getPages()
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) -
                Number(new Date(a.data.publishedAt)),
        );

    return (
        <WebPageWrapper>
            <WebPageHeader title="Change Log">
                <p className="text-center text-base">
                    <span>
                        All the latest features, fixes and work to{" "}
                        {siteConfig.name}.
                    </span>
                </p>
            </WebPageHeader>
            <div className="grid w-full max-w-4xl gap-8">
                {sortedChangelogs.map((changelog, index) => (
                    <ChangeLogCard key={index} {...changelog} />
                ))}
            </div>
        </WebPageWrapper>
    );
}

type ChangeLogCardProps = InferPageType<typeof changelogs>;

function ChangeLogCard({ data }: ChangeLogCardProps) {
    const MDX = data.exports.default;

    const components = useMDXComponents();

    return (
        <Card className="overflow-hidden">
            {data?.thumbnail && (
                <div className="relative h-[400px] w-full">
                    <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-3xl">v{data.version}</CardTitle>
                <CardTitle className="text-xl">{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
                <p className="text-sm text-muted-foreground">
                    Published on {format(new Date(data.publishedAt), "PPP")}
                </p>
            </CardHeader>
            <CardContent>
                <DocsBody>
                    <MDX components={components} />
                </DocsBody>
            </CardContent>
        </Card>
    );
}
