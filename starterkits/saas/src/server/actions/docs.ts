import "server-only";

import { getMDXData } from "@/lib/mdx";
import { type DocsMetaData, docsMetaSchema } from "@/validations/mdx-content";

export async function getDocs() {
    const dir = "src/content/docs";
    return (await getMDXData<DocsMetaData>(dir, docsMetaSchema)).filter(
        (doc) => !doc.metaData.isDraft,
    );
}
