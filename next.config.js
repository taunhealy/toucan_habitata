await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
    ],
  },
  rewrites: async () => {
    return Promise.resolve([
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ]);
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = config.externals || {};
      config.externals["@node-rs/argon2"] = "commonjs @node-rs/argon2";
    }
    return config;
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
