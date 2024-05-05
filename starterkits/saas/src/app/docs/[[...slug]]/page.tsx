import { notFound } from "next/navigation";
import { Toc } from "@/components/toc";
import { getDocs } from "@/server/actions/docs";

export const dynamic = "force-static";

type DocsSlugPageProps = {
    params: {
        slug: string[];
    };
};

export async function generateStaticParams() {
    const docs = await getDocs();

    docs.map((doc) => {
        console.log(doc.metaData.slug.split("/") || ["/"]);
    });

    return docs.map((doc) => ({
        slug: doc.metaData.slug.split("/") || ["/"],
    }));
}

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
    const slug = Array.isArray(params.slug) ? params.slug.join("/") : "/";

    const doc = (await getDocs()).find((doc) => doc.metaData.slug === slug);

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

            <Toc
                toc={doc.toc}
                wrapperClassName="max-w-48 w-full py-4 sticky top-16"
            />
        </>
    );
}
