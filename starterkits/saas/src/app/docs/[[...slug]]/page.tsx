import { docs } from "@/app/source";
import type { Metadata } from "next";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { useMDXComponents } from "mdx-components";
import { RollButton } from "fumadocs-ui/components/roll-button";

export const dynamic = "force-static";

export default async function Page({
    params,
}: {
    params: { slug?: string[] };
}) {
    const page = docs.getPage(params.slug);

    if (page == null) {
        notFound();
    }

    const MDX = page.data.exports.default;

    const components = useMDXComponents();

    return (
        <DocsPage toc={page.data.exports.toc}>
            <RollButton />
            <DocsBody>
                <h1>{page.data.title}</h1>
                <p>{page.data.description}</p>
                <MDX components={components} />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return docs.getPages().map((page) => ({
        slug: page.slugs,
    }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
    const page = docs.getPage(params.slug);

    if (page == null) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    } satisfies Metadata;
}
