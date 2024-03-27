import withBundleAnalyzer from "@next/bundle-analyzer";
import { createContentlayerPlugin } from "next-contentlayer";

import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(createContentlayerPlugin(nextConfig)(withMDX(nextConfig)));
