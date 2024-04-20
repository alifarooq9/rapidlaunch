import "server-only";

import { getMDXData } from "@/lib/mdx";
import type { BlogMetaData } from "@/validations/mdx";

export async function getBlogs() {
    const dir = "src/content/blog";
    return await getMDXData<BlogMetaData>(dir);
}
