import { useEffect, useState, useMemo } from "react";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonColor } from "./PokemonColor";
import { PokemonEvolutions } from "./PokemonEvolutions";
import { PokemonImage } from "./PokemonImage";
import { BackButton } from "./BackButton";
import { PokemonData } from "../../types";
import Link from "next/link";

export const getPokemonChain = (acc: any, data: any) => {
  if (!data) return acc;
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

export default async function PokemonPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const pokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  ).then((res) => res.json());

  const speciesData = await fetch(pokemonData.species.url).then((res) =>
    res.json()
  );
  const pokemonChainData: PokemonChain = await fetch(
    speciesData.evolution_chain.url
  ).then((res) => res.json());

  const pokemonChain = getPokemonChain(
    [],
    pokemonChainData?.chain.evolves_to[0]
  );

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
