import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  current?: "writing" | "products" | "portfolio";
};

export function Nav({ current = "writing" }: Props) {
  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="brand">
        <span>hamza waleed</span>
        <span className="dot">.</span>
      </Link>
      <div className="nav-links">
        <Link href="/" className={current === "writing" ? "is-on" : undefined}>
          writing
        </Link>
        <Link
          href="/products"
          className={current === "products" ? "is-on" : undefined}
        >
          products
        </Link>
        <Link
          href="/portfolio"
          className={current === "portfolio" ? "is-on" : undefined}
        >
          portfolio
        </Link>
        <Link href="#contact">contact</Link>
        <button type="button" className="search" aria-label="Search">
          <svg
            width="11"
            height="11"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <span className="search-label">search</span>
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
