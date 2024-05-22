import type { Config } from "tailwindcss";

import baseConfig from "@rapidlaunch/tailwind-config/base";

export default {
    // We need to append the path to the UI package to the content array so that
    // those classes are included correctly.
    content: [...baseConfig.content],
    presets: [baseConfig],
    safelist: ["dark"],
    theme: {
        extend: {
            animation: {
                "border-beam":
                    "border-beam calc(var(--duration)*1s) infinite linear",
            },
            keyframes: {
                "border-beam": {
                    "100%": {
                        "offset-distance": "100%",
                    },
                },
            },
        },
    },
} satisfies Config;
