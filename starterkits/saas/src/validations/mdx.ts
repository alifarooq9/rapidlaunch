import { z } from "zod";

export const mdxMetaSchema = z.object({
    title: z.string(),
    slug: z.string(),
    publishedAt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    isDraft: z.boolean().optional(),
});

export type MDXMetaData = z.infer<typeof mdxMetaSchema>;
