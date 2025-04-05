/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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