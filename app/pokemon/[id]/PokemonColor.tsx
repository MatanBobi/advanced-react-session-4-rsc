import { TypeItem } from "./TypeItem";
import { PokemonType } from "../../types";

export function PokemonColor({ types }: { types: PokemonType[] }) {
  return (
    <div style={{ gridArea: "color" }}>
      <h5>Types:</h5>
      <ul className="mt-2 mb-4 ps-0">
        {types &&
          types.map(({ type }) => <TypeItem key={type.name} type={type} />)}
      </ul>
    </div>
  );
}
