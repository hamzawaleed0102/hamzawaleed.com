import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { roles } from "@/lib/portfolio";
import { site } from "@/lib/site";

const pageTitle = "Portfolio";
const pageDescription = "Projects I've shipped across companies, ordered by recent.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
    url: "/portfolio",
    type: "profile",
  },
  twitter: {
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: `${site.url}/portfolio`,
  jobTitle: "Principal Software Engineer",
  worksFor: roles
    .filter((r) => r.highlight)
    .map((r) => ({ "@type": "Organization", name: r.company })),
  alumniOf: roles
    .filter((r) => !r.highlight)
    .map((r) => ({ "@type": "Organization", name: r.company })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: `${site.url}/portfolio` },
  ],
};

export default function PortfolioPage() {
  return (
    <>
      <Nav current="portfolio" />
      <main className="wrap" data-screen-label="Portfolio">
        <section className="page-hero">
          <h1>
            Portfolio<span className="ac">.</span>
          </h1>
          <p className="lede">{pageDescription}</p>
        </section>

        {roles.map((role) => {
          const range = role.yearsRange;
          const dateTimeAttr = range
            ? range.end
              ? `${range.start}/${range.end}`
              : `${range.start}/`
            : undefined;
          return (
            <section
              key={`${role.company}-${role.years}`}
              className="role"
              aria-label={`${role.title} at ${role.company}`}
            >
              <div className="role-head">
                <time className="role-years" dateTime={dateTimeAttr}>
                  {role.years}
                </time>
                <h2 className="role-title">
                  {role.title}{" "}
                  <span className={role.highlight ? "ac" : "where"}>
                    @ {role.company}
                  </span>
                </h2>
              </div>
              <div className="projects">
                {role.projects.map((project) => (
                  <a key={project.name} className="project" href={project.url}>
                    <div>
                      <div className="pname">{project.name}</div>
                      <p className="pdesc">{project.description}</p>
                    </div>
                    <div className="tags" aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        <Footer />
      </main>

      <Script
        id="ld-person-portfolio"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Script
        id="ld-breadcrumb-portfolio"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
