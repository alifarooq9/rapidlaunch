import { WebHeader } from "@/app/(web)/_components/header";

type WebLayoutProps = {
    children: React.ReactNode;
};

export default function WebLayout({ children }: WebLayoutProps) {
    return (
        <div>
            <WebHeader />
            {children}
        </div>
    );
}
