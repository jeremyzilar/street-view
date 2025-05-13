"use client";

import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end">
        <ThemeToggle />
      </div>
    </footer>
  );
}
