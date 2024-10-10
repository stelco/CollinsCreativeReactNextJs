/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    domains: ['collins-creative-react-next-krq8613kz-steven-collins-projects.vercel.app'], // Add your domain here
  },
  // Other configurations
};

export default nextConfig;