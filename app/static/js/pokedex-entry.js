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
    // Pokedex summary
    const pokemonName = capitalise(pokemonSpecies.name)
    let displayPokemonID;
        if (pokemonSpecies.id < 1000) {
            displayPokemonID = String(pokemonSpecies.id).padStart(3, '0');
        }
        else {
            displayPokemonID = pokemonSpecies.id;
        }
    const pokemonGenus = pokemonSpecies.genera.find(element => element.language.name === 'en')?.genus;
    // Pokedex training
    const pokemonCatchRate = pokemonSpecies.capture_rate;
    let pokemonBaseFriendship = pokemonSpecies.base_happiness;
        if (pokemonBaseFriendship === 0) {
            pokemonBaseFriendship = "-";
        }
    const pokemonGrowthRate = capitalise(pokemonSpecies.growth_rate.name);
    // Pokedex breeding
    let pokemonGender = pokemonSpecies.gender_rate;
        if (pokemonGender === -1) {
            pokemonGender = "Genderless";
        }
        else {
            const femaleRatio = (pokemonGender/8) * 100;
            const maleRatio = 100 - femaleRatio;
            pokemonGender = `♂${maleRatio}% ♀${femaleRatio}%`;
        }
    const pokemonHatchTime = pokemonSpecies.hatch_counter + " cycles";
    const pokemonEggGroups = pokemonSpecies.egg_groups.map(egg_groups => capitalise(egg_groups.name)).join(', ');

    // TESTING
    console.log(pokemonSpecies);

    // Access pokemon endpoint data
    // Pokedex summary
    const pokemonType = pokemon.types.map(type => capitalise(type.type.name)).join(', ');
    const pokemonHeight = (pokemon.height/10).toFixed(1);
    const pokemonWeight = (pokemon.weight/10).toFixed(1);
    const pokemonAbilities = pokemon.abilities.map(ability => capitalise(ability.ability.name)).join(', ');
    // Pokedex training
        const statNameMapping = {
        hp: 'HP',
        attack: 'Atk',
        defense: 'Def',
        'special-attack': 'SpA',
        'special-defense': 'SpD',
        speed: 'Spe'
    };
    let pokemonEvYield = pokemon.stats.filter(stat => stat.effort !== 0).map(stat => {
        const statName = statNameMapping[stat.stat.name] || stat.stat.name;
        return `${stat.effort} ${statName}`;
    }).join(', ');
    // Pokedex stats
    const [hp, attack, defense, specialAttack, specialDefense, speed] = pokemon.stats.map(stat => stat.base_stat);

    // TESTING
    console.log(pokemon);

    // Set html elements
    pokedexEntry.innerHTML = `
      <div class="pokedex-summary">
        <div class="pokedex-summary-grid">
          <div class="summary-grid-pokemon">
            <h1>${pokemonName} #${displayPokemonID}</h1>
            <div class="pokedex-image">
              <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSpecies.id}.png" alt="${pokemonName}" loading="lazy"/>
            </div>
            <p>Type ${pokemonType}</p>
          </div>
          <div class="summary-grid-profile">
            <h2>PROFILE</h2>
            <div class="grid-content">
              <p>Species</p>
              <h3>${pokemonGenus}</h3>
            </div>
            <div class="grid-content">
              <p>Height</p>
              <h3>${pokemonHeight}m</h3>
            </div>
            <div class="grid-content">
              <p>Weight</p>
              <h3>${pokemonWeight}kg</h3>
            </div>
            <div class="grid-content">
              <p>Abilities</p>
              <h3>${pokemonAbilities}</h3>
            </div>
          </div>
          <div class="summary-grid-vertical">
            <div class="summary-grid-training">
              <h2>TRAINING</h2>
              <div class="grid-content">       
                <p>Catch Rate</p>
                <h3>${pokemonCatchRate}</h3>
              </div>
              <div class="grid-content">            
                <p>Base Friendship</p>
                <h3>${pokemonBaseFriendship}</h3>
              </div>
              <div class="grid-content">            
                <p>Growth Rate</p>
                <h3>${pokemonGrowthRate}</h3>
              </div>
              <div class="grid-content">
                <p>EV Yield</p>
                <h3>${pokemonEvYield}</h3>
              </div>
            </div>
            <div class="summary-grid-breeding">
              <h2>BREEDING</h2>
              <div class="grid-content">
                <p>Gender</p>
                <h3>${pokemonGender}</h3>
              </div>
              <div class="grid-content">
                <p>Hatch Time</p>
                <h3>${pokemonHatchTime}</h3>
              </div>
              <div class="grid-content">              
                <p>Egg Groups</p>
                <h3>${pokemonEggGroups}</h3>
              </div>
            </div>
          </div>
          <div class="summary-grid-stats">
            <h2>BASE STATS</h2>
            <div class="summary-grid-vertical">
              <div class="summary-stats-1">
                <div class="grid-content">
                  <p>HP</p>
                  <h3>${hp}</h3>
                </div> 
                <div class="grid-content">
                  <p>Attack</p>
                  <h3>${attack}</h3>
                </div> 
                <div class="grid-content">
                  <p>Defense</p>
                  <h3>${defense}</h3>
                </div> 
              </div>
              <div class="summary-stats-2">              
                <div class="grid-content">
                  <p>Sp. Atk</p>
                  <h3>${specialAttack}</h3>
                </div> 
                <div class="grid-content">
                  <p>Sp. Def</p>
                  <h3>${specialDefense}</h3>
                </div> 
                <div class="grid-content">
                  <p>Speed</p>
                  <h3>${speed}</h3>
                </div>
              </div>
            </div>                                                                                 
          </div>           
        </div>
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