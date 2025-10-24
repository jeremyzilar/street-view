import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { DocumentPage } from "@/components/DocumentPage";
import { PageLayout } from "@/components/PageLayout";
import { ProvidersList } from "@/components/ProvidersList";

export default async function ProvidersPage() {
  // Read the markdown file from the docs folder
  const filePath = path.join(process.cwd(), "docs", "providers.md");
  const fileContents = await fs.readFile(filePath, "utf8");

  // Parse front matter
  const { data: frontMatter, content } = matter(fileContents);

  return (
    <PageLayout>
      <DocumentPage frontMatter={frontMatter} content={content} />

      <div className="pt-12 max-w-4xl mx-auto">
        <ProvidersList />
      </div>
    </PageLayout>
  );
}
