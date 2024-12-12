from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()



#### ARRUMAR: TESTAR QUANDO O POKEMON NÃO EXISTE NA API

### TAMBÉM SETAR TIMEOUT NA REQUISIÇÃO DA API



@app.get("/api/pokemon/{pokemonName}")
async def get_pokemon(pokemonName: str):

    try:
        # Build the external API url
        url = f"https://pokeapi.co/api/v2/pokemon/{pokemonName}"
        response = requests.get(url)
        response.raise_for_status() ## melhorar essa parte

        # Extract relevant data
        pokemon_data = response.json()
        name = pokemon_data["name"]
        image = pokemon_data["sprites"]["front_default"]
        types = [type["type"]["name"] for type in pokemon_data["types"]]
        abilities = [ability["ability"]["name"] for ability in pokemon_data["abilities"]]

        # Build the response
        return {
            "name": name,
            "image": image,
            "type": ", ".join(types),  
            "abilities": abilities,
        }

    except requests.exceptions.RequestException as error:
        raise HTTPException(status_code=500, detail=f"Error fetching Pokémon data: {error}")
    except HTTPException as error:
        raise  # Re-raise existing HTTPException if any