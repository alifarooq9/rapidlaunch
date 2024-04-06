import { SiteHeader } from "@/app/(app)/_components/side-header";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <SiteHeader />
            <main className="flex-1">{children}</main>
        </>
    );
}
