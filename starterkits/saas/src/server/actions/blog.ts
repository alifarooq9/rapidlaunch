import "server-only";

import { getMDXData } from "@/lib/mdx";
import { type BlogMetaData, blogMetaSchema } from "@/validations/mdx-content";

export async function getBlogs() {
    const dir = "src/content/blog";
    return (await getMDXData<BlogMetaData>(dir, blogMetaSchema)).filter(
        (blog) => !blog.metaData.isDraft,
    );
}
