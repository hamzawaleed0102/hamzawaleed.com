import type { Metadata } from "next";
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
              <Link className="post" href={`/writing/${p.slug}`}>
                <span className="date">{p.dateLabel}</span>
                <span className="post-title">{p.title}</span>
                <span className="min">{p.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/writing" className="archive-link">
          browse the full archive →
        </Link>

        <Footer />
      </main>
    </>
  );
}
