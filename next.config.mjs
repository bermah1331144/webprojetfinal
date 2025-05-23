/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'monsterhunterwiki.org',
          port: '',
          pathname: '/images/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  
