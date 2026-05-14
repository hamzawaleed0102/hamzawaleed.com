import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { defaultOgImages, defaultTwitterImages } from "@/lib/og";

const pageTitle = "Products";
const pageDescription = "Small, opinionated software I ship on the side.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/products" },
  openGraph: {
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
    url: "/products",
    type: "website",
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
    images: defaultTwitterImages,
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${site.name} — Products`,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: p.name,
      description: p.blurb,
      applicationCategory: "Productivity",
      operatingSystem: "Web",
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <Nav current="products" />
      <main className="wrap" data-screen-label="Products">
        <section className="page-hero">
          <h1>
            Products<span className="ac">.</span>
          </h1>
          <p className="lede">{pageDescription}</p>
        </section>

        <section className="products" aria-label="Products list">
          {products.map((p) => {
            const isInternal = p.url.startsWith("/");
            const inner = (
              <>
                <span className="num" aria-hidden="true">{p.num}</span>
                <div>
                  <h2 className="name">{p.name}</h2>
                  <p className="blurb">{p.blurb}</p>
                  <div className="meta">
                    <time dateTime={p.year}>{p.year}</time>
                    <span className="sep" aria-hidden="true"></span>
                    <span>{p.stack}</span>
                  </div>
                </div>
                {isInternal ? (
                  <span className="visit">
                    read more <span className="arr" aria-hidden="true">→</span>
                  </span>
                ) : (
                  <span className="visit">
                    visit <span className="arr" aria-hidden="true">↗</span>
                  </span>
                )}
              </>
            );
            return isInternal ? (
              <Link
                key={p.num}
                className="product"
                href={p.url}
                aria-label={`${p.name} — read more`}
              >
                {inner}
              </Link>
            ) : (
              <a
                key={p.num}
                className="product"
                href={p.url}
                rel={p.url !== "#" ? "noopener" : undefined}
                target={p.url !== "#" ? "_blank" : undefined}
                aria-label={`${p.name} — visit project`}
              >
                {inner}
              </a>
            );
          })}
        </section>

        <Footer />
      </main>

      <Script
        id="ld-products"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Script
        id="ld-breadcrumb-products"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
