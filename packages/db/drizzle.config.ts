import { type Config } from "drizzle-kit";

declare const process: {
    env: {
        DATABASE_URL: string;
    };
};

export default {
    schema: "./src/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    tablesFilter: ["rapidlaunch_*"],
} satisfies Config;
