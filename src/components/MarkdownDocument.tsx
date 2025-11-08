import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TableOfContents } from "./TableOfContents";

interface MarkdownDocumentProps {
  content: string;
  className?: string;
}

export function MarkdownDocument({
  content,
  className = "",
}: MarkdownDocumentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
