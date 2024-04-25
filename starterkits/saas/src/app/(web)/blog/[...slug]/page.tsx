import { WebPageWrapper } from "@/app/(web)/_components/general-components";
import { Badge } from "@/components/ui/badge";
import { siteUrls } from "@/config/urls";
import { getBlogs } from "@/server/actions/blog";
import { format } from "date-fns";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-static";

type BlogSlugPageProps = {
    params: {
        slug: string[];
    };
};

export async function generateStaticParams() {
    const blogs = await getBlogs();

    return blogs.map((blog) => ({
        slug: blog.metaData.slug.split("/"),
    }));
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
    if (!params.slug) {
        return redirect(siteUrls.blog);
    }

    const slug = params.slug.join("/");

    const blog = (await getBlogs()).find((b) => b.metaData.slug === slug);

    if (!blog) {
        return notFound();
    }

    return (
        <WebPageWrapper className="relative max-w-3xl flex-row items-start gap-8">
            <article className="w-full space-y-10">
                <div className="space-y-4">
                    <h1 className="scroll-m-20 font-heading text-4xl font-bold">
                        {blog.metaData.title}
                    </h1>

                    <div className="relative aspect-video max-h-[350px] w-full overflow-hidden rounded-md bg-muted/60">
                        <Image
                            src={blog.metaData.thumbnail}
                            alt={blog.metaData.title}
                            className="rounded-md"
                            fill
                        />
                    </div>
                    {blog.metaData?.tags && blog.metaData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {blog.metaData.tags.map((tag) => (
                                <Badge variant="outline" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                        {format(new Date(blog.metaData.publishedAt), "PPP")} •{" "}
                        {blog.metaData.readTime} read
                    </p>

                    {blog.metaData.updatedAt && (
                        <p className="text-sm text-muted-foreground">
                            Last updated at{" "}
                            {format(new Date(blog.metaData.updatedAt), "PPP")}
                        </p>
                    )}
                </div>
                {blog.content}
            </article>
        </WebPageWrapper>
    );
}
