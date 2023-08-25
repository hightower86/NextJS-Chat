/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    images: {
        domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    },
};

module.exports = nextConfig;
