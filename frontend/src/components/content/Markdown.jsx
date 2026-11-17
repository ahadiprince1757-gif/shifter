import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function Markdown({ children }) {
  if (!children) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ node, ...props }) => <p className="editorial-p" {...props} />,
        table: ({ node, ...props }) => (
          <div className="table-responsive">
            <table {...props} />
          </div>
        ),
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
}
