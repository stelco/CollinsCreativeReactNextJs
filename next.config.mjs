/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portfolio/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;