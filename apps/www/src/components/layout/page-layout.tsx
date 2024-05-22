export function PageHeaderHeading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="font-heading text-center text-6xl font-bold leading-tight tracking-tighter lg:leading-[1.1]">
            {children}
        </h1>
    );
}

export function PageHeaderDescription({
    children,
}: {
    children: React.ReactNode;
}) {
    return <p className="text-center text-2xl font-medium">{children}</p>;
}

export function PageActions({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            {children}
        </div>
    );
}
