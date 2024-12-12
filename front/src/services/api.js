export const fetchPokemon = async (pokemonName) => {
  try {
    const response = await fetch(`http://localhost:8000/api/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};