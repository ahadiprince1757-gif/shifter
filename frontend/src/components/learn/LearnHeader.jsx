function LearnHeader({ goBack, topic, subject, chapter, phase }) {
  const phaseLabels = ["Notes", "Quiz", "Mastered"];
  const currentPhase = phaseLabels[phase] ?? "Notes";

  return (
    <div className="vhd">
      <button className="vback" onClick={goBack}>
        ← Back to Topics
      </button>
      <div className="vtitle">{topic}</div>
      <div className="vsub">
        {subject.icon} {subject.label} · {chapter.label}
      </div>
      <div className="vphase">{currentPhase}</div>
    </div>
  );
}

export default LearnHeader;
