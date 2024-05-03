"use client";

import { LineChart } from "@/components/charts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { thousandToK } from "@/lib/utils";

type SubsChartProps = {
    data: {
        Date: string;
        SubsCount: number;
    }[];
};

export function SubsChart({ data }: SubsChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Subscription Analytics</CardTitle>
                <CardDescription>
                    Count of subscriptions each month for last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LineChart
                    data={data}
                    xAxisDataKey="Date"
                    yAxisDataKey="SubsCount"
                    lineDataKeys={["SubsCount"]}
                    lineProps={[{ stroke: "hsl(var(--primary))" }]}
                    yAxisProps={{
                        tickFormatter: (value) => {
                            if (value >= 10000) {
                                return `${thousandToK(Number(value)).toFixed(1)}k`;
                            } else {
                                return value as string;
                            }
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
}
