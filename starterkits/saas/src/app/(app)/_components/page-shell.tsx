import { type ElementType } from "react";

type AppPageShellProps = {
    children: React.ReactNode;
    as?: ElementType;
    title: string;
    rightContent?: React.ReactNode;
};

export function AppPageShell({
    children,
    as,
    title,
    rightContent,
}: AppPageShellProps) {
    const Container = as ?? "main";

    return (
        <Container className="w-full">
            <PageHeader title={title} rightContent={rightContent} />
            {children}
        </Container>
    );
}

type PageHeaderProps = {
    title: string;
    rightContent?: React.ReactNode;
};

function PageHeader({ title, rightContent }: PageHeaderProps) {
    return (
        <header className="flex h-14 w-full items-center justify-between border-b px-4">
            <h1 className="px-2 font-medium">{title}</h1>
            {rightContent && <section>{rightContent}</section>}
        </header>
    );
}
