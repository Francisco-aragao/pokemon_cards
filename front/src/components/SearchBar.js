import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim().toLowerCase());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search for a Pokémon..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
