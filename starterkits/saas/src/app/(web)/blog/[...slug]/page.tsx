import { WebPageWrapper } from "@/app/(web)/_components/general-components";

type BlogSlugPageProps = {
    params: {
        slug: string[];
    };
};

export default function BlogSlugPage({ params }: BlogSlugPageProps) {
    return (
        <WebPageWrapper>
            <div className="w-full">
                <h1>Blog Slug Page</h1>
                {JSON.stringify(params)}
            </div>
        </WebPageWrapper>
    );
}
