import { WebPageWrapper } from "@/app/(web)/_components/general-components";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { blogs } from "@/app/source";
import { useMDXComponents } from "mdx-components";
import { DocsBody } from "fumadocs-ui/page";

export const dynamic = "force-static";

type BlogSlugPageProps = {
    params: {
        slug: string[];
    };
};

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
    const blog = blogs.getPage(params.slug);

    if (blog == null) {
        notFound();
    }

    const MDX = blog.data.exports.default;

    const components = useMDXComponents();

    return (
        <WebPageWrapper className="relative max-w-3xl flex-row items-start gap-8">
            <article className="w-full space-y-10">
                <div className="space-y-4">
                    <h1 className="scroll-m-20 font-heading text-4xl font-bold">
                        {blog.data.title}
                    </h1>

                    <div className="relative aspect-video max-h-[350px] w-full overflow-hidden rounded-md bg-muted/60">
                        <Image
                            src={blog.data.thumbnail}
                            alt={blog.data.title}
                            className="rounded-md"
                            fill
                        />
                    </div>
                    {blog.data.tags && blog.data.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {blog.data.tags.map((tag) => (
                                <Badge variant="outline" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <p className="text-sm text-muted-foreground">
                        {format(new Date(blog.data.publishedAt), "PPP")} •{" "}
                        {blog.data.readTime} read
                    </p>

                    {blog.data.exports.lastModified && (
                        <p className="text-sm text-muted-foreground">
                            Last updated at{" "}
                            {format(
                                new Date(blog.data.exports.lastModified),
                                "PPP",
                            )}
                        </p>
                    )}
                </div>
                <DocsBody>
                    <MDX components={components} />
                </DocsBody>
            </article>
        </WebPageWrapper>
    );
}

export async function generateStaticParams() {
    return blogs.getPages().map((page) => ({
        slug: page.slugs,
    }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
    const page = blogs.getPage(params.slug);

    if (page == null) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    } satisfies Metadata;
}
