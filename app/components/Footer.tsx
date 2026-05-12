import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="foot" id="contact">
      <span className="copy">© {new Date().getFullYear()}</span>
      <div className="socials">
        <a href={site.social.x} aria-label="X" rel="me noopener" target="_blank">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M12.6 1.5h2.3L9.9 7.2 15.7 14.5h-4.5L7.6 9.9l-4.2 4.6H1l5.3-5.9L.7 1.5h4.6l3.3 4.2 3.9-4.2zM11.8 13.2h1.3L4.3 2.8H2.9l8.9 10.4z" />
          </svg>
        </a>
        <a href={site.social.github} aria-label="GitHub" rel="me noopener" target="_blank">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 .3a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3.7 0 1.4.1 2 .3 1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.3.5.7.5 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 .3z" />
          </svg>
        </a>
        <a href={site.social.linkedin} aria-label="LinkedIn" rel="me noopener" target="_blank">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M3.5 1.4A1.6 1.6 0 1 1 .3 1.4a1.6 1.6 0 0 1 3.2 0zM.5 5.3h2.9v9.4H.5zM5.6 5.3h2.8v1.3c.4-.7 1.3-1.5 2.8-1.5 3 0 3.6 1.9 3.6 4.4v5.2h-2.9v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.7H5.6z" />
          </svg>
        </a>
        <a href={`mailto:${site.email}`} aria-label="Email">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <rect x="1.5" y="3.5" width="13" height="9" rx="1" />
            <path d="M1.5 4.5l6.5 4 6.5-4" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
