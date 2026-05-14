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
    name: "Glance",
    url: "/writing/glance-vscode-extension",
    blurb:
      "A VS Code extension for juggling many Claude Code sessions at once. Each session gets a card in the sidebar — title, TL;DR, progress bar, and a yellow flag when an agent is waiting on you.",
    year: "2026",
    stack: "vscode · typescript · mcp",
  },
  {
    num: "02",
    name: "CashFlow AI",
    url: "https://cashflow.hamzawaleed.com/",
    blurb:
      "A smart expense tracker. Type a sentence like “spent $20 on gas, $100 on tuition, earned $500 freelancing” and it splits everything into the right entries automatically.",
    year: "2025",
    stack: "react native · django · python",
  },
  {
    num: "03",
    name: "Anony Botter",
    url: "https://anonybotter.hamzawaleed.com/",
    blurb:
      "A Slack bot for anonymous messages, polls, and thread replies — with built-in moderation, approval workflows, and AI guardrails. Free forever tier, per-workspace pricing.",
    year: "2023",
    stack: "node · slack bolt · vercel · mongodb",
  },
];
