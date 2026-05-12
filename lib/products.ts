export type Product = {
  num: string;
  name: string;
  url: string;
  blurb: string;
  year: string;
  stack: string;
};

export const products: Product[] = [
  {
    num: "01",
    name: "CashFlow AI",
    url: "#",
    blurb:
      "A smart expense tracker. Type a sentence like “spent $20 on gas, $100 on tuition, earned $500 freelancing” and it splits everything into the right entries automatically.",
    year: "2025",
    stack: "react native · django · python",
  },
  {
    num: "02",
    name: "Anony Botter",
    url: "https://anonybotter.hamzawaleed.com/",
    blurb:
      "A Slack bot for anonymous messages, polls, and thread replies — with built-in moderation, approval workflows, and AI guardrails. Free forever tier, per-workspace pricing.",
    year: "2023",
    stack: "node · slack bolt · vercel · mongodb",
  },
];
