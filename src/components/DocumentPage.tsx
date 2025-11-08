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
      <>
        <main>
          <section className="max-w-desktop-lg mx-auto px-4">
            <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
              <PageHeader frontMatter={frontMatter} />
            </div>
          </section>
          <section className="max-w-desktop-lg mx-auto px-4">
            <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
              <div className="desktop:block hidden col-span-4 tablet-lg:col-span-3">
                <TableOfContents />
              </div>
              <div className="col-span-4 tablet-lg:col-span-9">
                <MarkdownDocument content={content} />
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  // Default layout without TOC
  return (
    <main className="flex flex-col max-w-desktop-lg mx-auto px-4">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-8 tablet-lg:col-start-3">
          <div className="space-y-8">
            {/* Front Matter Header */}
            <div className="py-12">
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
        </div>
      </div>
    </main>
  );
}

const PageHeader = ({ frontMatter }: { frontMatter: FrontMatter }) => {
  return (
    <div className="col-span-4 tablet-lg:col-span-10">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-8 py-20 pb-28">
        {/* Front Matter Header */}

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
    </div>
  );
};
