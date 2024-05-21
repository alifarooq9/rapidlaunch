export function PageHeaderHeading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-center font-heading text-6xl font-bold leading-tight tracking-tighter lg:leading-[1.1]">
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
