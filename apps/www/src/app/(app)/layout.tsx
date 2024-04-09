import { SiteHeader } from "@/app/(app)/_components/side-header";
import { SiteFooter } from "@/app/(app)/_components/site-footer";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </>
    );
}
