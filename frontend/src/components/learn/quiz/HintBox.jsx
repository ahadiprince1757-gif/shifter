function HintBox({ showHint, hintText }) {
  if (!showHint) return null;

  return (
    <div className="hint-box">
      💡 <strong>Hint:</strong>{" "}
      {hintText || "Review the notes to formulate your answer."}
    </div>
  );
}

export default HintBox;
