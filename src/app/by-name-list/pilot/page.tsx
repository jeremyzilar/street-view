import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { DocumentPage } from "@/components/DocumentPage";
import { PageLayout } from "@/components/PageLayout";

export default async function PilotPage() {
  // Read the markdown file from the docs folder
  const filePath = path.join(process.cwd(), "docs", "pilot.md");
  const fileContents = await fs.readFile(filePath, "utf8");

  // Parse front matter
  const { data: frontMatter, content } = matter(fileContents);

  return (
    <PageLayout>
      <DocumentPage
        frontMatter={frontMatter}
        content={content}
        showToc={true}
      />
    </PageLayout>
  );
}
