function createTemplateSmall(pokename,pokeimg) {
    return    `<button class="pokemon-small">
                <section class="pokemon-small-section">
                    <h2>${pokename}</h2>
                    <img src="${pokeimg}" alt="${pokename}">
                </section>
            </button>`
}