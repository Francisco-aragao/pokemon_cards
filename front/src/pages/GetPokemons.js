import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import { getPokemons } from '../services/Api'; // Import the API function
import { UserContext } from '../context/UserContext'; // Import context

function GetPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useContext(UserContext);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        //const data = await getPokemons(username); // API
        setPokemons(data);
      } catch (err) {
        setError('Failed to fetch Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [username]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <h1 className="center-login-header">All Pokémon</h1>
      <div>
      {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} /> 
        ))}  
      </div>
    </div>
  );
}

export default GetPokemons;
