function createTemplateSmall(pokemon, poketype) {
    return `<button id="${pokemon[0] + '_section'}" class="pokemon-small" onclick="showBigPokemon(${pokemon[2]})">
                <section class="pokemon-small-section">
                    <h2>${pokemon[0]}</h2>
                    <img class="pokemon-img-small" src="${pokemon[1]}" alt="${pokemon[0]}">
                    <aside class="type-section" id="${pokemon[0]}"></aside>
                </section>
            </button>`
}

function returnSpan(text) {
    return `<span class="pokemon-type">${text}</span>`
}

function returnAboutSection() {
    return `<section>
                <table>
                    <tr>
                        <td class="td-left">Species</td>
                        <td id="species"></td>
                    </tr>
                    <tr>
                        <td class="td-left">Height</td>
                        <td id="height"></td>
                    </tr>
                    <tr>
                        <td class="td-left">Weight</td>
                        <td id="weight"></td>
                    </tr>
                    <tr>
                        <td class="td-left">Abilities</td>
                        <td id="abilities"></td>
                    </tr>
                </table>
            </section>`
}