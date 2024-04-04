import { DocsHeader } from "@/app/docs/_components/docs-header";
import { DocsSidebar } from "@/app/docs/_components/sidebar";

type DocsLayoutProps = {
    children: React.ReactNode;
};

export default function DocsLayout({ children }: DocsLayoutProps) {
    return (
        <div className="container relative min-h-screen">
            <DocsHeader />

            <main className="flex items-start gap-8">
                <div className="sticky top-16 h-[calc(100vh-4rem)] w-56 flex-shrink-0">
                    <DocsSidebar />
                </div>

                {children}
            </main>
        </div>
    );
}
