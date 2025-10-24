import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { DocumentPage } from "@/components/DocumentPage";
import { PageLayout } from "@/components/PageLayout";
import { PeopleTable } from "@/components/PeopleTable";

export default async function ByNameListPage() {
  // Read the markdown file from the docs folder
  const filePath = path.join(process.cwd(), "docs", "by-name-list.md");
  const fileContents = await fs.readFile(filePath, "utf8");

  // Parse front matter
  const { data: frontMatter, content } = matter(fileContents);

  return (
    <PageLayout>
      <DocumentPage frontMatter={frontMatter} content={content} />

      <div className="pt-12 max-w-full mx-auto">
        <PeopleTable />
      </div>
    </PageLayout>
  );
}
