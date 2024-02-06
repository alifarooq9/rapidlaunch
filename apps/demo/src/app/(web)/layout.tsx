import Header from "@/components/header";
import { Fragment } from "react";

interface WebLayoutProps {
    children: React.ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    );
}
