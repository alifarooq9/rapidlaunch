import { cookies } from "next/headers";
import { DashboardLayout } from "@/app/(app)/_components/layouts";

type AppLayoutProps = {
    children: React.ReactNode;
};

/**
 * to @add new component in dashboard layout and use it in the `DashboardLayout` component @see /app/(app)/_components/layouts.tsx
 */

export default function DasboardLayout({ children }: AppLayoutProps) {
    const layout = cookies().get("react-resizable-panels:layout");
    const collapsed = cookies().get("react-resizable-panels:collapsed");

    let defaultLayout;
    if (layout) {
        defaultLayout = JSON.parse(layout.value) as number[];
    }

    let defaultCollapsed;
    if (collapsed) {
        defaultCollapsed = JSON.parse(collapsed.value) as boolean;
    }

    return (
        <DashboardLayout
            defaultCollapsed={defaultCollapsed}
            defaultLayout={defaultLayout}
        >
            {children}
        </DashboardLayout>
    );
}
