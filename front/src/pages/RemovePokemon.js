import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { removePokemon } from '../services/Api';
import { UserContext } from '../context/UserContext';

function RemovePokemon() {
    const [pokemon, setPokemon] = useState(null);
    const { username } = useContext(UserContext);

    const handleSearch = async (pokemonName) => {
        try {
            // const data = await removePokemon(pokemonName, username); //API
            setPokemon(data);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            setPokemon(null);
        }
    };

    const handleRemovePokemon = () => {
        if (pokemon) {
            console.log(`Removing Pokémon: ${pokemon.name}`);
        } else {
            console.error('No Pokémon to remove!');
        }
    };

    return (
        <div>
            <Header />
            <h1 className="center-login-header">Remove Pokemon</h1>
            <SearchBar onSearch={handleSearch} />
            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <button onClick={handleRemovePokemon}>Remove Pokémon</button>
                </div>
            )}
        </div>
    );
}

export default RemovePokemon;
