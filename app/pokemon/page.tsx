import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const caughtPokemons: any[] = [];

export default async function Home() {
  // Get a list of 151 pokemons from an api

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container flex flex-row flex-wrap gap-1">
        <Suspense fallback={<p>Loading...</p>}>
          <PokemonsList />
        </Suspense>
      </div>
    </main>
  );
}

async function PokemonsList() {
  const data = await new Promise((resolve) => {
    const data = fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(
      (res) => res.json()
    );
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });

  return (
    <>
      {data.results.map((pokemon: any) => (
        <Link
          href={`/pokemon/${pokemon.name}`}
          key={pokemon.name}
          className="flex flex-row items-center justify-center cursor-pointer"
        >
          <div className="cursor-pointer">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pokemon.url.split("/").slice(-2)[0]
              }.png`}
              width={100}
              height={100}
              alt={pokemon.name}
            />
            <p className="text-2xl">{pokemon.name}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
