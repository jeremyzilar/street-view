"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 py-12 pb-24 h-full w-auto tablet-lg:w-desktop mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-10">
        <h1 className="text-5xl font-black text-gray-900 dark:text-white">
          Many Paths SF
        </h1>
        <p className="text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Collective care coordination for people experiencing street
          homelessness in Santa Fe
        </p>
      </div>

      {/* Mission Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          The Many Paths Project fills the critical gap between the existing
          support systems for people experiencing street homelessness in Santa
          Fe.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Through collective care, we help the people in our community who are
          experiencing street homelessness get the medical help, supplies,
          shelter, and support they need to succeed on their path towards stable
          housing.
        </p>
        <Link
          href="/mission"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          Read our full mission
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Documents Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Documentation & Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/mission"
            className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Mission Statement
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn about our purpose, values, and commitment to the community.
            </p>
          </Link>

          <Link
            href="/who-we-are"
            className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Who We Are
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We are a group of providers who ...
            </p>
          </Link>
        </div>
        <div className="">
          <ul>
            <li>
              <Link href="/manual">Operations Manual</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
