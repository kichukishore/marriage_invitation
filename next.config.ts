/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is the magic line
  images: {
    unoptimized: true, // Necessary for static export
  },
};

export default nextConfig;