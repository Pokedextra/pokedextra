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

    // Access pokemon species endpoint data
    const pokemonName = capitalise(pokemonSpecies.name)

    let displayPokemonID;
        if (pokemonSpecies.id < 1000) {
            displayPokemonID = String(pokemonSpecies.id).padStart(3, '0');
        }
        else {
            displayPokemonID = pokemonSpecies.id;
        }

    const pokemonGenus = pokemonSpecies.genera.find(element => element.language.name === 'en')?.genus;

    // TESTING
    console.log(pokemonSpecies);

    // Access pokemon endpoint data
    const pokemonType = pokemon.types.map(type => capitalise(type.type.name)).join(', ');
    const pokemonHeight = (pokemon.height/10).toFixed(1);
    const pokemonWeight = (pokemon.weight/10).toFixed(1);
    const pokemonAbilities = pokemon.abilities.map(ability => capitalise(ability.ability.name)).join(', ');
    const [hp, attack, defense, specialAttack, specialDefense, speed] = pokemon.stats.map(stat => stat.base_stat);
    const total = hp + attack + defense + specialAttack + specialDefense + speed;

    // TESTING
    console.log(pokemon);

    // Set html elements
    pokedexEntry.innerHTML = `
      <div class="pokedex-summary">
        <h2>${pokemonName} #${displayPokemonID}</h2>
        <p>Type ${pokemonType}</p>
        <p>Species ${pokemonGenus}</p>
        <p>Height ${pokemonHeight}m</p>
        <p>Weight ${pokemonWeight}kg</p>
        <p>Abilities ${pokemonAbilities}</p>
      </div>
      <div class="pokedex-stats">
        <p>HP ${hp}</p>
        <p>Attack ${attack}</p>
        <p>Defense ${defense}</p>
        <p>Sp. Atk ${specialAttack}</p>
        <p>Sp. Def ${specialDefense}</p>
        <p>Speed ${speed}</p>
        <p>Total ${total}</p>
      </div>
    `;
}

// Function to capitalise first letter of each word
function capitalise(str) {
    return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
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