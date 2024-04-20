import "server-only";

import { getMDXData } from "@/lib/mdx";
import type { DocsMetaData } from "@/validations/mdx";

export async function getDocs() {
    const dir = "src/content/docs";
    return await getMDXData<DocsMetaData>(dir);
}
