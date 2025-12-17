const BASE_URL = "https://pokeapi.co/api/v2/";
const MAX_POKEMON = 151;
const pokedexGrid = document.querySelector(".pokedex-grid");

let allPokemon = [];

fetch(`${BASE_URL}/pokemon?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) => {
    allPokemon = data.results;
    console.log(data);
})