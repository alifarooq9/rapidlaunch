import { Background } from "@/components/background";
import {
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/layout/page-header";
import { Announcment } from "@/components/marketing/announment";

export function Hero() {
    return (
        <Background>
            <section className="flex flex-col items-center justify-center gap-6 py-16">
                <Announcment />

                <div className="grid gap-2">
                    <PageHeaderHeading>Copy. Build. Launch.</PageHeaderHeading>
                    <PageHeaderDescription>
                        <span className="font-bold">Open Source </span> SaaS
                        Starterkit, Building Blocks and Guides
                    </PageHeaderDescription>
                </div>
            </section>
        </Background>
    );
}
