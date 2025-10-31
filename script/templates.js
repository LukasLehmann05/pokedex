function createTemplateSmall(pokemon, poketype) {
    return `<button id="${pokemon[0] + '_section'}" class="pokemon-small" onclick="showBigPokemon(${pokemon[2]})" title="${pokemon[0]}">
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

function returnNav(poke_dataJSON) {
    return `<button class="current" id="about_button" onclick="setAboutSection(${poke_dataJSON.id})">About</button>
            <button id="stats_button" onclick="setStatsSection(${poke_dataJSON.id})">Stats</button>
            <button id="evo_button" onclick="setEvolutionSection(${poke_dataJSON.id})">Evolution</button>
            <button id="moves_button" onclick="setMovesSection(${poke_dataJSON.id})">Moves</button>`
}

function returnEvoFirst(name,image) {
    return `<img class="evo-img" src="${image}" alt="${name}">`
}

function returnEvoOther(name,image) {
    return `<span class="evo-arrow">➤</span>
            <img class="evo-img" src="${image}" alt="${name}">`
}

function returnEvoSection() {
    return '<section class="evo-section" id="evo_section"></section>'
}


async function returnStatsSection(poke_id) {
    let poke_data = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`)
    let poke_dataJSON = await poke_data.json()
    return `<section class="stats-section">
                <section class="label-section"> <label for="hp">Health</label>
                    <progress id="hp" value="${poke_dataJSON.stats[0].base_stat}" max="100"></progress>
                </section>
                <section class="label-section"> <label for="attack">Attack</label>
                    <progress id="hp" value="${poke_dataJSON.stats[1].base_stat}" max="100"></progress>
                </section>
                <section class="label-section"> <label for="defense">Defense</label>
                    <progress id="hp" value="${poke_dataJSON.stats[2].base_stat}" max="100"></progress>
                </section>
                <section class="label-section"> <label for="special-attack">Special attack</label>
                    <progress id="special-attack" value="${poke_dataJSON.stats[3].base_stat}" max="130"></progress>
                </section>
                <section class="label-section"> <label for="special-defense">Special defense</label>
                    <progress id="special-defense" value="${poke_dataJSON.stats[4].base_stat}" max="130"></progress>
                </section>
                <section class="label-section"> <label for="speed">Speed</label>
                    <progress id="speed" value="${poke_dataJSON.stats[5].base_stat}" max="100"></progress>
                </section>
            </section>`
}

function returnNoResultFount() {
    return `<section class="noResult"><h3>We couldn't find what you we're looking for :|</h3></section>`
}