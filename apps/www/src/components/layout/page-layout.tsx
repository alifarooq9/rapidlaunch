import { Balancer } from "react-wrap-balancer";

export function PageHeaderHeading({ children }: { children: React.ReactNode }) {
    return (
        <Balancer
            as="h1"
            className="font-heading text-center text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:leading-[1.1]"
        >
            {children}
        </Balancer>
    );
}

export function PageHeaderDescription({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Balancer
            as="p"
            className="text-center text-lg font-medium sm:text-xl md:text-2xl"
        >
            {children}
        </Balancer>
    );
}

export function PageActions({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            {children}
        </div>
    );
}
