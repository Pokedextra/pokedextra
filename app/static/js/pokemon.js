const BASE_URL = "https://pokeapi.co/api/v2/";
const MAX_POKEMON = 1025;
const pokedexGrid = document.querySelector(".pokedex-grid");

let allPokemon = [];

fetch(`${BASE_URL}/pokemon-species?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) => {
    allPokemon = data.results;
    displayPokemon(allPokemon)
})

function displayPokemon(pokemon) {
    pokedexGrid.innerHTML = "";

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
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

        pokemonArticle.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success) {
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        });

        pokedexGrid.appendChild(pokemonArticle);
    });
}