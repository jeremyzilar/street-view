import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <div className="tablet-lg:fixed tablet-lg:top-0 tablet-lg:left-0 tablet-lg:h-screen w-full tablet-lg:w-card-lg bg-slate-300 dark:bg-gray-800 flex flex-row tablet-lg:flex-col tablet-lg:justify-between z-50">
      <div className="flex flex-col justify-between w-full">
        <div className="px-4 pt-4 pb-3 bg-black dark:bg-white">
          <h1 className="font-bold font-display leading-[29px] text-white tracking-wide text-4xl dark:text-black whitespace-nowrap">
            Street View
          </h1>
        </div>

        <nav className="hidden tablet-lg:block p-4 space-y-4">
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
        </nav>
      </div>

      <div className="bg-slate-400 dark:bg-gray-700 px-2 py-2 flex flex-col tablet-lg:flex-row items-center">
        <ThemeToggle />
      </div>
    </div>
  );
}
