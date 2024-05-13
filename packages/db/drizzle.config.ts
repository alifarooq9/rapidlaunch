import { defineConfig } from "drizzle-kit";

declare const process: {
  env: {
    DATABASE_URL: string;
  };
};

export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    //@ts-expect-error //@ts-ignore
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["rapidlaunch_*"],
});
