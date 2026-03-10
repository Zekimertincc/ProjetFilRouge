import { useEffect, useRef } from "react";
import { kanaData } from "../composants/kanaData";
import { useQuiz } from "../hooks/useQuiz";

interface QuizModeProps {
  script: "hiragana" | "katakana";
}

function QuizMode({ script }: QuizModeProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    currentKana,
    currentIndex,
    totalQuestions,
    userAnswer,
    setUserAnswer,
    score,
    bestScore,
    successRate,
    feedback,
    canSubmit,
    handleSubmit,
    resetQuiz,
  } = useQuiz(kanaData);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentKana]);

  if (!currentKana) {
    return <p>Chargement du quiz...</p>;
  }

  const displayCharacter =
    script === "hiragana" ? currentKana.hiragana : currentKana.katakana;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-script-row">
        <span className="quiz-script-label">
          Script actuel : {script === "hiragana" ? "Hiragana" : "Katakana"}
        </span>

        <button type="button" className="reset-btn" onClick={resetQuiz}>
          Reset
        </button>
      </div>

      <div className="quiz-score-bar">
        <div>
          <div className="score-label">Score</div>
          <div className="score-value">
            {score.correct}
            <span style={{ opacity: 0.4, fontWeight: 400 }}> / {score.total}</span>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div className="score-label">Best</div>
          <div className="score-pct">{bestScore}</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="score-label">Réussite</div>
          <div className="score-pct">{score.total > 0 ? `${successRate}%` : "—"}</div>
        </div>
      </div>

      {score.total > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${successRate}%` }} />
        </div>
      )}

      <div className="quiz-card">
        <span className="quiz-row-tag">
          ligne {currentKana.row} · {currentIndex + 1}/{totalQuestions}
        </span>

        <span className="quiz-char">{displayCharacter}</span>
        <span className="quiz-hint">Entrez la romanisation</span>
      </div>

      <form className="quiz-form" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          className="quiz-input"
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="ex: ka, shi, tsu..."
        />

        <button className="quiz-submit" type="submit" disabled={!canSubmit}>
          Valider
        </button>
      </form>

      {feedback && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}

export default QuizMode;