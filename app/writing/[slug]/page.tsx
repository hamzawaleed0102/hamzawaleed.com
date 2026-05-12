import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { allPosts, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const description = post.description ?? truncate(stripMarkdown(post.body), 160);
  const url = `/writing/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      publishedTime: new Date(post.date).toISOString(),
      authors: [site.name],
      tags: post.tags,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[*_`>#-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + "…";
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = marked.parse(post.body, { async: false }) as string;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/writing/${post.slug}`,
    },
    image: post.cover ? [post.cover] : undefined,
    keywords: post.tags.join(", ") || undefined,
  };

  return (
    <>
      <Nav current="writing" />
      <main className="wrap article" data-screen-label={post.title}>
        <header className="article-head">
          <Link href="/" className="back-link">← writing</Link>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <time dateTime={post.date}>{post.dateLabel}, {new Date(post.date).getUTCFullYear()}</time>
            <span className="sep" aria-hidden="true"></span>
            <span>{post.minutes} min read</span>
          </div>
        </header>

        <article
          className="article-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <Footer />
      </main>

      <Script
        id="ld-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
