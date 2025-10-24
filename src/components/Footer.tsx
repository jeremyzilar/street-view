"use client";

import Link from "next/link";
import { getAllNavLinks } from "@/config/navigation";

export function Footer() {
  const navLinks = getAllNavLinks();

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          {/* Title and description */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              <Link
                href="/"
                className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                The Many Paths Project
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Paid for by the{" "}
              <Link
                href="https://santafenm.gov/chs/homelessness"
                className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                City of Santa Fe
              </Link>{" "}
              and operated by the local network of service providers, outreach
              teams, healthcare workers, and community partners.
            </p>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} The Many Paths Project. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
