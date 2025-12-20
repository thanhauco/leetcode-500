import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile the workspace dataset package (ships raw TypeScript).
  transpilePackages: ["@leetcode-500/data"],
  // Linting is run separately; don't block production builds on it.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
