"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { getAllNavLinks } from "@/config/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
      {/* Main header bar - horizontal layout */}
      <div className="flex items-center justify-between gap-4 py-2 px-4">
        {/* Mobile menu button */}
        <button
          className="tablet-lg:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Site title */}
        <h1 className="font-black text-2xl">
          <Link className="inline" href="/">
            Many Paths <span className="text-peach-800">Santa Fe</span>
          </Link>
        </h1>

        {/* Desktop navigation - horizontal */}
        <nav className="hidden tablet-lg:flex gap-4">
          <NavLinks horizontal />
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-start justify-start tablet-lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-64 bg-white dark:bg-gray-800 h-full shadow-lg p-6 flex flex-col">
            <button
              className="self-end mb-6 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="flex-1 flex flex-col gap-4">
              <NavLinks />
            </nav>
            <div className="mt-8">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const NavLinks = ({
  horizontal = false,
}: {
  horizontal?: boolean;
}): React.JSX.Element => {
  const navLinks = getAllNavLinks();

  return (
    <ul className={horizontal ? "flex items-center gap-6" : "pb-4 space-y-2"}>
      {navLinks.map((link) => (
        <li key={link.path}>
          <Link
            className="text-gray-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1"
            href={link.path}
            title={link.description}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
