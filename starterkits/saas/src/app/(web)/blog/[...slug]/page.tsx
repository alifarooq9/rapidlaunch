import { WebPageWrapper } from "@/app/(web)/_components/general-components";
import { Toc } from "@/components/toc";
import { siteUrls } from "@/config/urls";
import { getBlogs } from "@/server/actions/blog";
import { format } from "date-fns";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

type BlogSlugPageProps = {
    params: {
        slug: string[];
    };
};

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
                            src={blog.metaData.tumbnail}
                            alt={blog.metaData.title}
                            className="rounded-md"
                            fill
                        />
                    </div>
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
