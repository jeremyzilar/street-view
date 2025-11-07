import { MarkdownDocument } from "@/components/MarkdownDocument";
import { TableOfContents } from "@/components/TableOfContents";

interface FrontMatter {
  title?: string;
  deck?: string;
  summary?: string;
  updated?: string;
}

interface DocumentPageProps {
  frontMatter: FrontMatter;
  content: string;
  showToc?: boolean;
}

export function DocumentPage({
  frontMatter,
  content,
  showToc = false,
}: DocumentPageProps) {
  if (showToc) {
    return (
      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Front Matter Header */}
          <div className="p-4">
            {frontMatter.title && (
              <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3">
                {frontMatter.title}
              </h1>
            )}
            {frontMatter.deck && (
              <p className="text-3xl font-extralight text-gray-600 dark:text-gray-300">
                {frontMatter.deck}
              </p>
            )}
            {frontMatter.summary && frontMatter.summary !== "TKTK" && (
              <p className="text-lg text-gray-700 dark:text-gray-400">
                {frontMatter.summary}
              </p>
            )}
            {frontMatter.updated && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {frontMatter.updated}
              </p>
            )}
          </div>

          {/* Markdown Content */}
          <MarkdownDocument content={content} />
        </div>

        {/* Table of Contents - Sidebar */}
        <aside className="hidden laptop:block w-64 shrink-0">
          <TableOfContents />
        </aside>
      </div>
    );
  }

  // Default layout without TOC
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Front Matter Header */}
      <div className="p-4">
        {frontMatter.title && (
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3">
            {frontMatter.title}
          </h1>
        )}
        {frontMatter.deck && (
          <p className="text-3xl font-extralight text-gray-600 dark:text-gray-300">
            {frontMatter.deck}
          </p>
        )}
        {frontMatter.summary && frontMatter.summary !== "TKTK" && (
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {frontMatter.summary}
          </p>
        )}
        {frontMatter.updated && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {frontMatter.updated}
          </p>
        )}
      </div>

      {/* Markdown Content */}
      <MarkdownDocument content={content} />
    </div>
  );
}
