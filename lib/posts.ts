import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  minutes: number;
  description?: string;
  cover?: string;
  tags: string[];
  body: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// Hashnode CUID filenames don't sort by date and aren't URL-friendly.
// This table maps the source filename → published date + slug.
// Dates are pulled from the original Hashnode frontmatter where present,
// or from the first-commit date in the legacy blog repo otherwise.
const META: Record<string, { date: string; slug?: string }> = {
  "clcuf63u2000j08l8ai1dbkp7.md": {
    date: "2023-01-13",
    slug: "master-the-art-of-react-hooks",
  },
  "clcumsb2h000008l2hrxk9ogo.md": { date: "2023-01-13", slug: "resume" },
  "clcw5r26b000008kzhqk1h7mq.md": {
    date: "2023-01-14",
    slug: "anony-botter-send-anonymous-message-on-slack",
  },
  "clcx6402q000408li0zrt5iyc.md": {
    date: "2023-01-15",
    slug: "combatting-burnout-in-the-software-industry",
  },
  "cld4mpxdo02vk3pnvd5hp50mp.md": {
    date: "2023-01-20",
    slug: "building-a-slack-bot-for-fun-and-profit",
  },
  "cldfrsmmc000708l2hapfcdlp.md": {
    date: "2023-01-28",
    slug: "the-power-of-blogging",
  },
  "cldlnrxh1000309mkfkbx8rpm.md": { date: "2023-02-01", slug: "portfolio" },
  "cle18fqcb00010ajo9b2d43wn.md": {
    date: "2023-02-12",
    slug: "code-sharing-react-native-monorepo",
  },
};

// Slugs that exist as standalone pages, not as blog entries.
const HIDDEN_FROM_INDEX = new Set(["resume", "portfolio"]);

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

function toDateLabel(iso: string): string {
  const d = new Date(iso);
  const month = MONTHS[d.getUTCMonth()];
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${month} ${day}`;
}

function estimateMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function stripLeadingH1(md: string): { title: string | null; body: string } {
  const m = md.match(/^\s*#\s+(.+?)\s*\n+/);
  if (!m) return { title: null, body: md };
  return { title: m[1], body: md.slice(m[0].length) };
}

function parseFile(filename: string): Post {
  const filepath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);

  const meta = META[filename] ?? { date: "1970-01-01", slug: filename.replace(/\.md$/, "") };
  const stripped = stripLeadingH1(content);

  const title =
    (data.title as string | undefined) ?? stripped.title ?? "Untitled";

  const date =
    typeof data.datePublished === "string"
      ? new Date(data.datePublished).toISOString().slice(0, 10)
      : meta.date;

  const slug = (data.slug as string | undefined) ?? meta.slug!;

  const tags =
    typeof data.tags === "string"
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : Array.isArray(data.tags)
        ? (data.tags as string[])
        : [];

  return {
    slug,
    title,
    date,
    dateLabel: toDateLabel(date),
    minutes: estimateMinutes(stripped.body),
    description: data.seoDescription as string | undefined,
    cover: data.cover as string | undefined,
    tags,
    body: stripped.body,
  };
}

function loadAll(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const all = loadAll();

export const posts: Post[] = all.filter((p) => !HIDDEN_FROM_INDEX.has(p.slug));
export const allPosts: Post[] = all;

export function getPostBySlug(slug: string): Post | undefined {
  return all.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return all.map((p) => p.slug);
}
