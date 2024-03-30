"use client";

import Footer from "@/app/Footer";
import Header from "@/app/Header";
import { PokemonsList } from "@/app/PokemonsList";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Header>Pokémons</Header>
      <PokemonsList />
      <Footer />
    </div>
  );
}
