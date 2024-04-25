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
import { getChangelogs } from "@/server/actions/changelog";
import { format } from "date-fns";
import Image from "next/image";

export const dynamic = "force-static";

export default async function ChangeLogPage() {
    //filter changelogs by date
    const changelogs = (await getChangelogs()).sort(
        (a, b) =>
            Number(new Date(b.metaData.publishedAt)) -
            Number(new Date(a.metaData.publishedAt)),
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
                {changelogs.map((changelog) => (
                    <ChangeLogCard
                        key={changelog.metaData.slug}
                        {...changelog}
                    />
                ))}
            </div>
        </WebPageWrapper>
    );
}

type ChangeLogCardProps = Awaited<ReturnType<typeof getChangelogs>>[number];

function ChangeLogCard({ metaData, content }: ChangeLogCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-[400px] w-full">
                <Image
                    src={metaData.thumbnail}
                    alt={metaData.title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
                <CardTitle className="text-3xl">v{metaData.version}</CardTitle>
                <CardTitle className="text-xl">{metaData.title}</CardTitle>
                <CardDescription>{metaData.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Published on {format(new Date(metaData.publishedAt), "PPP")}
                </p>

                {content}
            </CardContent>
        </Card>
    );
}
