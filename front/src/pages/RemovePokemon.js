import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { removePokemon } from '../services/Api';
import { UserContext } from '../context/UserContext';

function RemovePokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // New state to control the success message
    const { username } = useContext(UserContext);

    const handleSearch = async (pokemonName) => {
        try {
            const sucess = await removePokemon(pokemonName, username); //API

            if (!sucess) {
                throw new Error('Failed to remove Pokémon.');
            }
            setPokemon({ name: pokemonName });
            setSuccessMessage(`Success! Pokémon "${pokemonName}" has been removed.`);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            setPokemon(null);
            setSuccessMessage('Failed to remove Pokémon. Please try again.');
        }
    };


    return (
        <div>
            <Header />
            <h1 className="center-login-header">Remove Pokemon</h1>
            <SearchBar onSearch={handleSearch} />
            {pokemon && (
                <div>
                    <p style={{ textAlign: 'center' }}>
                        {successMessage}</p> {/* Show the success message here */}
                </div>            
            )}
        </div>
    );
}

export default RemovePokemon;
