function createTemplateSmall(pokemon,poketype) {
    return    `<button id="${pokemon[0] + '_section'}" class="pokemon-small">
                <section class="pokemon-small-section">
                    <h2>${pokemon[0]}</h2>
                    <img class="pokemon-img-small" src="${pokemon[1]}" alt="${pokemon[0]}">
                    <aside class="type-section" id="${pokemon[0]}"></aside>
                </section>
            </button>`
}

function returnSpan(text) {
    return `<span>${text}</span>`
}