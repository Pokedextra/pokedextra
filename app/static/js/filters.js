const pokedexFilters = document.querySelector(".pokedex-filters");
const pokedexFiltersGeneration = document.querySelector(".pokedex-filters-generation")

pokedexFiltersGeneration.innerHTML = `
    <button id="all-generations">All Generations</button>
    <button id="gen-1">Gen 1</button>
    <button id="gen-2">Gen 2</button>
    <button id="gen-3">Gen 3</button>
    <button id="gen-4">Gen 4</button>
    <button id="gen-5">Gen 5</button>
    <button id="gen-6">Gen 6</button>
    <button id="gen-7">Gen 7</button>
    <button id="gen-8">Gen 8</button>
    <button id="gen-9">Gen 9</button>
`

document.addEventListener("DOMContentLoaded", async () => {
    const generationButtons = document.querySelectorAll(".pokedex-filters-generation button");

    generationButtons[0].classList.add('active');

    generationButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            generationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});