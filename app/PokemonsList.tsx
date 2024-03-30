import { memo } from "react";
import { Pokemon } from "./types";
import PokemonItem from "./PokemonItem";

const PokemonsListInner = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const pokemons: Pokemon[] = await response
    .json()
    .then((data) => data.results);

  return (
    <main className="grid gap-4 grid-cols-3">
      {pokemons.map((pokemon) => (
        <PokemonItem name={pokemon.name} key={pokemon.name} />
      ))}
    </main>
  );
};

export default memo(PokemonsListInner);
