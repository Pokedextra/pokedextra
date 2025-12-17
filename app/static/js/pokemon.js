const BASE_URL = "https://pokeapi.co/api/v2/";
const MAX_POKEMON = 151;
const pokedexGrid = document.querySelector(".pokedex-grid");

let allPokemon = [];

fetch(`${BASE_URL}/pokemon?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) => {
    allPokemon = data.results;
})

async function fetchPokemonDataBeforeRedirect(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`${BASE_URL}/pokemon/${id}`)
                .then((res) => res.json()),
            fetch(`${BASE_URL}/pokemon-species/${id}`)
                .then((res) => res.json()),
        ]);
        return true
    } catch (error) {
        console.error("Failed to fetch Pokémon data before redirect");
    }
}