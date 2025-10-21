import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownDocumentProps {
  content: string;
  className?: string;
}

export function MarkdownDocument({
  content,
  className = "",
}: MarkdownDocumentProps) {
  return (
    <div
      className={`p-4 prose prose-lg dark:prose-invert max-w-none ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
