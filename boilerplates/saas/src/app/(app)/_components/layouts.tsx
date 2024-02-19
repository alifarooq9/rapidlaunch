"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { type ReactNode } from "node_modules/react-resizable-panels/dist/declarations/src/vendor/react";
import React, { useState } from "react";
import { Sidebar } from "@/app/(app)/_components/sidebar";

type DashboardLayoutProps = {
    children: ReactNode;
    defaultLayout?: number[];
    defaultCollapsed?: boolean;
};

/**
 * to @add new component in dashboard layout and use it in the `DashboardLayout` component
 * wrap the component with `ResizablePanel` to make it resizable, and all defaltLayout values should be in the `defaultLayoutValues` array between 0 and 100
 */

const defaultLayoutValues: number[] = [17, 83];

export function DashboardLayout({
    children,
    defaultLayout = defaultLayoutValues,
    defaultCollapsed = false,
}: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);

    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
        )}`;
    };

    const onCollapse = () => {
        setIsCollapsed(true);
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
        )}`;
    };

    const onExpand = () => {
        setIsCollapsed(false);
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
        )}`;
    };

    return (
        <ResizablePanelGroup
            onLayout={onLayout}
            direction="horizontal"
            className="min-h-screen items-stretch"
        >
            <ResizablePanel
                minSize={15}
                maxSize={20}
                defaultSize={defaultLayout[0]}
                className="h-screen min-w-20"
                order={1}
                collapsible={true}
                onCollapse={onCollapse}
                onExpand={onExpand}
            >
                <Sidebar isCollapsed={isCollapsed} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel order={2} defaultSize={defaultLayout[1]}>
                {children}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
