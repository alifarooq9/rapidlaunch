import "server-only";

import { getMDXData } from "@/lib/mdx";
import {
    type ChangelogMetaData,
    changelogMetaSchema,
} from "@/validations/mdx-content";

export async function getChangelogs() {
    const dir = "src/content/changelogs";
    return (
        await getMDXData<ChangelogMetaData>(dir, changelogMetaSchema)
    ).filter((changelog) => !changelog.metaData.isDraft);
}
