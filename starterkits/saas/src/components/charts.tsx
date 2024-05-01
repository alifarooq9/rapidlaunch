"use client";

import React from "react";
import {
    ResponsiveContainer,
    LineChart as LineReCharts,
    Line,
    CartesianGrid,
    YAxis,
    XAxis,
    Tooltip,
    type CartesianGridProps,
    type YAxisProps,
    type XAxisProps,
} from "recharts";

type LineChartProps = {
    data: unknown[];
    lineDataKeys: string[];
    xAxisDataKey: string;
    yAxisDataKey: string;
    lineProps?: React.ComponentPropsWithoutRef<typeof Line>;
    CartesionGridProps?: CartesianGridProps;
    yAxisProps?: YAxisProps;
    xAxisProps?: XAxisProps;
};

export const LineChart = ({
    data,
    lineDataKeys,
    xAxisDataKey,
    yAxisDataKey,
    lineProps,
    CartesionGridProps,
    yAxisProps,
    xAxisProps,
}: LineChartProps) => {
    return (
        <ResponsiveContainer width="100%" minHeight={250}>
            <LineReCharts data={data}>
                {lineDataKeys.map((lineDataKey) => (
                    <Line
                        key={lineDataKey}
                        type="monotone"
                        dataKey={lineDataKey}
                        stroke="hsl(var(--primary))"
                        dot={false}
                        {...lineProps}
                    />
                ))}

                <CartesianGrid
                    stroke="hsl(var(--border))"
                    strokeDasharray="3 3"
                    {...CartesionGridProps}
                />

                <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.2}
                    fontSize={"0.75rem"}
                    fontWeight={500}
                    tickCount={6}
                    tickMargin={18}
                    tickLine={false}
                    axisLine={false}
                    dataKey={yAxisDataKey}
                    {...yAxisProps}
                />

                <XAxis
                    dataKey={xAxisDataKey}
                    tickCount={5}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.2}
                    fontSize={"0.75rem"}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    {...xAxisProps}
                />

                <Tooltip
                    cursorStyle={{
                        stroke: "hsl(var(--border))",
                    }}
                    content={({ active, payload }) => {
                        if (active) {
                            const payloadItem = payload?.[0]?.payload as Record<
                                string,
                                string
                            >;

                            const payloadItemArray = Object.entries(
                                payloadItem,
                            ).map(([key, value]) => ({ key, value }));

                            console.log(payloadItemArray);

                            return <CustomTooltip payload={payloadItemArray} />;
                        }

                        return null;
                    }}
                />
            </LineReCharts>
        </ResponsiveContainer>
    );
};

type CustomTooltipProps = {
    payload: { key: string; value: string }[];
};

export const CustomTooltip = ({ payload }: CustomTooltipProps) => {
    return (
        <div className="grid divide-y rounded-sm border border-border bg-background shadow-md">
            {payload.map(({ key, value }) => (
                <p key={key} className="flex flex-row gap-2 p-2 text-xs">
                    <span className="font-medium text-muted-foreground">
                        {key}:
                    </span>
                    <span className="font-medium">{value}</span>
                </p>
            ))}
        </div>
    );
};
