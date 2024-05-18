import { DocsLayout } from "fumadocs-ui/layout";
import { docs } from "@/app/source";
import type { ReactNode } from "react";
import { Icons } from "@/components/ui/icons";

type RootDocsLayoutProps = {
    children: ReactNode;
};

export default function RootDocsLayout({ children }: RootDocsLayoutProps) {
    return (
        <DocsLayout tree={docs.pageTree} nav={{ title: <Icons.logo /> }}>
            {children}
        </DocsLayout>
    );
}
