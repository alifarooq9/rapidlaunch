"use client";

import { LineChart } from "@/components/charts";
import { formatDate, thousandToK } from "@/lib/utils";

type UsersChartProps = {
    data: unknown[];
};

export function UsersChart({ data }: UsersChartProps) {
    return (
        <LineChart
            data={data}
            lineDataKeys={["Users", "Active Users"]}
            xAxisDataKey="Date"
            yAxisDataKey="Users"
            yAxisProps={{
                tickFormatter: (value) => {
                    if (value >= 10000) {
                        return `${thousandToK(Number(value)).toFixed(1)}k`;
                    } else {
                        return value as string;
                    }
                },
            }}
            xAxisProps={{
                tickFormatter: formatDate,
            }}
        />
    );
}
