const pokedexFiltersGeneration = document.querySelector(".pokedex-filters-generation")

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

document.addEventListener("DOMContentLoaded", () => {
    const allGenerationsButton = document.querySelector(".generation-all button");
    const generationButtons = document.querySelectorAll(".generation-numbered button");

    // Default: All Generations active
    allGenerationsButton.classList.add('active');

    // Click: All Generations
    allGenerationsButton.addEventListener('click', () =>{
        // Clear active from other buttons
        generationButtons.forEach(button => button.classList.remove('active'));
        // Make button active
        allGenerationsButton.classList.add('active');
    });

    // CLick: Numbered generations
    generationButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Clear active from other buttons
            generationButtons.forEach(btn => btn.classList.remove('active'));
            allGenerationsButton.classList.remove('active');
            // Make button active
            this.classList.add('active');
        });
    });
});