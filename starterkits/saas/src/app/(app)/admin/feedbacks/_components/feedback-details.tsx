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
import { type getAllPaginatedFeedbacksQuery } from "@/server/actions/feedback/queries";

type FeedbackDetailsProps = Awaited<
    ReturnType<typeof getAllPaginatedFeedbacksQuery>
>["data"][number];

export function FeedbackDetails(props: FeedbackDetailsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="cursor-pointer font-medium hover:underline">
                    {props.title}
                </span>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-auto">
                <DialogHeader>
                    <DialogTitle>Feedback Details</DialogTitle>
                    <DialogDescription>
                        View the details of the feedback.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={props.user.image ?? ""} />

                            <AvatarFallback className="text-xs">
                                {props.user.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="w-full truncate text-sm font-medium">
                                {props.user.name}
                            </p>
                            <p className="w-full truncate text-sm font-light text-muted-foreground">
                                {props.user.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="w-fit">
                            {props.label}
                        </Badge>
                        <Badge
                            variant={
                                props.status === "Open"
                                    ? "success"
                                    : props.status === "In Progress"
                                      ? "info"
                                      : "secondary"
                            }
                            className="w-fit"
                        >
                            {props.status}
                        </Badge>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="font-semibold">{props.title}</h3>

                        <p className="text-sm">{props.message}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
