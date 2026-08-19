import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['172.20.5.221:3000', 'localhost:3000'],
    },
  },
  turbopack: {}, // เพิ่มบรรทัดนี้เพื่อบอก Next.js ว่ารับทราบการใช้ Turbopack
};

export default nextConfig;