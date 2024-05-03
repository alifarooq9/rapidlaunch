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

type RevenueChartProps = {
    data: {
        Date: string;
        RevenueCount: number;
    }[];
};

export function RevenueChart({ data }: RevenueChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                    Count of revenue each month for last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LineChart
                    data={data}
                    xAxisDataKey="Date"
                    yAxisDataKey="RevenueCount"
                    lineDataKeys={["RevenueCount"]}
                    lineProps={[{ stroke: "hsl(var(--primary))" }]}
                    yAxisProps={{
                        tickFormatter: (value) => {
                            if (value >= 10000) {
                                return `${thousandToK(Number(value)).toFixed(1)}k`;
                            } else {
                                return `${value}`;
                            }
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
}
