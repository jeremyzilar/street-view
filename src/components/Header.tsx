"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 tablet-lg:fixed left-0 tablet-lg:h-screen w-full tablet-lg:w-card-lg bg-slate-300 dark:bg-gray-800 flex flex-row tablet-lg:flex-col tablet-lg:justify-between z-50">
      <div className="flex flex-col justify-between w-full">
        <div className="px-4 pt-3.5 pb-3.5 bg-black dark:bg-white flex items-center gap-x-2">
          <button
            className="tablet-lg:hidden text-white dark:text-black focus:outline-none"
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
          <h1 className="font-bold font-display leading-[28px] text-white tracking-wide text-4xl dark:text-black whitespace-nowrap">
            <Link className="inline" href="/">
              Caminos SF
            </Link>
          </h1>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden tablet-lg:block p-4 space-y-4">
          <NavLinks />
        </nav>
      </div>

      <div className="bg-slate-600 dark:bg-gray-500 px-3 py-2 flex flex-col tablet-lg:flex-row items-center">
        <ThemeToggle />
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

const NavLinks = () => {
  return (
    <>
      <ul className="space-y-2 pb-4">
        <li>
          <Link
            className="text-gray-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1"
            href="/people"
          >
            All people
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1"
            href="/encampments"
          >
            All encampments
          </Link>
        </li>
      </ul>
      <ul className="space-y-2 border-t border-gray-800 dark:border-gray-700 pt-8">
        <li>
          <Link
            href="/add/person"
            className="text-gray-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add a person
          </Link>
        </li>
        <li>
          <Link
            href="/add/encampment"
            className="text-gray-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add an encampment
          </Link>
        </li>
      </ul>
    </>
  );
};
