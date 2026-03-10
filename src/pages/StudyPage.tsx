import { useState } from "react";
import StudyMode from "../composants/StudyMode";

function StudyPage() {
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

      <StudyMode script={script} />
    </>
  );
}

export default StudyPage;