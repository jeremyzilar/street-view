"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract all H2 headings from the document
    const h2Elements = Array.from(document.querySelectorAll("h2"));
    const items = h2Elements.map((heading, index) => {
      // Ensure we have a valid ID, generate one if missing
      let id = heading.id;
      if (!id) {
        // Generate ID from text content
        const text = heading.textContent || "";
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        // Add index to ensure uniqueness
        id = id ? `${id}-${index}` : `heading-${index}`;
        heading.id = id; // Set the ID on the element
      }
      return {
        id,
        text: heading.textContent || "",
      };
    });
    // Filter out any headings without text
    const filteredItems = items.filter((item) => item.text.trim() !== "");
    setHeadings(filteredItems);

    // Set up intersection observer for active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
      }
    );

    h2Elements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden desktop:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
        On this page
      </h3>
      <ul className="space-y-2 text-sm border-l-2 border-gray-200 dark:border-gray-700">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 px-3 -ml-px border-l-2 transition-colors ${
                activeId === heading.id
                  ? "border-peach-600 text-peach-600 dark:border-peach-400 dark:text-peach-400 font-medium"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `#${heading.id}`);
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
