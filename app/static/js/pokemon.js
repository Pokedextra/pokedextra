import { pokemonState, searchInput } from "./filters.js";

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
    // Check if local storage exists
    const allPokemonFromLocalStorage = localStorage.getItem("allPokemonLocalStore");

    // If local storage exists, load it into allPokemon array
    if (allPokemonFromLocalStorage) {
        allPokemon = JSON.parse(allPokemonFromLocalStorage);
        // Test message
        console.log("allPokemon data loaded from local storage");
    } else {
        // Fetch pokemon data from PokeAPI
        const response = await fetch(`${BASE_URL}/pokemon-species?limit=${MAX_POKEMON}`);
        const data = await response.json();
        allPokemon = data.results;
        // Create local storage
        localStorage.setItem("allPokemonLocalStore", JSON.stringify(allPokemon));
        // Test message
        console.log("allPokemon data fetched from pokeapi");
    }

    return allPokemon;
}

// Fetches pokemon by generation and stores data as nested arrays in generationPokemon array
export async function fetchPokemonByGeneration() {
    // Check if local storage exists
    const generationPokemonFromLocalStorage = localStorage.getItem("generationPokemonLocalStore");

    // If local storage exists, load it into generationPokemon array
    if (generationPokemonFromLocalStorage) {
        generationPokemon = JSON.parse(generationPokemonFromLocalStorage);
        // Test message
        console.log("generationPokemon data loaded from local storage");
    } else {
        // Fetch pokemon data from PokeAPI for each generation
        for (let generation = 1; generation <= NUM_GENERATIONS; generation++) {
            const response = await fetch(`${BASE_URL}/generation/${generation}`);
            const data = await response.json();
            const species = data.pokemon_species.map(pokemon => {
                const id = parseInt(pokemon.url.split("/")[6]);
                return {name: pokemon.name, id};
            });

            // Sort fetched data by id ascending (fetched data default is alphabetical)
            species.sort((a, b) => a.id - b.id);
            generationPokemon.push(species);
        }
        // Create local storage
        localStorage.setItem("generationPokemonLocalStore", JSON.stringify(generationPokemon));
        // Test message
        console.log("generationPokemon data fetched from pokeapi");
    }
}

// Displays pokemon data in html for a given pokemon array
export function displayPokemon(pokemon) {
    pokedexGrid.innerHTML = "";

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.id ?? pokemon.url.split("/")[6];
        let displayPokemonID;
        if (pokemonID < 1000) {
            displayPokemonID = String(pokemonID).padStart(3, '0');
        }
        else {
            displayPokemonID = pokemonID;
        }
        const pokemonArticle = document.createElement("article");
        pokemonArticle.className = "pokemon-group";
        pokemonArticle.innerHTML = `
          <a href="/pokemon/${pokemon.name}" class="pokemon-link">
            <div class="pokemon-item">
              <div class="pokemon-id">
                <p>#${displayPokemonID}</p>
              </div>
              <div class="pokemon-image">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" alt="${capitalise(pokemon.name)}" loading="lazy"/>
              </div>
              <h2>${capitalise(pokemon.name)}</h2>
            </div>
          </a>
        `;

        pokedexGrid.appendChild(pokemonArticle);
    });
}

// Function to capitalise first letter of each word
function capitalise(str) {
    return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// Function to handle search functionality
export function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let searchResults;

    if (searchTerm !==""){
        if (!isNaN(searchTerm)) {
            // Search by pokemon id
            searchResults = pokemonState.currentSelection.filter((pokemon) => {
                const pokemonID = (pokemon.url && pokemon.url.split("/")[6]) || String(pokemon.id);
                return pokemonID.startsWith(searchTerm);
            });
        } else {
            // Search by pokemon name
            searchResults = pokemonState.currentSelection.filter((pokemon) => {
               return pokemon.name.toLowerCase().startsWith(searchTerm);
            });
        }
    } else {
        // Reset pokemon
        searchResults = pokemonState.currentSelection;
    }
    
    displayPokemon(searchResults);
}
searchInput.addEventListener("keyup", handleSearch);