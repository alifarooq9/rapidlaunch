import { map } from "@/../.map";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";

export const { getPage, getPages, pageTree } = loader({
    baseUrl: "/docs",
    rootDir: "docs",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    source: createMDXSource(map),
});
