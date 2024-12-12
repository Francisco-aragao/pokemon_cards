from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()



#### ARRUMAR: TESTAR QUANDO O POKEMON NÃO EXISTE NA API

### TAMBÉM SETAR TIMEOUT NA REQUISIÇÃO DA API



@app.get("/api/pokemon/{pokemonName}")
async def get_pokemon(pokemonName: str):
    """
    Fetches information about a Pokémon from the PokéAPI.

    Args:
        pokemonName: The name of the Pokémon to retrieve.

    Returns:
        A dictionary containing the Pokemon's name, image, type, and abilities.

    Raises:
        HTTPException: If the Pokémon is not found or there's an error fetching data.
    """

    try:
        # Build the external API url
        url = f"https://pokeapi.co/api/v2/pokemon/{pokemonName}"
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception on unsuccessful request

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
            "type": ", ".join(types),  # Combine types into a comma-separated string
            "abilities": abilities,
        }

    except requests.exceptions.RequestException as error:
        raise HTTPException(status_code=500, detail=f"Error fetching Pokémon data: {error}")
    except HTTPException as error:
        raise  # Re-raise existing HTTPException if any