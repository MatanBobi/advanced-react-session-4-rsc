import { getMainImageUrl } from "../../helpers/utils";
import { PokemonData } from "../../types";

export function PokemonImage({ pokemonData }: { pokemonData: PokemonData }) {
  return (
    <div
      className="flex items-center justify-center max-w-48"
      style={{ gridArea: "image" }}
    >
      <img src={getMainImageUrl(pokemonData.name)} alt="" />
    </div>
  );
}
