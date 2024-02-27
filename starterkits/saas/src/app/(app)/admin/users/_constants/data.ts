import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

export const statuses = [
    {
        value: "verified",
        label: "Verified",
        icon: CheckCircledIcon,
    },
    {
        value: "unverified",
        label: "Unverified",
        icon: CrossCircledIcon,
    },
] as const;
