import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <div className="hidden tablet-lg:block w-card-lg bg-emerald-200 dark:bg-gray-800">
      <div className="p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-900 dark:text-white">
          Street View
        </h1>
        <div className="">
          <ThemeToggle />
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/add/person"
              className="text-gray-900 dark:text-white hover:underline underline-offset-4"
            >
              Add a person
            </Link>
          </li>
          <li>
            <Link
              href="/add/encampment"
              className="text-gray-900 dark:text-white hover:underline underline-offset-4"
            >
              Add an encampment
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
