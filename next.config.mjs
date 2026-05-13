import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: "/effective-code-sharing-in-react-native-with-monorepo-architecture",
        destination: "/writing/code-sharing-react-native-monorepo",
        permanent: true,
      },
      {
        source: "/anony-botter-send-anonymous-message-on-slack",
        destination: "/writing/anony-botter-send-anonymous-message-on-slack",
        permanent: true,
      },
      {
        source: "/building-a-slack-bot-for-fun-and-profit-a-guide-to-using-slack-bolt-js-sdk",
        destination: "/writing/building-a-slack-bot-for-fun-and-profit",
        permanent: true,
      },
      {
        source: "/introducing-cashflow-ai-expense-tracker",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/merging-multiple-openapi-spec-files-into-one",
        destination: "/",
        permanent: true,
      },
      {
        source: "/achieving-success-as-a-programmer-the-power-of-blogging",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
