import { MarkdownDocument } from "@/components/MarkdownDocument";

interface FrontMatter {
  title?: string;
  deck?: string;
  summary?: string;
  updated?: string;
}

interface DocumentPageProps {
  frontMatter: FrontMatter;
  content: string;
}

export function DocumentPage({ frontMatter, content }: DocumentPageProps) {
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
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            {frontMatter.deck}
          </p>
        )}
        {frontMatter.summary && frontMatter.summary !== "TKTK" && (
          <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">
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
