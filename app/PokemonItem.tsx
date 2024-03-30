import { PokemonData } from "./types";
import Link from "next/link";

export default async function PokemonItem({ name }: { name: string }) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonData: PokemonData = await response.json();

  if (!pokemonData) {
    return null;
  }

  return (
    <Link href={`/pokemon/${pokemonData.id}`} className="no-underline">
      <div className="flex justify-center items-center">
        {pokemonData.sprites && (
          <img src={pokemonData.sprites.front_default} alt="" />
        )}
        <div className="text-3xl float-left p-5 text-app-pink">{name}</div>
      </div>
    </Link>
  );
}
