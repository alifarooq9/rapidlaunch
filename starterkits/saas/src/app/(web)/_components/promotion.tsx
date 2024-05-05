import Balancer from "react-wrap-balancer";

export function Promotion() {
    return (
        <section className="flex min-h-96 w-full flex-col items-center justify-center gap-5 rounded-[26px] bg-foreground p-8 py-10 text-background">
            <Balancer
                as="h2"
                className="text-center font-heading text-3xl font-bold md:text-5xl"
            >
                Launch your SaaS in just a few days 🚀
            </Balancer>
            <Balancer
                as="p"
                className="text-center text-base leading-relaxed text-background/70 sm:text-xl"
            >
                Because Rapidlaunch comes with a SaaS starter kit, Blocks and
                guides, and more, you can launch your SaaS in just a few days.
                Get started with our starter kits, components, building guides,
                and more. Customizable.{" "}
                <span className="rounded-[5px] bg-background p-1 font-semibold text-foreground">
                    Open Source.
                </span>
            </Balancer>
        </section>
    );
}
