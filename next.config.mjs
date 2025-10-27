/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['portohensi.banana-lab.dev'],
    // Untuk local development, allow localhost
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portohensi.banana-lab.dev',
      },
    ],
  },
};
export default nextConfig;