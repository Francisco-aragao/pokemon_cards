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

// Function to handle login
export const loginUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response || !response.ok) {
      throw new Error('Invalid username or password');
    }

    const data = await response.json();

    if (data == false) {
      throw new Error('Invalid username or password');
    }

    return;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to handle create user
export const createUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8000/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response || !response.ok) {
      throw new Error('Invalid username or password');
    }

    const data = await response.json();

    if (data == false) {
      throw new Error('Username or password already exists');
    }

    return;
  } catch (error) {
    console.error('Error: create user', error);
    throw error;
  }
};

export const addPokemon = async (pokemonName, username) => {
  try {
    const response = await fetch(`http://localhost:8000/api/addPokemon/${pokemonName}`, {
      melhot: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

export const removePokemon = async (pokemonName, username) => {
  try {
    const response = await fetch(`http://localhost:8000/api/removePokemon/${pokemonName}`, {
      melhot: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

export const getPokemons = async (username) => {
  try {
    const response = await fetch(`http://localhost:8000/api/getPokemons/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user Pokémon:', error);
    throw error;
  }
};