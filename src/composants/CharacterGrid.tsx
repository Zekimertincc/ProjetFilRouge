import CharacterCard from "./CharacterCard";
type GridItem = {
  character: string;
  romanji: string;
};

interface CharacterGridProps {
  title: string;
  characters: GridItem[];
}

function CharacterGrid({ title, characters }: CharacterGridProps) {
  return (
    <section className="grid-section">
      <h2>{title}</h2>

      <div className="character-grid">
        {characters.map((item, index) => (
          <CharacterCard
            key={`${item.character}-${index}`}
            character={item.character}
            romanji={item.romanji}
          />
        ))}
      </div>
    </section>
  );
}

export default CharacterGrid;