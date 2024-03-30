import { PokemonData } from "../../types";

export function PokemonDetails({ pokemonData }: { pokemonData: PokemonData }) {
  return (
    <>
      <h1
        className="text-app-pink text-6xl mx-0 my-5 first-letter:uppercase"
        style={{ gridArea: "header" }}
      >
        {pokemonData.name}
      </h1>
      <div style={{ gridArea: "details" }}>
        <h3>Details</h3>
        <h5 className="text-left my-1 mx-0">Stats:</h5>
        <ul className="mt-2 mb-4 ps-0 list-none">
          {pokemonData &&
            pokemonData.stats &&
            pokemonData.stats.map((stat) => {
              return (
                <li
                  key={stat.stat.name}
                  className="text-left"
                >{`${stat.stat.name}: ${stat.base_stat}`}</li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
