import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { site } from "@/lib/site";

const pageTitle = "Contact";
const pageDescription = "Reach me through any of these channels.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
    url: "/contact",
    type: "profile",
  },
  twitter: {
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
  },
};

type Channel = {
  num: string;
  name: string;
  handle: string;
  href: string;
  external: boolean;
};

const channels: Channel[] = [
  {
    num: "01",
    name: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    num: "02",
    name: "X",
    handle: site.twitter,
    href: site.social.x,
    external: true,
  },
  {
    num: "03",
    name: "GitHub",
    handle: "github.com/hamzawaleed0102",
    href: site.social.github,
    external: true,
  },
  {
    num: "04",
    name: "LinkedIn",
    handle: "linkedin.com/in/hamza-waleed",
    href: site.social.linkedin,
    external: true,
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: `${site.url}/contact`,
  email: `mailto:${site.email}`,
  sameAs: [site.social.x, site.social.github, site.social.linkedin],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <Nav current="contact" />
      <main className="wrap" data-screen-label="Contact">
        <section className="page-hero">
          <h1>
            Contact<span className="ac">.</span>
          </h1>
          <p className="lede">{pageDescription}</p>
        </section>

        <section className="products" aria-label="Contact channels">
          {channels.map((c) => (
            <a
              key={c.name}
              className="product"
              href={c.href}
              rel={c.external ? "me noopener" : undefined}
              target={c.external ? "_blank" : undefined}
              aria-label={`${c.name} — ${c.handle}`}
            >
              <span className="num" aria-hidden="true">{c.num}</span>
              <div>
                <h2 className="name">{c.name}</h2>
                <p className="blurb">{c.handle}</p>
              </div>
              <span className="visit">
                {c.external ? "open" : "send"}{" "}
                <span className="arr" aria-hidden="true">
                  {c.external ? "↗" : "→"}
                </span>
              </span>
            </a>
          ))}
        </section>

        <Footer />
      </main>

      <Script
        id="ld-person-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Script
        id="ld-breadcrumb-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
