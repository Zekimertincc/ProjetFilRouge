import CharacterCard from "./CharacterCard";
import { kanaData } from "./kanaData";

interface StudyModeProps {
  script: "hiragana" | "katakana";
}

function StudyMode({ script }: StudyModeProps) {
  const rows = [...new Set(kanaData.map((k) => k.row))];

  return (
    <div>
      {rows.map((row) => {
        const chars = kanaData.filter((k) => k.row === row);

        return (
          <div key={row}>
            <div className="row-label">ligne {row}</div>

            <div className="char-grid">
              {chars.map((kana) => (
                <CharacterCard
                  key={`${kana.romanji}-${kana.hiragana}`}
                  character={script === "hiragana" ? kana.hiragana : kana.katakana}
                  romanji={kana.romanji}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StudyMode;