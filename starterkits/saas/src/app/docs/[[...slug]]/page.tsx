import { notFound } from "next/navigation";
import { Toc } from "@/components/toc";
import { getDocs } from "@/server/actions/docs";
import { type Metadata } from "next";

export const dynamic = "force-static";

type DocsSlugPageProps = {
    params: {
        slug: string[];
    };
};

export async function generateMetadata({
    params,
}: DocsSlugPageProps): Promise<Metadata> {
    const slug = Array.isArray(params.slug) ? params.slug.join("/") : "/";

    const doc = (await getDocs()).find((doc) => doc.metaData.slug === slug);

    if (!doc) {
        return notFound();
    }

    return {
        title: doc.metaData.title,
        description: doc.metaData.description,
    };
}

export async function generateStaticParams() {
    const docs = await getDocs();

    return docs.map((doc) => ({
        slug: doc.metaData.slug.split("/") || ["/"],
    }));
}

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
    const slug = Array.isArray(params.slug) ? params.slug.join("/") : "/";

    const doc = (await getDocs()).find((doc) => doc.metaData.slug === slug);

    console.log(["gettings-started", "installation"].join("/"), params.slug);

    if (!doc) {
        return notFound();
    }

    return (
        <>
            <article className="flex-1 py-10">
                <div className="space-y-2">
                    <h1 className="scroll-m-20 font-heading text-4xl font-bold">
                        {doc.metaData.title}
                    </h1>
                    {doc.metaData.description && (
                        <p className="text-lg text-muted-foreground">
                            {doc.metaData?.description}
                        </p>
                    )}
                </div>
                {doc.content}
            </article>

            <div className="sticky top-16 hidden w-full max-w-48 py-4 lg:block">
                <Toc toc={doc.toc} wrapperClassName="w-full" />
            </div>
        </>
    );
}
