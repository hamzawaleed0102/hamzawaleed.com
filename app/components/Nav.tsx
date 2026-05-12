import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  current?: "writing" | "products" | "portfolio" | "contact";
};

export function Nav({ current = "writing" }: Props) {
  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="brand">
        <span>hamza waleed</span>
        <span className="dot">.</span>
      </Link>
      <div className="nav-links">
        <Link
          href="/"
          aria-current={current === "writing" ? "page" : undefined}
          className={current === "writing" ? "is-on" : undefined}
        >
          writing
        </Link>
        <Link
          href="/products"
          aria-current={current === "products" ? "page" : undefined}
          className={current === "products" ? "is-on" : undefined}
        >
          products
        </Link>
        <Link
          href="/portfolio"
          aria-current={current === "portfolio" ? "page" : undefined}
          className={current === "portfolio" ? "is-on" : undefined}
        >
          portfolio
        </Link>
        <Link
          href="/contact"
          aria-current={current === "contact" ? "page" : undefined}
          className={current === "contact" ? "is-on" : undefined}
        >
          contact
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
