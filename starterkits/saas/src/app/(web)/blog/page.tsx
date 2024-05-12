import {
    WebPageHeader,
    WebPageWrapper,
} from "@/app/(web)/_components/general-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteUrls } from "@/config/urls";
import { getBlogs } from "@/server/actions/blog";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";
import { blogPageConfig } from "@/app/(web)/blog/_constants/page-config";

export const metadata: Metadata = {
    title: blogPageConfig.title,
};

export const dynamic = "force-static";

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <WebPageWrapper>
            <WebPageHeader title="Blog">
                <p className="text-center text-base">
                    <span>Get the latest news and updates</span>
                </p>
            </WebPageHeader>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        All the latest news and updates from our blog
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {blogs?.map((blog) => (
                        <Link
                            href={`${siteUrls.blog}/${blog.metaData.slug}`}
                            key={blog.metaData.slug}
                            className="space-y-4"
                        >
                            <div className="relative h-screen max-h-[350px] w-full overflow-hidden rounded-md bg-muted/60">
                                <Image
                                    src={blog.metaData.thumbnail}
                                    alt={blog.metaData.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h2 className="font-heading text-2xl font-semibold">
                                {blog.metaData.title}
                            </h2>
                            <p>{blog.metaData.description}</p>
                            <div className="grid gap-0.5 font-light">
                                <p className="text-sm text-muted-foreground">
                                    {format(
                                        new Date(blog.metaData.publishedAt),
                                        "PPP",
                                    )}{" "}
                                    • {blog.metaData.readTime} read
                                </p>
                                {blog.metaData.updatedAt && (
                                    <p className="text-sm text-muted-foreground">
                                        Last updated at{" "}
                                        {format(
                                            new Date(blog.metaData.updatedAt),
                                            "PPP",
                                        )}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </WebPageWrapper>
    );
}
