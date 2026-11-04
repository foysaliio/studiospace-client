"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:block">Switch to light mode</span>

      <Moon
        size={17}
        aria-hidden="true"
        className="dark:hidden motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-rotate-12"
      />

      <Sun
        size={17}
        aria-hidden="true"
        className="hidden dark:block motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:rotate-12"
      />
    </button>
  );
}
