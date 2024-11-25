module.exports = {
  images: {
    domains: ['stelco-001-site6.qtempurl.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portfolio/home',
        permanent: true,
      },
    ];
  },
  // ...other configurations...
};
