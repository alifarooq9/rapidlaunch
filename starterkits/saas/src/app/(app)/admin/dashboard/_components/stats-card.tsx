import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IconProps } from "@/components/ui/icons";

type StatsCardProps = {
    title: string;
    value: string | number;
    subText: string;
    Icon: React.ComponentType<IconProps>;
};

export function StatsCard({ title, value, Icon, subText }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{subText}</p>
            </CardContent>
        </Card>
    );
}
