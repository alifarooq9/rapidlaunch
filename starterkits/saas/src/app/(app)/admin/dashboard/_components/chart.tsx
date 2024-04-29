"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const data = [
    { date: "2023-01-01", usersCount: 1000 },
    { date: "2023-02-01", usersCount: 1040 },
    { date: "2023-03-01", usersCount: 1190 },
    { date: "2023-04-01", usersCount: 1340 },
    { date: "2023-05-01", usersCount: 1390 },
    { date: "2023-06-01", usersCount: 1440 },
    { date: "2023-07-01", usersCount: 1490 },
    { date: "2023-08-01", usersCount: 1540 },
    { date: "2023-09-01", usersCount: 1890 },
    { date: "2023-10-01", usersCount: 2040 },
    { date: "2023-11-01", usersCount: 4000 },
    { date: "2023-12-01", usersCount: 10040 },
    { date: "2024-01-01", usersCount: 19090 },
    { date: "2024-02-01", usersCount: 25040 },
];

export function Chart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Charts</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" minHeight={250}>
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="usersCount"
                            stroke="hsl(var(--primary))"
                            dot={false}
                        />
                        <CartesianGrid
                            stroke="hsl(var(--border))"
                            strokeDasharray="3 3"
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            strokeOpacity={0.5}
                            fontSize={"0.75rem"}
                            fontWeight={500}
                            tickCount={6}
                            tickMargin={18}
                            tickFormatter={(value) => {
                                if (value >= 10000) {
                                    return `${ThousandToK(Number(value)).toFixed(1)}k`;
                                } else {
                                    return value as string;
                                }
                            }}
                            dataKey="usersCount"
                        />
                        <XAxis
                            dataKey="date"
                            tickCount={5}
                            stroke="hsl(var(--muted-foreground))"
                            strokeOpacity={0.5}
                            fontSize={"0.75rem"}
                            fontWeight={500}
                            tickMargin={16}
                            tickFormatter={FormateDate}
                        />

                        <Tooltip
                            cursorStyle={{
                                stroke: "hsl(var(--border))",
                            }}
                            content={({ active, label, payload }) => {
                                if (active) {
                                    const payloadItem = payload?.[0]
                                        ?.payload as (typeof data)[number];

                                    return (
                                        <CustomTooltip
                                            value={payloadItem.usersCount}
                                            label={FormateDate(label as string)}
                                            labelTitle="Date"
                                            valueTitle="Users"
                                        />
                                    );
                                }

                                return null;
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

type CustomTooltipProps = {
    value: number;
    valueTitle: string;
    label: string;
    labelTitle: string;
};

const CustomTooltip = ({
    value,
    label,
    labelTitle,
    valueTitle,
}: CustomTooltipProps) => {
    return (
        <div className="grid grid-cols-2 divide-x rounded-md border border-border bg-background shadow-md">
            <p className="flex flex-col gap-0.5 p-2 text-xs">
                <span className="font-medium text-muted-foreground">
                    {labelTitle}
                </span>
                <span className="font-medium">{label}</span>
            </p>
            <p className="flex flex-col gap-0.5 p-2 text-xs">
                <span className="font-medium text-muted-foreground">
                    {valueTitle}
                </span>
                <span className="font-medium">{value}</span>
            </p>
        </div>
    );
};

function ThousandToK(value: number) {
    return value / 1000;
}

function FormateDate(date: string) {
    return format(new Date(date), "PP");
}
