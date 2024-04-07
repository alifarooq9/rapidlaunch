import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@rapidlaunch/tailwind-config/base";

export default {
    // We need to append the path to the UI package to the content array so that
    // those classes are included correctly.
    content: [...baseConfig.content],
    presets: [baseConfig],
    safelist: ["dark"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["var(--font-sans)", ...fontFamily.sans],
            heading: ["var(--font-heading)", ...fontFamily.sans],
        },
    },
} satisfies Config;
