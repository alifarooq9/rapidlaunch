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

type UsersChartProps = {
    data: {
        Date: string;
        Users: number;
    }[];
};

export function UsersChart({ data }: UsersChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users Analytics</CardTitle>
                <CardDescription>
                    Count of users joined each month for last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LineChart
                    data={data}
                    xAxisDataKey="Date"
                    yAxisDataKey="Users"
                    lineDataKeys={["Users"]}
                    lineProps={[
                        { stroke: "hsl(var(--primary))" },
                        { stroke: "green" },
                    ]}
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
