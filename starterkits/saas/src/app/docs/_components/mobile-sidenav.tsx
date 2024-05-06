import { DocsSidebar } from "@/app/docs/_components/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export function DocsMobileSidenav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="iconSmall">
                    <MenuIcon className="h-4 w-4" />
                    <span className="sr-only">Open docs menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-3 pb-20 pt-10">
                <DocsSidebar />
            </SheetContent>
        </Sheet>
    );
}
