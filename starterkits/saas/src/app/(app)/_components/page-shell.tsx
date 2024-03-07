import { type ElementType } from "react";

type AppPageShellProps = {
    children: React.ReactNode;
    as?: ElementType;
    title: string;
    description: string;
    rightContent?: React.ReactNode;
};

export function AppPageShell({
    children,
    as,
    title,
    rightContent,
    description,
}: AppPageShellProps) {
    const Container = as ?? "main";

    return (
        <Container className="w-full space-y-8 px-8">
            <PageHeader
                title={title}
                rightContent={rightContent}
                description={description}
            />
            {children}
        </Container>
    );
}

type PageHeaderProps = {
    title: string;
    description: string;
    rightContent?: React.ReactNode;
};

function PageHeader({ title, rightContent, description }: PageHeaderProps) {
    return (
        <header className="flex w-full items-center justify-between border-b border-border py-6">
            <section className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="max-w-xl text-muted-foreground">{description}</p>
            </section>
            {rightContent && <section>{rightContent}</section>}
        </header>
    );
}
