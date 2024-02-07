import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export function SocialLogins() {
    return (
        <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full gap-2">
                <Icons.gitHub className="h-3.5 w-3.5 fill-foreground" />
                <span>Continue with Github</span>
            </Button>
            <Button variant="outline" className="w-full gap-2">
                <Icons.google className="h-3.5 w-3.5 fill-foreground" />
                <span>Continue with Google</span>
            </Button>
        </div>
    );
}
