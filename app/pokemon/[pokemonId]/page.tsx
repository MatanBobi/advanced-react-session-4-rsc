// A pokemon page that will fetch data for the specific pokemon and display it
import { caughtPokemons } from "@/app/pokemon/page";
import { revalidatePath } from "next/cache";

export default async function Pokemon({
  params: { pokemonId },
}: {
  params: { pokemonId: string };
}) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  ).then((res) => res.json());

  async function markCaught(e: any) {
    "use server";

    caughtPokemons.push(data.name);
    revalidatePath("/pokemon/");
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="container flex flex-row flex-wrap">
        <div className="flex flex-col items-center justify-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            width={300}
            height={300}
            alt={data.name}
          />
          <p className="text-2xl">{data.name}</p>
          {/* A form with input of type checkbox to mark the pokemon as caught */}
          {caughtPokemons.includes(data.name) ? (
            <p>Caught</p>
          ) : (
            <form
              action={markCaught}
              className="flex flex-col items-center justify-center"
            >
              <button type="submit" id="caught" name="caught" />
              <label
                className="border border-white rounded-md p-2 cursor-pointer"
                htmlFor="caught"
              >
                Catch
              </label>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
