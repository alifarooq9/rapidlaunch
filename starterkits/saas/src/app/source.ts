import { map } from "@/../.map";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";

export const docs = loader({
    baseUrl: "/docs",
    rootDir: "docs",
    source: createMDXSource(map),
});
