import { Badge } from "@/components/ui/badge";
import Balance from "react-wrap-balancer";
import { EarlyAccessForm } from "@/components/early-access-form";

export default function HomePage() {
    return (
        <main className="container flex flex-col items-center justify-center gap-4 py-20">
            <Badge variant="secondary" className="gap-2">
                <span>🎉</span>{" "}
                <p>Open Source SaaS Starterkits and components</p>
            </Badge>
            <Balance
                as="h1"
                className="text-center text-3xl font-semibold sm:text-4xl md:text-6xl"
            >
                Launch 🚀 in days with beautiful SaaS starterkits and components
            </Balance>
            <Balance
                as="p"
                className="text-center text-muted-foreground sm:text-xl"
            >
                Elevate your development game with Rapidlaunch! Launch your apps
                faster with our SaaS starterkits, components, building blocks.
                Customizable. Open Source
            </Balance>

            <EarlyAccessForm />
        </main>
    );
}
