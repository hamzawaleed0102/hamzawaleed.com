import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    type: "website",
  },
  twitter: {
    title: site.title,
    description: site.description,
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${site.name} — Writing`,
  url: `${site.url}/`,
  description: site.description,
  author: { "@type": "Person", name: site.name, url: site.url },
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    datePublished: new Date(p.date).toISOString(),
    url: `${site.url}/writing/${p.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
  })),
};

export default function HomePage() {
  return (
    <>
      <Nav current="writing" />
      <main className="wrap" data-screen-label="Home">
        <section className="hero">
          <h1 className="title">
            Hamza<br />
            Waleed<span className="ac">.</span>
          </h1>
          <p className="bio">
            Principal software engineer. Notes on systems, scale, and the craft underneath.
          </p>
        </section>

        <div className="section-head">
          <h2>Writing</h2>
        </div>

        <ul className="posts">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                className="post"
                href={`/writing/${p.slug}`}
                aria-label={`${p.title} — ${p.minutes} minute read, ${p.dateLabel}`}
              >
                <time className="date" dateTime={p.date}>{p.dateLabel}</time>
                <span className="post-title">{p.title}</span>
                <span className="min">{p.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>

        <Footer />
      </main>

      <Script
        id="ld-blog"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
    </>
  );
}
