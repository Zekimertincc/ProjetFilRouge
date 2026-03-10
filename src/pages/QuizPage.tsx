import { useState } from "react";
import QuizMode from "../composants/QuizMode";

function QuizPage() {
  const [script, setScript] = useState<"hiragana" | "katakana">("hiragana");

  return (
    <>
      <div className="script-toggle">
        <button
          className={`script-btn${script === "hiragana" ? " active" : ""}`}
          onClick={() => setScript("hiragana")}
        >
          Hiragana
        </button>

        <button
          className={`script-btn${script === "katakana" ? " active" : ""}`}
          onClick={() => setScript("katakana")}
        >
          Katakana
        </button>
      </div>

      <QuizMode key={script} script={script} />
    </>
  );
}

export default QuizPage;