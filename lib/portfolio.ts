export type Project = {
  name: string;
  url: string;
  description: string;
  tags: string[];
};

export type Role = {
  years: string;
  yearsRange?: { start: string; end?: string };
  title: string;
  company: string;
  highlight?: boolean;
  projects: Project[];
};

export const roles: Role[] = [
  {
    years: "now",
    yearsRange: { start: "2025" },
    title: "Principal Engineer",
    company: "Stripe",
    highlight: true,
    projects: [
      {
        name: "Payments Reliability Platform",
        url: "#",
        description:
          "Re-architected retry & circuit-breaking for the global pay-in path. Cut tail latency 38%.",
        tags: ["go", "kafka", "postgres"],
      },
      {
        name: "Developer Platform v3",
        url: "#",
        description:
          "Shipped the new SDK runtime and idempotency layer. Adopted by 4,000+ integrators.",
        tags: ["typescript", "grpc"],
      },
    ],
  },
  {
    years: "'22 — '25",
    yearsRange: { start: "2022", end: "2025" },
    title: "Staff Engineer",
    company: "Figma",
    projects: [
      {
        name: "Multiplayer presence sync",
        url: "#",
        description:
          "Rewrote the live-cursor and selection sync layer. Halved bandwidth for files at scale.",
        tags: ["rust", "websockets"],
      },
      {
        name: "Branching for design files",
        url: "#",
        description: "Co-led the data model for file branching and merge.",
        tags: ["postgres", "crdts"],
      },
    ],
  },
  {
    years: "'19 — '22",
    yearsRange: { start: "2019", end: "2022" },
    title: "Senior Engineer",
    company: "Shopify",
    projects: [
      {
        name: "Storefront edge rendering",
        url: "#",
        description:
          "Moved storefront rendering to edge workers. p95 from 480ms to 90ms.",
        tags: ["ruby", "cloudflare"],
      },
      {
        name: "Hydrogen contributions",
        url: "#",
        description: "Early commits on the React storefront framework.",
        tags: ["react", "oss"],
      },
    ],
  },
  {
    years: "'16 — '19",
    yearsRange: { start: "2016", end: "2019" },
    title: "Software Engineer",
    company: "Khan Academy",
    projects: [
      {
        name: "Content delivery rewrite",
        url: "#",
        description: "Migrated the lesson CDN. Halved infra cost.",
        tags: ["python", "gcp"],
      },
      {
        name: "Learner analytics",
        url: "#",
        description: "Built the event pipeline that powers progress tracking.",
        tags: ["bigquery"],
      },
    ],
  },
  {
    years: "'14 — '16",
    yearsRange: { start: "2014", end: "2016" },
    title: "Backend Engineer",
    company: "Markhor",
    projects: [
      {
        name: "First production stack",
        url: "#",
        description:
          "Built the original API and auth from scratch. Co-founder #5. Sold 2016.",
        tags: ["node.js", "mongo"],
      },
    ],
  },
];
