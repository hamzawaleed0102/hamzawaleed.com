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

  const stripped = stripLeadingH1(content);

  const title =
    (data.title as string | undefined) ?? stripped.title ?? "Untitled";

  const date =
    typeof data.datePublished === "string"
      ? new Date(data.datePublished).toISOString().slice(0, 10)
      : "1970-01-01";

  const slug = (data.slug as string | undefined) ?? filename.replace(/\.md$/, "");

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
