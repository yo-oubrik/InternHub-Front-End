/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fastly.picsum.photos',
                pathname: '**',
            },
            {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
        ],
      domains: ['ebhudrzrhgnxzbuayebh.supabase.co'],

    },
}

module.exports = nextConfig