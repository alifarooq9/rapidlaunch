import React from "react";

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};

export const useBreakpoints = () => {
    const searchBreakpoint = React.useCallback(
        (breakpoints: { key: string; value: number }[]) => {
            return breakpoints.find((x) => window.innerWidth < x.value)?.key;
        },
        [],
    );

    const entries = React.useMemo(() => {
        return Object.entries(breakpoints)
            .sort((a, b) => a[1] - b[1])
            .map(([key, value]) => ({ key, value }));
    }, []);

    const [breakpoint, setBreakpoint] = React.useState(
        searchBreakpoint(entries),
    );

    React.useEffect(() => {
        const onResize = () => {
            setBreakpoint(searchBreakpoint(entries));
        };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [entries, searchBreakpoint]);

    return breakpoint;
};
