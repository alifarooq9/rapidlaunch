import { siteConfig } from "@/config/site";

export default function Maintenance() {
    return (
        <main className="container flex min-h-screen w-screen flex-col items-center justify-center space-y-2">
            <p className="fixed text-[15vw] font-bold opacity-5">Maintenance</p>

            <h1 className="text-center text-3xl font-bold sm:text-5xl">
                {siteConfig.name} is currently undergoing maintenance.
            </h1>
            <p className="text-center text-base text-muted-foreground sm:text-lg">
                We&apos;re working hard to get everything back up and running.
                In the meantime, you can check back later.
            </p>
        </main>
    );
}
