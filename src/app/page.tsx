"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Link
        href="/log"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-600 dark:bg-blue-700 rounded shadow-sm hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add a person
      </Link>
    </main>
  );
}
