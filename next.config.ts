/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wedding-invitation', // Replace with your exact repo name
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
