import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { PokemonData } from "./types";
import Link from "next/link";

export function PokemonItem({ name }: { name: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      });
  }, [name]);

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
