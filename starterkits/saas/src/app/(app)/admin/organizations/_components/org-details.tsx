import { type OrganizationsData } from "@/app/(app)/admin/organizations/_components/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type OrgDetailsProps = OrganizationsData;

export function OrgDetails(props: OrgDetailsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="cursor-pointer pl-2 font-medium hover:underline">
                    {props.name}
                </span>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-auto">
                <DialogHeader>
                    <DialogTitle>Organization Details</DialogTitle>
                    <DialogDescription>
                        View the details of the organization.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={props.image ?? ""} />

                            <AvatarFallback className="text-xs">
                                {props?.name?.charAt(0).toUpperCase() ??
                                    props.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="w-full truncate text-sm font-medium">
                                {props.name}
                            </p>
                            <p className="w-full truncate text-sm font-light text-muted-foreground">
                                {props.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge
                            variant={props.subscribed ? "success" : "info"}
                            className="w-fit"
                        >
                            {props.subscribed ? "Subscribed" : "Unsubscribed"}
                        </Badge>
                    </div>
                    <ScrollArea className="max-h-[300px] w-full">
                        <h3 className="text-sm font-semibold">Owner</h3>

                        <div className="mt-2 flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={props.owner.image ?? ""} />

                                <AvatarFallback className="text-xs">
                                    {props.owner.name
                                        ?.charAt(0)
                                        .toUpperCase() ??
                                        props.owner.email
                                            .charAt(0)
                                            .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="w-full truncate text-sm font-medium">
                                    {props.owner.name}
                                </p>
                                <p className="w-full truncate text-sm font-light text-muted-foreground">
                                    {props.owner.email}
                                </p>
                            </div>
                        </div>

                        <h3 className="mt-2 text-sm font-semibold">Members</h3>

                        <ul className="mt-2 grid gap-2">
                            {props.members.map((member) => (
                                <li
                                    key={member.id}
                                    className="flex items-center gap-3"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={member.image ?? ""} />

                                        <AvatarFallback className="text-xs">
                                            {member?.name
                                                ?.charAt(0)
                                                .toUpperCase() ??
                                                member.email
                                                    .charAt(0)
                                                    .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="w-full truncate text-sm font-medium">
                                            {member.name} - {member.role}
                                        </p>
                                        <p className="w-full truncate text-sm font-light text-muted-foreground">
                                            {member.email}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
