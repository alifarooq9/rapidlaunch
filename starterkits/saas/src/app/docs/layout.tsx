import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { pageTree } from "@/app/source";
import { siteUrls } from "@/config/urls";
import { Icons } from "@/components/ui/icons";

export default function RootDocsLayout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={pageTree}
            nav={{
                title: <Icons.logo />,
                githubUrl: siteUrls.github,
            }}
        >
            {children}
        </DocsLayout>
    );
}
