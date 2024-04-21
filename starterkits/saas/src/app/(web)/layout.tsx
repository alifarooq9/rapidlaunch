import { Background } from "@/app/(web)/_components/background";
import { WebFooter } from "@/app/(web)/_components/footer";
import { WebHeader } from "@/app/(web)/_components/header";

type WebLayoutProps = {
    children: React.ReactNode;
};

export default function WebLayout({ children }: WebLayoutProps) {
    return (
        <div>
            <Background>
                <WebHeader />
                {children}
                <WebFooter />
            </Background>
        </div>
    );
}
