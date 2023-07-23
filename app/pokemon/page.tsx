import Image from "next/image";
import Link from "next/link";

export const caughtPokemons = [];

export default async function Home() {
  // Get a list of 151 pokemons from an api
  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(
    (res) => res.json()
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container flex flex-row flex-wrap">
        {data.results.map((pokemon) => (
          <Link
            href={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            className="flex flex-row items-center justify-center"
          >
            <div>
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
      </div>
    </main>
  );
}
