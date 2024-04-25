import {
    WebPageHeader,
    WebPageWrapper,
} from "@/app/(web)/_components/general-components";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getChangelogs } from "@/server/actions/changelog";

export const dynamic = "force-static";

export default async function ChangeLogPage() {
    const changelogs = await getChangelogs();

    return (
        <WebPageWrapper>
            <WebPageHeader title="Change Log">
                <p className="text-center text-base">
                    <span>
                        All the latest features, fixes and work to{" "}
                        {siteConfig.name}.
                    </span>
                </p>
            </WebPageHeader>
            <div></div>
        </WebPageWrapper>
    );
}
