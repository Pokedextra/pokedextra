// Import data and functions from pokemon.js
import {allPokemon, generationPokemon, fetchAllPokemon, fetchPokemonByGeneration, displayPokemon} from "./pokemon.js";

// Select div element
const pokedexFiltersGeneration = document.querySelector(".pokedex-filters-generation")

// Set button elements
pokedexFiltersGeneration.innerHTML = `
    <div class="generation-all">
      <button id="all-generations">All Generations</button>
    </div>
    <div class="generation-numbered">
      <button id="gen-1">Gen 1</button>
      <button id="gen-2">Gen 2</button>
      <button id="gen-3">Gen 3</button>
      <button id="gen-4">Gen 4</button>
      <button id="gen-5">Gen 5</button>
      <button id="gen-6">Gen 6</button>
      <button id="gen-7">Gen 7</button>
      <button id="gen-8">Gen 8</button>
      <button id="gen-9">Gen 9</button>
    </div>
`

// Run on page load
document.addEventListener("DOMContentLoaded", async () => {
    // Fetch pokemon data
    try {
        await fetchAllPokemon();
    } catch (error) {
        console.log("Failed to fetch all pokemon: ", error)
    }
    try {
        await fetchPokemonByGeneration();
    } catch (error) {
        console.log("Failed to fetch pokemon by generation: ", error)
    }

    // Select buttons
    const allGenerationsButton = document.querySelector(".generation-all button");
    const generationButtons = document.querySelectorAll(".generation-numbered button");

    // Default: All Generations active
    allGenerationsButton.classList.add('active');
        // Display all pokemon
        displayPokemon(allPokemon);

    // Click: All Generations
    allGenerationsButton.addEventListener('click', () =>{
        // Clear active from other buttons
        generationButtons.forEach(button => button.classList.remove('active'));
        // Make button active
        allGenerationsButton.classList.add('active');
        // Display all pokemon
        displayPokemon(allPokemon);
    });

    // Click: Numbered generations
    generationButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            // Clear active from other buttons
            generationButtons.forEach(btn => btn.classList.remove('active'));
            allGenerationsButton.classList.remove('active');
            // Make button active
            this.classList.add('active');
            // Display pokemon from selected generation
            displayPokemon(generationPokemon[index])
        });
    });
});