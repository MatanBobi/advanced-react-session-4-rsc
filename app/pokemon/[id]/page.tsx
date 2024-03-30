"use client";

import { useEffect, useState, useMemo } from "react";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonColor } from "./PokemonColor";
import { PokemonEvolutions } from "./PokemonEvolutions";
import { PokemonImage } from "./PokemonImage";
import { BackButton } from "./BackButton";
import { PokemonData } from "../../types";
import Link from "next/link";

export const getPokemonChain = (acc: any, data: any) => {
  acc.push({
    name: data.species.name,
  });
  if (data.evolves_to.length === 0) {
    return acc;
  } else {
    return data.evolves_to.reduce(getPokemonChain, acc);
  }
};

interface PokemonChain {
  chain: { evolves_to: { species: { name: string } }[] };
}

export default function PokemonPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [pokemonChainData, setPokemonChain] = useState<PokemonChain | null>(
    null
  );
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data: PokemonData) => {
        setPokemonData(data);
        fetch(data.species.url)
          .then((response) => response.json())
          .then((data: { evolution_chain: { url: string } }) => {
            fetch(data.evolution_chain.url)
              .then((response) => response.json())
              .then((data: PokemonChain) => {
                setPokemonChain(data);
              });
          });
      });
  }, [id]);

  const pokemonChain = useMemo(() => {
    if (pokemonChainData?.chain) {
      return getPokemonChain([], pokemonChainData.chain.evolves_to[0]);
    }
  }, [pokemonChainData]);

  return (
    <div className="grid grid-cols-3 py-6 px-12 text-app-pink pokemon-page w-full">
      <Link href="/">
        <BackButton />
      </Link>
      {pokemonData ? (
        <>
          <PokemonImage pokemonData={pokemonData} />
          <PokemonDetails pokemonData={pokemonData} />
          <PokemonColor types={pokemonData.types} />
        </>
      ) : null}
      <PokemonEvolutions pokemonChain={pokemonChain} />
    </div>
  );
}
