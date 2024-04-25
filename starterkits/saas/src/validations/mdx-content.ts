import { z } from "zod";

export const docsMetaSchema = z.object({
    title: z.string(),
    slug: z.string(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    isDraft: z.boolean().optional(),
});

export type DocsMetaData = z.infer<typeof docsMetaSchema>;

export const blogMetaSchema = z.object({
    title: z.string(),
    slug: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    readTime: z.string(),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    tumbnail: z.string().url(),
    featured: z.boolean().optional(),
    isDraft: z.boolean().optional(),
});

export type BlogMetaData = z.infer<typeof blogMetaSchema>;

export const changelogMetaSchema = z.object({
    title: z.string(),
    slug: z.string(),
    publishedAt: z.date(),
    tumbnail: z.string().url(),
    description: z.string(),
    version: z.string(),
    isDraft: z.boolean().optional(),
});

export type ChangelogMetaData = z.infer<typeof changelogMetaSchema>;
