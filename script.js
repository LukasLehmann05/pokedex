const POKE_URL = "https://pokeapi.co/api/v2/"
const RENDER_SECTION = document.getElementById("render_section")
const POKEMON_DIALOG = document.getElementById("pokemon_dialog")
const DIALOG_CAPTION = document.getElementById("dialog_caption")
const DIALOG_IMG = document.getElementById("dialog_img")
const DIALOG_TYPES = document.getElementById("dialog_types")
const SEARCH_BAR = document.getElementById("search_bar")

let start_loading_amount = 20
let current_class = ""
let current_button = ""
let total_loaded = 0
let loading = false
let search = false
let renderedPokemons = []

async function load() {
    loading = true
    let pokedata = await fetch(POKE_URL + `pokemon?limit=${start_loading_amount}&offset=0`)
    let pokejson = await pokedata.json()
    let pokearray = await pokejson.results
    await renderPokeSmall(pokearray)
    total_loaded = start_loading_amount
    loading = false
    loadingFeedback()
}

async function loadOnRequest(amount) {
    if (loading == false) {
        loading = true
        loadingFeedback()
        let pokedata = await fetch(POKE_URL + `pokemon?limit=${amount}&offset=${total_loaded}`)
        let pokejson = await pokedata.json()
        let pokearray = await pokejson.results
        await renderPokeSmall(pokearray)
        total_loaded += amount
        loading = false
        loadingFeedback()
    }

}

async function renderPokeSmall(pokearray) {
    loadingFeedback()
    renderedPokemons = []
    for (let index = 0; index < pokearray.length; index++) {
        const POKEMON = pokearray[index];
        let pokemon_data = await fetch(POKEMON.url)
        let pokemon_datajson = await pokemon_data.json()
        renderedPokemons.push(pokemon_datajson.name)
        let pokemon_data_array = getPokedata(pokemon_datajson)
        let pokemon_types = getPokeTypes(pokemon_datajson.types)
        RENDER_SECTION.innerHTML += createTemplateSmall(pokemon_data_array)
        addPokeType(pokemon_data_array[0], pokemon_types)
    }
}

function getPokedata(pokemon_datajson) {
    return [pokemon_datajson.name, pokemon_datajson.sprites.front_default, pokemon_datajson.id]
}

function getBackgroundColor(poketype) {
    switch (poketype) {
        case "grass":
            return "grass"
        case "fire":
            return "fire"
        case "water":
            return "water"
        case "electric":
            return "electric"
        case "poison":
            return "poison"
        case "dark":
            return "dark"
        default:
            return "default"
    }
}

function loadingFeedback() {
    if (loading == false) {
        document.getElementById('h1_tag').classList.remove('hide')
        document.getElementById('loading_section').classList.add('hide')
    } else {
        document.getElementById('h1_tag').classList.add('hide')
        document.getElementById('loading_section').classList.remove('hide')
    }
}

function getPokeTypes(pokemon_data) {
    let poketypes = []
    for (let index = 0; index < pokemon_data.length; index++) {
        const ELEMENT = pokemon_data[index];
        let poke_type = ELEMENT.type.name
        poketypes.push(poke_type)
    }
    return poketypes
}

function addPokeType(pokename, poketypes) {
    const POKEMON_ELEMENT = document.getElementById(pokename)
    for (let index = 0; index < poketypes.length; index++) {
        const element = poketypes[index];
        let typeSpan = returnSpan(element)
        POKEMON_ELEMENT.innerHTML += typeSpan
        if (index == 0) {
            let bg_color = getBackgroundColor(element)
            document.getElementById(pokename + '_section').classList.add(bg_color)
        }
    }
}

function getAbilities(ability) {
    let poke_abilities = []
    for (let index = 0; index < ability.length; index++) {
        const element = ability[index];
        poke_abilities.push(element.ability.name)
    }
    return poke_abilities
}

async function getDataFromAPI(poke_id) {
    let pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`)
    let pokedataJSON = await pokedata.json()
    let poke_abilities = getAbilities(pokedataJSON.abilities)
    DIALOG_CAPTION.innerText = pokedataJSON.name
    DIALOG_IMG.src = pokedataJSON.sprites.other.dream_world.front_default
    DIALOG_IMG.alt = pokedataJSON.name
    return [pokedataJSON, poke_abilities]
}

function updateAboutSection(poke_dataJSON, abilities) {
    document.getElementById("species").innerText = poke_dataJSON.species.name
    document.getElementById("height").innerText = poke_dataJSON.height
    document.getElementById("weight").innerText = poke_dataJSON.weight + "kg"
    document.getElementById("abilities").innerText = ""
    for (let index = 0; index < abilities.length; index++) {
        const ability = abilities[index];
        document.getElementById("abilities").innerText += ability
    }
}

function setDialogTypes(types) {
    DIALOG_TYPES.innerHTML = ""
    for (let index = 0; index < types.length; index++) {
        const poke_type = types[index];
        DIALOG_TYPES.innerHTML += returnSpan(poke_type)
    }
}

async function showBigPokemon(poke_id) {
    let poke_data = await getDataFromAPI(poke_id)
    document.getElementById("dialog_main").innerHTML = returnAboutSection()
    updateAboutSection(poke_data[0], poke_data[1])
    let bg_color = getBackgroundColor(poke_data[0].types[0].type.name)
    if (current_class !== "") {
        POKEMON_DIALOG.classList.remove(current_class)
    }
    POKEMON_DIALOG.classList.add(bg_color)
    setDialogTypes(getPokeTypes(poke_data[0].types))
    current_class = bg_color
    document.getElementById("dialog_nav").innerHTML = returnNav(poke_data[0])
    if (current_button != "") {
        current_button.classList.remove('current')
    }
    document.getElementById('about_button').classList.add('current')
    current_button = document.getElementById('about_button')
    POKEMON_DIALOG.showModal()
}

async function setAboutSection(poke_id) {
    current_button.classList.remove('current')
    document.getElementById('about_button').classList.add('current')
    current_button = document.getElementById('about_button')
    let poke_data = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`)
    let poke_dataJSON = await poke_data.json()
    let abilities = getAbilities(poke_dataJSON.abilities)
    document.getElementById("dialog_main").innerHTML = returnAboutSection()
    updateAboutSection(poke_dataJSON, abilities)
}

async function setStatsSection(poke_id) {
    document.getElementById("dialog_main").innerHTML = await returnStatsSection(poke_id)
    current_button.classList.remove('current')
    document.getElementById('stats_button').classList.add('current')
    current_button = document.getElementById('stats_button')
}

function setEvolutionSection(poke_id) {
    current_button.classList.remove('current')
    document.getElementById('evo_button').classList.add('current')
    current_button = document.getElementById('evo_button')
    returnEvolution(poke_id)

}

async function renderMoves(allMoves) {
    document.getElementById("dialog_main").innerHTML = returnMoveSection()
    for (let index = 0; index < allMoves.length; index++) {
        const MOVE = allMoves[index];
        let fetch_move = await fetch(MOVE.move.url)
        let fetch_movejson = await fetch_move.json()
        let moveTemplate = returnMoveTemplate(fetch_movejson.names[7].name, fetch_movejson.effect_entries[0].short_effect)
        document.getElementById("move_section").innerHTML += moveTemplate
        if (index > 1) {
            break
        }
    }
}

async function setMovesSection(poke_id) {
    current_button.classList.remove('current')
    document.getElementById('moves_button').classList.add('current')
    current_button = document.getElementById('moves_button')
    let pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`)
    let pokedataJSON = await pokedata.json()
    renderMoves(pokedataJSON.moves)
}

function getEvo(chain) {
    let allEvos = []
    if (chain.species.name) {
        allEvos.push(chain.species.name)
        if (chain.evolves_to[0]) {
            allEvos.push(chain.evolves_to[0].species.name)
            if (chain.evolves_to[0].evolves_to[0]) {
                allEvos.push(chain.evolves_to[0].evolves_to[0].species.name)
            }
        }
    }
    return allEvos
}

async function assignEvos(allEvos) {
    document.getElementById("dialog_main").innerHTML = returnEvoSection()
    let evo_section = document.getElementById('evo_section')
    for (let index = 0; index < allEvos.length; index++) {
        const evo = allEvos[index];
        let pokedata = await fetch('https://pokeapi.co/api/v2/pokemon/' + evo)
        let poke_dataJSON = await pokedata.json()
        let evo_image = poke_dataJSON.sprites.other.dream_world.front_default
        if (index == 0) {
            evo_section.innerHTML += returnEvoFirst(evo, evo_image)
        } else {
            evo_section.innerHTML += returnEvoOther(evo, evo_image)
        }
    }
}

async function returnEvolution(poke_id) {
    let pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`)
    let pokejson = await pokedata.json()
    let pokespecies = await fetch(pokejson.species.url)
    let pokespeciesjson = await pokespecies.json()
    let evo = await fetch(pokespeciesjson.evolution_chain.url)
    let evojson = await evo.json()
    let allEvos = getEvo(evojson.chain)
    assignEvos(allEvos)

}

async function renderPokeSearch(pokemons) {
    loadingFeedback()
    RENDER_SECTION.innerHTML = ""
    for (let index = 0; index < pokemons.length; index++) {
        const POKEMON = pokemons[index];
        let pokefetch = await fetch(POKEMON.url)
        let pokefetchJSON = await pokefetch.json()
        if (pokefetchJSON.id < 9999) {
            let pokemon_data_array = getPokedata(pokefetchJSON)
            let pokemon_types = getPokeTypes(pokefetchJSON.types)
            RENDER_SECTION.innerHTML += createTemplateSmall(pokemon_data_array)
            addPokeType(pokemon_data_array[0], pokemon_types)
        }
    }
}


async function getPokemonFromSearch(pokemons) {
    let fetched_pokemons = []
    for (let index = 0; index < pokemons.length; index++) {
        const POKEMON = pokemons[index];
        let foundPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${POKEMON}`)
        let foundPokemonjson = await foundPokemon.json()
        fetched_pokemons.push(foundPokemonjson)
    }
    return fetched_pokemons
}

function checkForSearchType() {
    if (search == true) {
        search = false
        let renderAmount = total_loaded
        total_loaded = 0
        RENDER_SECTION.innerHTML = ""
        loadOnRequest(renderAmount)
    } else {
        console.log("ENTER MORE LETTERS");
    }
}

async function onSearch() {
    let input = SEARCH_BAR.value
    let input_lenght = input.length
    if (input_lenght >= 3) {
        search = true
        let allPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        let allPokemonsjson = await allPokemons.json()
        let foundpokemons = await allPokemonsjson.results.filter(pokemon => pokemon.name.includes(input))
        if (foundpokemons) {
            renderPokeSearch(foundpokemons)
        } else {
            RENDER_SECTION.innerHTML = returnNoResultFound()
        }
    } else {
        checkForSearchType()
    }
}


function onClick(event) {
    if (event.target === dialog) {
        dialog.close();
    }
}

const dialog = document.querySelector("dialog");
dialog.addEventListener("click", onClick);
