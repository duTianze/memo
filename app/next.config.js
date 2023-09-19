/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:12190/api/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
