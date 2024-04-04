import { compileMDX } from "next-mdx-remote/rsc";
import { readdir, readFile } from "fs/promises";
import { mdxMetaSchema, type MDXMetaData } from "@/validations/mdx";
import path from "path";
import { getTableOfContents } from "@/lib/toc";
import { mdxComponents } from "@/components/mdx-components";
import { AutoIdsToHeading } from "@/lib/rehype-plugins";
import rehypePrism from "rehype-prism-plus";

export async function getMDXData(dir: string) {
    const files = (await readdir(dir, "utf-8")).filter(
        (file) => path.extname(file) === ".mdx",
    );

    const components = mdxComponents();

    return await Promise.all(
        files.map(async (file) => {
            const fileData = await readFile(`${dir}/${file}`, "utf-8");
            const mdxData = await compileMDX<MDXMetaData>({
                source: fileData,
                options: {
                    parseFrontmatter: true,
                    mdxOptions: {
                        //@ts-expect-error-error
                        rehypePlugins: [AutoIdsToHeading, rehypePrism],
                        format: "mdx",
                    },
                },
                components,
            });

            const validate = await mdxMetaSchema.safeParseAsync(
                mdxData.frontmatter,
            );

            if (!validate.success) {
                throw new Error(
                    `Invalid frontmatter in ${dir} ${file}\nCause: ${validate.error.message}`,
                    {
                        cause: validate.error.errors,
                    },
                );
            }

            const raw = fileData.split("---").slice(2).join("---");

            const toc = await getTableOfContents(raw);

            return {
                content: mdxData.content,
                metaData: mdxData.frontmatter,
                toc,
                fileData,
            };
        }),
    );
}
