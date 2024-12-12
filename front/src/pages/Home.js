import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemon } from '../services/api'; 

function Home() {
  const [pokemon, setPokemon] = useState(null);

  const handleSearch = async (pokemonName) => {
    try {
      const data = await fetchPokemon(pokemonName);
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setPokemon(null);
    }
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default Home;