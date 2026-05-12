"use client";

import { useCallback } from "react";

export function ThemeToggle() {
  const onClick = useCallback(() => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("hw-theme", isDark ? "dark" : "light");
    } catch {}
  }, []);

  return (
    <button
      type="button"
      className="theme-btn"
      onClick={onClick}
      aria-label="Toggle theme"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M12.5 9.5A5 5 0 1 1 6.5 3.5a4 4 0 0 0 6 6z" />
      </svg>
    </button>
  );
}
