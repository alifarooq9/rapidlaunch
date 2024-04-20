/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optionally, add any other Next.js config below
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
    images: { remotePatterns: [{ hostname: "fakeimg.pl" }] },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
