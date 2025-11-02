function createTemplateSmall(index,name,image) {
    let pokename = name.charAt(0).toUpperCase() + name.slice(1)
    return `<button id="${name + '_section'}" class="pokemon-small card" onclick="showBigPokemon(${index})" title="${name}">
                <section class="pokemon-small-section">
                    <h2>${pokename}</h2>
                    <img class="pokemon-img-small" src="${image}" alt="${name}">
                    <aside class="type-section" id="${name}"></aside>
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

function returnEvoFirst(name, image) {
    return `<img class="evo-img" src="${image}" alt="${name}">`
}

function returnEvoOther(name, image) {
    return `<span class="evo-arrow">➤</span>
            <img class="evo-img" src="${image}" alt="${name}">`
}

function returnEvoSection() {
    return '<section class="evo-section" id="evo_section"></section>'
}


async function returnStatsSection(poke_data) {
    return `<section class="stats-section">
                <section class="label-section"> <label for="hp">Health</label>
                    <progress id="hp" value="${poke_data.stats[0].base_stat}" max="100"></progress>
                </section>
                <section class="label-section"> <label for="attack">Attack</label>
                    <progress id="hp" value="${poke_data.stats[1].base_stat}" max="100"></progress>
                </section>
                <section class="label-section"> <label for="defense">Defense</label>
                    <progress id="hp" value="${poke_data.stats[2].base_stat}" max="100"></progress>
                </section>
                <section class="label-section"> <label for="special-attack">Special attack</label>
                    <progress id="special-attack" value="${poke_data.stats[3].base_stat}" max="130"></progress>
                </section>
                <section class="label-section"> <label for="special-defense">Special defense</label>
                    <progress id="special-defense" value="${poke_data.stats[4].base_stat}" max="130"></progress>
                </section>
                <section class="label-section"> <label for="speed">Speed</label>
                    <progress id="speed" value="${poke_data.stats[5].base_stat}" max="100"></progress>
                </section>
            </section>`
}

function returnNoResultFound() {
    return `<section class="noResult"><h3>We couldn't find what you we're looking for :|</h3></section>`
}

function returnMoveSection() {
    return `<section id="move_section" class="move-section"></section>`
}

function returnMoveTemplate(name, desc) {
    return `<section><h3>${name}</h3><p>${desc}</p></section>`
}

function returnDialogCaption(caption, index) {
    return `<h2 id="dialog_caption" class="dialog-h2">${caption}</h2><section class="dialog-button-section"><button onclick="dialogClickLeft(${index})">◀</button><button onclick="dialogClickRight(${index})">▶</button></section>`
}