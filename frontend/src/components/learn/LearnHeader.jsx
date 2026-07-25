function LearnHeader({ goBack, topic, subject, chapter }) {
  return (
    <div className="vhd">
      <div className="vhd-top-row">
        <button className="vback" onClick={goBack}>
          ← Topics
        </button>
        <div className="vsub">
          {subject?.icon ? <span>{subject.icon} </span> : null}
          {subject?.label} · {chapter?.label}
        </div>
      </div>
      <h1 className="vtitle">{topic}</h1>
    </div>
  );
}

export default LearnHeader;

