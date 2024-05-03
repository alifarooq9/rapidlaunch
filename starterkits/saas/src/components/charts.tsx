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
    lineProps?: React.ComponentPropsWithoutRef<typeof Line>[];
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
                {lineDataKeys.map((lineDataKey, index) => (
                    <Line
                        key={lineDataKey}
                        type="monotone"
                        dataKey={lineDataKey}
                        stroke="hsl(var(--primary))"
                        dot={false}
                        {...(lineProps?.[index] ?? {})}
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
                        if (active && payload) {
                            const payloadItemArray =
                                payload.length > 0
                                    ? [
                                          {
                                              key: xAxisDataKey,
                                              value: (
                                                  payload[0]?.payload as Record<
                                                      string,
                                                      unknown
                                                  >
                                              )[xAxisDataKey] as string,
                                          },
                                          ...payload?.map((pl) => ({
                                              key: pl.dataKey ?? "",
                                              value: pl.value as string,
                                              stroke:
                                                  pl.stroke ??
                                                  "hsl(var(--primary))",
                                          })),
                                      ]
                                    : [];

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
    payload: { key: string | number; value: string; stroke?: string }[];
};

export const CustomTooltip = ({ payload }: CustomTooltipProps) => {
    if (payload.length === 0) return null;

    return (
        <div className="grid divide-y rounded-sm border border-border bg-background shadow-md">
            {payload.map(({ key, value, stroke }) => (
                <p
                    key={key}
                    className="flex flex-row items-center justify-start gap-2 p-2 text-xs"
                >
                    {stroke && (
                        <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: stroke }}
                        />
                    )}
                    <span className="font-medium text-muted-foreground">
                        {String(key)}:
                    </span>
                    <span className="font-medium">{value}</span>
                </p>
            ))}
        </div>
    );
};
