import { type ElementType } from "react";

type AppPageShellProps = {
    children: React.ReactNode;
    as?: ElementType;
    title: string;
    description: string;
};

export function AppPageShell({
    children,
    as,
    title,
    description,
}: AppPageShellProps) {
    const Container = as ?? "main";

    return (
        <div className="w-full space-y-8">
            <PageHeader title={title} description={description} />
            <Container className="space-y-8 pb-8">{children}</Container>
        </div>
    );
}

type PageHeaderProps = {
    title: string;
    description: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <header className="flex w-full flex-col gap-1 border-b border-border py-6">
            <h1 className="font-heading text-2xl font-bold">{title}</h1>
            <p className="max-w-xl text-muted-foreground">{description}</p>
        </header>
    );
}
