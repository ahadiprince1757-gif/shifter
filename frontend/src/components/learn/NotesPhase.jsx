import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function NotesPhase({ topic, content, goBack, onNext }) {
  const notes = Array.isArray(content.notes)
    ? content.notes.join("\n")
    : content.notes || "";

  console.log(`NotesPhase: Rendering ${topic}`, {
    notesLength: notes.length,
    content,
  });

  const hasHtml = typeof notes === "string" && /<[^>]+>/.test(notes);
  const markup = notes || "<p>No notes are available for this topic yet.</p>";

  console.log(`NotesPhase: hasHtml=${hasHtml}, markupLength=${markup.length}`);

  return (
    <div className="lc" id="notesCard">
      <div className="lch">
        <span className="lbadge lb-n">📖 Notes</span>
        <span className="lct">{topic}</span>
      </div>
      <div className="lcb">
        <div className="nc">
          {hasHtml ? (
            <div dangerouslySetInnerHTML={{ __html: markup }} />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {markup}
            </ReactMarkdown>
          )}
        </div>
        <div className="lnav-strip">
          <button className="btn-g" onClick={goBack}>
            ← Back to Topics
          </button>
          <button className="btn-p" onClick={onNext}>
            I've Finished Reading →
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesPhase;
