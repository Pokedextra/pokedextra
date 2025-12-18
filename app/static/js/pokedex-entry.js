// Define constants (global vars)
const BASE_URL = "https://pokeapi.co/api/v2/";
const pokedexEntry = document.querySelector(".pokedex-entry-main");

// Fetches pokemon data based on url
async function fetchPokemonData() {
    // Fetch pokemon-species data using pokemon name
    const pokemonName = window.location.pathname.split("/")[2];
    const pokemonSpeciesResponse = await fetch(`${BASE_URL}/pokemon-species/${pokemonName}`);
    const pokemonSpeciesData = await pokemonSpeciesResponse.json();

    // Extract national pokedex id from pokemon-species data
    const pokemonID = pokemonSpeciesData.id;

    // Fetch pokemon data using national dex id
    const pokemonResponse = await fetch(`${BASE_URL}/pokemon/${pokemonID}`);
    const pokemonData = await pokemonResponse.json();

    // Return fetched pokemon data
    return[pokemonSpeciesData, pokemonData];
}

// Displays pokemon data in html
function displayPokemonData(pokemonSpecies, pokemon) {
    pokedexEntry.innerHTML = "";

    // Parse pokemon species endpoint data

    // TESTING
    console.log(pokemonSpecies);

    // Parse pokemon endpoint data

    // TESTING
    console.log(pokemon);

    // Set html elements
    pokedexEntry.innerHTML = `
    
    `;
}


// Run on page load
document.addEventListener("DOMContentLoaded", async () => {
    // Fetch pokemon data
    try {
        const[pokemonSpeciesData, pokemonData] = await fetchPokemonData();
            // Display pokemon data
            displayPokemonData(pokemonSpeciesData, pokemonData);
    } catch (error) {
        console.log("Failed to fetch pokemon data: ", error)
    }
});