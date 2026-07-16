function MasteredPhase({
  topic,
  nextTopic,
  goBack,
  goToNext,
  failedQuestions,
}) {
  const hasMistakes = failedQuestions && failedQuestions.length > 0;

  return (
    <div className="mastered-container">
      {/* Beautiful, Shareable Achievement Card */}
      <div className="m-card">
        {/* Corner Branding */}
        <div className="m-card-header">
          <span className="m-brand">TIXAR</span>
          <span className="m-status">COMPLETED</span>
        </div>

        {/* Certificate Content */}
        <div className="m-card-body">
          <div className="m-badge">🏆</div>
          <h2 className="m-title">{topic}</h2>
          <p className="m-subtitle">Topic Mastery Achieved</p>
        </div>

        {/* Footer detail */}
        <div className="m-card-footer">
          <span>Verify progress on shifter.tixar.com</span>
        </div>
      </div>

      {/* review details if mistakes occurred, placed cleanly below card */}
      {hasMistakes && (
        <details className="m-review-details">
          <summary className="m-review-summary">
            Review {failedQuestions.length} correction{failedQuestions.length > 1 ? "s" : ""}
          </summary>
          <div className="m-review-content">
            {failedQuestions.map((item, index) => (
              <div key={index} className="m-review-item">
                <div className="m-review-q">Question {item.qIdx + 1}: {item.question}</div>
                <div className="m-review-ans">Correct: {item.correctAnswer}</div>
                {item.solution && <div className="m-review-sol">{item.solution}</div>}
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Distraction-free actions below the screenshot zone */}
      <div className="m-actions">
        {nextTopic ? (
          <>
            <button className="btn-p btn-m-continue" onClick={goToNext}>
              Continue to Next Topic
            </button>
            <button className="btn-g btn-m-back" onClick={goBack}>
              Return to Topics
            </button>
          </>
        ) : (
          <button className="btn-p btn-m-continue" onClick={goBack}>
            Return to Topics List
          </button>
        )}
      </div>
    </div>
  );
}

export default MasteredPhase;
