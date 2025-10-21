import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { DocumentPage } from "@/components/DocumentPage";

export default async function ManualPage() {
  // Read the markdown file from the docs folder
  const filePath = path.join(process.cwd(), "docs", "manual.md");
  const fileContents = await fs.readFile(filePath, "utf8");

  // Parse front matter
  const { data: frontMatter, content } = matter(fileContents);

  return <DocumentPage frontMatter={frontMatter} content={content} />;
}
