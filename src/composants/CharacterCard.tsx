interface CharacterCardProps {
  character: string;
  romanji: string;
}

function CharacterCard({ character, romanji }: CharacterCardProps) {
  return (
    <div className="char-card">
      <span className="char-symbol">{character}</span>
      <span className="char-romanji">{romanji}</span>
    </div>
  );
}

export default CharacterCard;