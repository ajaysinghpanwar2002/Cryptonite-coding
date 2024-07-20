/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: ['coin-images.coingecko.com']
        // domains: ['coin-images.coingecko.com']
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'coin-images.coingecko.com',
            },
        ],
    }
};

export default nextConfig;
