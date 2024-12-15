from fastapi import FastAPI, HTTPException
import requests
import sqlite3 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

### SETUP

app = FastAPI()

""" app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update to allow requests from your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) """

# Connect to SQLite database (it will create db.sqlite if it doesn't exist)
conn = sqlite3.connect('db.sqlite')

cursor = conn.cursor()

# Create tables (but not overwrite)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS pokemons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
''')

conn.commit()

### HELPER

def get_pokemon_data(pokemonName: str) -> dict[str, str]:
    # Build the external API url
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemonName}"

    try:
        response = requests.get(url, timeout=5)

        # Extract relevant data
        pokemon_data = response.json()
        name = pokemon_data["name"]
        image = pokemon_data["sprites"]["front_default"]
        types = [type["type"]["name"] for type in pokemon_data["types"]]
        abilities = [ability["ability"]["name"] for ability in pokemon_data["abilities"]]

        content =  {
            "name": name,
            "image": image,
            "type": ", ".join(types),  
            "abilities": abilities,
        }

        return content
    
    except requests.exceptions.RequestException as error:
        raise HTTPException(status_code=500, detail=f"Error fetching Pokémon data: {error}")
    except:
        raise HTTPException(status_code=404, detail="Pokémon not found")

### START OF THE API

@app.get("/api/pokemon/{pokemonName}")
async def get_pokemon(pokemonName: str) -> dict[str, str]:
    content = get_pokemon_data(pokemonName)
    return JSONResponse(content=content)


@app.post("/api/login")
async def login(user: dict) -> bool:

    username = user.get("username", "")
    password = user.get("password", "")

    cursor.execute('''
        SELECT id
        FROM users
        WHERE username = ? AND password = ?
    ''', (username, password))

    user_id = cursor.fetchone()

    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return True


@app.post("/api/createUser")
async def create_user(user: dict) -> bool:

    username = user.get("username", "")
    password = user.get("password", "")

    if username == "" or password == "":
        raise HTTPException(status_code=400, detail="Empty fields")
    
    # Check if user exists
    cursor.execute('''
        SELECT id
        FROM users
        WHERE username = ?
    ''', (username,))

    user_id = cursor.fetchone()

    if user_id is not None:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # All OK
    cursor.execute('''
        INSERT INTO users (username, password)
        VALUES (?, ?)
    ''', (username, password))

    conn.commit()

    return True


@app.post("/api/addPokemon/{pokemonName}")
async def add_pokemon(pokemonName: str, user: dict) -> bool:

    username = user.get("username", "")

    cursor.execute('''
        SELECT id
        FROM users
        WHERE username = ?
    ''', (username,))

    # Check user
    user_id = cursor.fetchone()

    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid username")
    
    # Check if pokemon exists on pokeapi

    try:
        get_pokemon_data(pokemonName)
    except HTTPException as error:
        raise error

    # Check if pokemon already exists for this user
    cursor.execute('''
        SELECT id
        FROM pokemons
        WHERE user_id = ? AND name = ?
    ''', (user_id[0], pokemonName))

    pokemon_id = cursor.fetchone()

    if pokemon_id is not None:
        raise HTTPException(status_code=400, detail="Pokemon already added")
    
    # All OK
    cursor.execute('''
        INSERT INTO pokemons (user_id, name)
        VALUES (?, ?)
    ''', (user_id[0], pokemonName))

    conn.commit()

    return True


@app.delete("/api/removePokemon/{pokemonName}")
async def remove_pokemon(pokemonName: str, user: dict) -> bool:

    username = user.get("username", "")

    cursor.execute('''
        SELECT id
        FROM users
        WHERE username = ?
    ''', (username,))

    # Check user
    user_id = cursor.fetchone()

    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid username")
    
    # Check if pokemon exists for this user
    cursor.execute('''
        SELECT id
        FROM pokemons
        WHERE user_id = ? AND name = ?
    ''', (user_id[0], pokemonName))

    pokemon_id = cursor.fetchone()

    if pokemon_id is None:
        raise HTTPException(status_code=400, detail="Pokemon not found")
    
    # All OK
    cursor.execute('''
        DELETE FROM pokemons
        WHERE user_id = ? AND name = ?
    ''', (user_id[0], pokemonName))

    conn.commit()

    return True


@app.get("/api/getPokemons/{username}")
async def get_pokemons(username: str) -> list[dict[str, str]]:

    cursor.execute('''
        SELECT id
        FROM users
        WHERE username = ?
    ''', (username,))

    # Check user
    user_id = cursor.fetchone()

    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid username")
    
    # Get pokemons
    cursor.execute('''
        SELECT name
        FROM pokemons
        WHERE user_id = ?
    ''', (user_id[0],))

    pokemons = cursor.fetchall()

    try:
        content = []
        for pokemon in pokemons:
            print(pokemon[0])
            p = get_pokemon_data(pokemon[0])
            print(p)
            content.append(p)

        print(content)
        return JSONResponse(content=content)
    except HTTPException as error:
        raise error