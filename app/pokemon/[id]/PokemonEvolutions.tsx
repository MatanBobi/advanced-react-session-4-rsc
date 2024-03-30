export function PokemonEvolutions({
  pokemonChain,
}: {
  pokemonChain: { name: string }[];
}) {
  return (
    <div style={{ gridArea: "evolutions" }}>
      <h3>Evolutions</h3>
      <ul className="mt-2 mb-4 ps-0 list-none">
        {pokemonChain &&
          pokemonChain.map((pokemon) => (
            <li key={pokemon.name}>
              <img
                className="h-36 my-0 mx-auto"
                src={`https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`}
                alt={pokemon.name}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
