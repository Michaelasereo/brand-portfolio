import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

/** Normalize lines that start with Unicode bullets (e.g. from Word/Docs) to markdown list syntax. */
function normalizeListMarkdown(text: string): string {
  return text.replace(/^[•·]\s+/gm, "- ");
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const normalized = normalizeListMarkdown(content);
  return (
    <div className="markdown-content">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              {children}
            </a>
          ),
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
