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
    name: "Inkrun",
    url: "#",
    blurb: "A markdown-first journaling app for engineers. Local-first, syncs through git.",
    year: "2025",
    stack: "swift · rust",
  },
  {
    num: "02",
    name: "Pagely",
    url: "#",
    blurb: "A lightweight on-call rotation manager. Pages humans, not robots.",
    year: "2024",
    stack: "go · postgres",
  },
  {
    num: "03",
    name: "Statwell",
    url: "#",
    blurb: "Tiny analytics for indie SaaS. No cookies, no dashboards you'll never open.",
    year: "2024",
    stack: "elixir · litefs",
  },
  {
    num: "04",
    name: "Quietkit",
    url: "#",
    blurb: "A focus timer that learns your rhythm and protects your deep work hours.",
    year: "2023",
    stack: "react native",
  },
];
