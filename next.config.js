/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'zccidwnpkqjijxceuicy.supabase.co',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
