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
        <div className="px-8 py-10">
            <PageHeader
                title={title}
                rightContent={rightContent}
                description={description}
            />
            <Container>{children}</Container>
        </div>
    );
}

type PageHeaderProps = {
    title: string;
    description: string;
    rightContent?: React.ReactNode;
};

function PageHeader({ title, rightContent, description }: PageHeaderProps) {
    return (
        <header className="flex w-full items-center justify-between">
            <section className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </section>
            {rightContent && <section>{rightContent}</section>}
        </header>
    );
}
