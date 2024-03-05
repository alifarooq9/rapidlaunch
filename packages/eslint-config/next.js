const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        "eslint:recommended",
        "prettier",
        // require.resolve("@vercel/style-guide/eslint/next"),
        "eslint-config-turbo",
        "turbo",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
    ],
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        node: true,
        browser: true,
        es2022: true,
    },
    plugins: ["only-warn"],
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    parser: "@typescript-eslint/parser",
    parserOptions: { project: true },
    plugins: ["@typescript-eslint", "import"],
    rules: {
        "turbo/no-undeclared-env-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            { prefer: "type-imports", fixStyle: "separate-type-imports" },
        ],
        "@typescript-eslint/no-misused-promises": [
            2,
            { checksVoidReturn: { attributes: false } },
        ],
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    },
    ignorePatterns: [
        // Ignore dotfiles
        "**/*.config.js",
        "**/*.config.cjs",
        "**/.eslintrc.cjs",
        ".next",
        "dist",
        "pnpm-lock.yaml",
        ".*.js",
        "node_modules/",
    ],
    reportUnusedDisableDirectives: true,
    overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};
