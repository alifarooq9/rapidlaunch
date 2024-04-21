import { type Feature, features } from "@/config/features";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function Features() {
    return (
        <section className="flex flex-col items-center justify-center gap-20 py-20">
            <div className="grid gap-3">
                <h2 className="text-center text-4xl font-bold text-foreground">
                    Starterkit Features
                </h2>
                <Balancer
                    as="p"
                    className="max-w-2xl text-center text-xl text-muted-foreground"
                >
                    Starterkit features are designed to help you build a robust
                    and scalable SaaS project.
                </Balancer>
            </div>
            <div className="grid max-w-5xl gap-24">
                {features.map((feature, idx) => (
                    <FeatureCard
                        key={feature.title + idx}
                        index={idx + 1}
                        {...feature}
                    />
                ))}
            </div>
        </section>
    );
}

type FeatureCardProps = Feature & {
    index: number;
};

function FeatureCard({
    title,
    description,
    image,
    imageDark,
    index,
}: FeatureCardProps) {
    return (
        <div className="grid gap-10 md:grid-cols-2">
            <div
                className={cn(
                    "-m-2 w-full rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-foreground/10 lg:rounded-2xl",
                    index % 2 === 0 ? "order-1" : "order-2",
                )}
            >
                <div className="relative aspect-video w-full rounded-md bg-muted">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={cn(
                            "block rounded-md border border-border",
                            imageDark && "dark:hidden",
                        )}
                        priority
                    />

                    {imageDark && (
                        <Image
                            src={imageDark}
                            alt={title}
                            fill
                            className="hidden rounded-md border border-border dark:block"
                            priority
                        />
                    )}
                </div>
            </div>

            <div
                className={cn(
                    "order-1 flex flex-col gap-2",
                    index % 2 === 0 ? "order-2" : "order-1",
                )}
            >
                <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                <Balancer as="p" className="text-base text-muted-foreground">
                    {description}
                </Balancer>
            </div>
        </div>
    );
}
