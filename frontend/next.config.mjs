/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true, // Ignore TypeScript errors
      },
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors
    },
    // next.config.js
    reactStrictMode: false
};

export default nextConfig;
