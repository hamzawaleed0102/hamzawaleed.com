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
    yearsRange: { start: "2021" },
    title: "Principal Software Engineer",
    company: "Arbisoft",
    highlight: true,
    projects: [
      {
        name: "Jobcase",
        url: "https://www.jobcase.com/about-us/",
        description:
          "Led seven engineers on the React Native app for the largest US blue-collar jobs platform. Took rendering from 20fps to 50+fps, upgraded RN 0.64 → 0.68, and shipped user-connection features behind LaunchDarkly. Added Detox + GitLab pipelines on a custom runner.",
        tags: ["react native", "redux", "detox", "ci/cd"],
      },
    ],
  },
  {
    years: "'20 — '21",
    yearsRange: { start: "2020", end: "2021" },
    title: "Freelance React Native Engineer",
    company: "Independent",
    projects: [
      {
        name: "The Bitcoin Company",
        url: "https://thebitcoincompany.com/",
        description:
          "Shipped a private, easy-to-use mobile app for earning, learning, spending, and saving Bitcoin. Built from mockups to responsive UI, wired up APIs, and added Detox end-to-end coverage. Referred from a previous client (Sifir.io).",
        tags: ["react native", "redux", "react query", "detox", "stripe"],
      },
      {
        name: "Sifir.io",
        url: "https://sifir.io",
        description:
          "Designed and coded an open-source Bitcoin wallet in React Native. Optimized animations with D3.js to keep the bridge lean, built privacy/anonymity options, and reworked UX for mobile-first accessibility. The owner doubled my rate twice in a week.",
        tags: ["react native", "d3.js", "open source"],
      },
    ],
  },
  {
    years: "'22",
    yearsRange: { start: "2022", end: "2022" },
    title: "Open Source Contributor",
    company: "freeCodeCamp",
    projects: [
      {
        name: "UI components TypeScript setup",
        url: "https://www.freecodecamp.org/",
        description:
          "Set up TypeScript for freeCodeCamp's new UI component library — sample components, stories, and Jest config updates to support TS end-to-end.",
        tags: ["typescript", "jest", "react native"],
      },
    ],
  },
];
