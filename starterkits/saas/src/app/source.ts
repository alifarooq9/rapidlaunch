import { map } from "@/../.map";
import { createMDXSource, defaultSchemas } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { z } from "zod";

export const docs = loader({
    baseUrl: "/docs",
    rootDir: "docs",
    source: createMDXSource(map),
});

const blogsFronmatterSchema = defaultSchemas.frontmatter.extend({
    thumbnail: z.string().url(),
    publishedAt: z.date(),
    readTime: z.string(),
    tags: z.array(z.string()),
});

export const blogs = loader({
    baseUrl: "/blogs",
    rootDir: "blogs",
    source: createMDXSource(map, {
        schema: { frontmatter: blogsFronmatterSchema },
    }),
});
