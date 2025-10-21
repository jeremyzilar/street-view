import { promises as fs } from "fs";
import path from "path";
import { MarkdownDocument } from "@/components/MarkdownDocument";

export default async function MissionPage() {
  // Read the markdown file from the docs folder
  const filePath = path.join(process.cwd(), "docs", "mission.md");
  const fileContents = await fs.readFile(filePath, "utf8");

  return (
    <div className="max-w-4xl mx-auto">
      <MarkdownDocument content={fileContents} />
    </div>
  );
}
