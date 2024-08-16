/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.microlink.io",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig
