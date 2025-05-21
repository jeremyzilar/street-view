"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-900">
      <Link
        href="/add/person"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-600 dark:bg-blue-700 rounded shadow-sm hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add a person
      </Link>
      <Link
        href="/add/encampment"
        className="px-6 py-3 text-lg font-medium text-white bg-green-600 dark:bg-green-700 rounded shadow-sm hover:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add an encampment
      </Link>
    </div>
  );
}
