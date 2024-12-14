import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { addPokemon } from '../services/Api'; // Ensure this function is properly defined and imported
import { UserContext } from '../context/UserContext';

function AddPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const { username } = useContext(UserContext);

    const handleSearch = async (pokemonName) => {
        try {

            // const data = await addPokemon(pokemonName); // call api
            setPokemon(data);  // SALVO POKEMON EM UM estado
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            setPokemon(null);
        }
    };

    const handleAddPokemon = () => {
        if (pokemon) {
            console.log(`Adding Pokémon: ${pokemon.name}`);
        } else {
            console.error('No Pokémon to add!');
        }
    };

    return (
        <div>
            <Header />
            <h1 className="center-login-header">Add Pokémon</h1>
            <SearchBar onSearch={handleSearch} />
            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <button onClick={handleAddPokemon}>Add Pokémon</button>
                </div>
            )}
        </div>
    );
}

export default AddPokemon;
