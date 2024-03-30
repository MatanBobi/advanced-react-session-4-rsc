import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Pokemon } from "./types";
import { PokemonItem } from "./PokemonItem";

const PokemonsListInner = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemons = () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
        .then((response) => response.json())
        .then((data) => {
          setPokemons(data.results);
        });
    };

    getPokemons();
  }, []);

  return (
    <main className="grid gap-4 grid-cols-3">
      {pokemons.map((pokemon) => (
        <PokemonItem name={pokemon.name} key={pokemon.name} />
      ))}
    </main>
  );
};

export const PokemonsList = memo(PokemonsListInner);
