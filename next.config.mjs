/** @type {import('next').NextConfig} */
// Old way (works but deprecated)
// const nextConfig = {
//     images: {
//       domains: ['ji1pyqd59x.ufs.sh','utfs.io'], // Add your hostname here
//     },
//   };

//

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ji1pyqd59x.ufs.sh",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "utfs.io",
          port: "",
          pathname: "/**",
        },
        {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      ],
    },
  };
  export default nextConfig;
  