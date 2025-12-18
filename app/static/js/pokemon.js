// Define constants (global vars)
const BASE_URL = "https://pokeapi.co/api/v2/";
const MAX_POKEMON = 1025;
const NUM_GENERATIONS = 9;
const pokedexGrid = document.querySelector(".pokedex-grid");

// Export arrays to be used in filters.js
export let allPokemon = [];
export let generationPokemon = [];

// Fetches all 1,025 pokemon and stores data in allPokemon array
export async function fetchAllPokemon() {
    const response = await fetch(`${BASE_URL}/pokemon-species?limit=${MAX_POKEMON}`);
    const data = await response.json();
    allPokemon = data.results;
    return allPokemon;
}

// Fetches pokemon by generation and stores data as nested arrays in generationPokemon array
export async function fetchPokemonByGeneration() {
    for (let generation = 1; generation <= NUM_GENERATIONS; generation++) {
        const response = await fetch(`${BASE_URL}/generation/${generation}`);
        const data = await response.json();
        const species = data.pokemon_species.map(pokemon => {
            const id = parseInt(pokemon.url.split("/")[6]);
            return {name: pokemon.name, id};
        });

        species.sort((a, b) => a.id - b.id);
        generationPokemon.push(species);
    }
}

// Displays pokemon data in html for a given pokemon array
export function displayPokemon(pokemon) {
    pokedexGrid.innerHTML = "";

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.id ?? pokemon.url.split("/")[6];
        const pokemonArticle = document.createElement("article");
        pokemonArticle.className = "pokemon-group";
        pokemonArticle.innerHTML = `
            <div class="pokemon-item">
              <div class="pokemon-id">
                <p>#${pokemonID}</p>
              </div>
              <div class="pokemon-image">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" alt="${pokemon.name}" loading="lazy"/>
              </div>
              <h2>${pokemon.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</h2>
            </div>
        `;

        pokedexGrid.appendChild(pokemonArticle);
    });
}