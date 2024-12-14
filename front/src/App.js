import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import AddPokemon from './pages/AddPokemon';
import RemovePokemon from './pages/RemovePokemon';
import GetPokemons from './pages/GetPokemons';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-pokemon" element={<AddPokemon />} />
          <Route path="/remove-pokemon" element={<RemovePokemon />} />
          <Route path="/get-pokemons" element={<GetPokemons />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
