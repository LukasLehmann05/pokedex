const POKE_URL = "https://pokeapi.co/api/v2/"
const RENDER_SECTION = document.getElementById("render_section")
const POKEMON_DIALOG = document.getElementById("pokemon_dialog")
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
let renderedPokeData = []

async function load() {
    loadingFeedback()
    await renderPokeSmall(start_loading_amount)
    loadingFeedback()
}

function checkIfExists(pokemon) {
    if (!renderedPokemons.includes(pokemon.name)) {
        renderedPokemons.push(pokemon.name)
        renderedPokeData.push(pokemon)
    }
}

async function loadDataByAmount(amount) {
    let poke_data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${total_loaded}`)
    let poke_json = await poke_data.json()
    let result = poke_json.results
    let fetchedpokemons = []
    for (let index = 0; index < result.length; index++) {
        const POKEMON = result[index];
        let poke_detail_data = await fetch(POKEMON.url)
        let poke_detail_json = await poke_detail_data.json()
        fetchedpokemons.push(poke_detail_json)
        checkIfExists(poke_detail_json)
    }
    total_loaded += fetchedpokemons.length
    return fetchedpokemons
}

async function loadDataByArray(pokemons) {
    let poke_data = []
    for (let index = 0; index < pokemons.length; index++) {
        const POKEMON = pokemons[index];
        let poke_fetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${POKEMON}`)
        let poke_fetch_json = await poke_fetch.json()
        poke_data.push(poke_fetch_json)
        checkIfExists(poke_fetch_json)
    }
    return poke_data
}

async function renderPokeSmall(amount) {
    if (loading == false) {
        loading = true
        loadingFeedback()
        let pokedata = await loadDataByAmount(amount)
        for (let index = 0; index < pokedata.length; index++) {
            const POKEMON = pokedata[index];
            let pokemon_data_array = getPokedata(POKEMON)
            let pokemon_types = getPokeTypes(POKEMON.types)
            RENDER_SECTION.innerHTML += createTemplateSmall(renderedPokemons.indexOf(POKEMON.name), POKEMON.name, POKEMON.sprites.front_default)
            addPokeType(pokemon_data_array[0], pokemon_types)
        }
        loading = false
        loadingFeedback()
    }
}

async function renderPokeSmallByData() {
    if (loading == false) {
        loading = true
        loadingFeedback()
        let pokedata = renderedPokeData
        for (let index = 0; index < pokedata.length; index++) {
            const POKEMON = pokedata[index];
            let pokemon_data_array = getPokedata(POKEMON)
            let pokemon_types = getPokeTypes(POKEMON.types)
            RENDER_SECTION.innerHTML += createTemplateSmall(renderedPokemons.indexOf(POKEMON.name), POKEMON.name, POKEMON.sprites.front_default)
            addPokeType(pokemon_data_array[0], pokemon_types)
        }
        loading = false
        loadingFeedback()
    }
}

function getPokedata(pokemon_datajson) {
    return [pokemon_datajson.name, pokemon_datajson.sprites.front_default, pokemon_datajson.id]
}

function getBackgroundColor(poketype) {
    const TYPE_CLASSES = ["grass", "fire", "water", "electric", "poison", "dark", "bug", "fighting", "psychic", "rock"]
    if (TYPE_CLASSES.includes(poketype)) {
        return poketype
    } else {
        return "default"
    }
}

function loadingFeedback() {
    if (loading == false) {
        document.getElementById('h1_tag').classList.remove('hide')
        document.getElementById('loading_section').classList.add('hide')
        document.getElementById('title_center').classList.add('column-reverse')
        document.getElementById('render_button_left').classList.remove('button-load')
        document.getElementById('render_button_right').classList.remove('button-load')
    } else {
        document.getElementById('h1_tag').classList.add('hide')
        document.getElementById('loading_section').classList.remove('hide')
        document.getElementById('title_center').classList.remove('column-reverse')
        document.getElementById('render_button_left').classList.add('button-load')
        document.getElementById('render_button_right').classList.add('button-load')
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

function setDialogImage(pokeJSON) {
    if (pokeJSON.sprites.other.dream_world.front_default) {
        DIALOG_IMG.src = pokeJSON.sprites.other.dream_world.front_default
    } else if (pokeJSON.sprites.other.home.front_default) {
        DIALOG_IMG.src = pokeJSON.sprites.other.home.front_default
    } else {
        DIALOG_IMG.src = pokeJSON.sprites.front_default
    }
}

async function getDataFromAPI(index) {
    let pokedataJSON = renderedPokeData[index]
    let poke_abilities = getAbilities(pokedataJSON.abilities)
    document.getElementById('dialog_caption_section').innerHTML = returnDialogCaption(pokedataJSON.name.charAt(0).toUpperCase() + pokedataJSON.name.slice(1), renderedPokemons.indexOf(pokedataJSON.name))
    setDialogImage(pokedataJSON)
    DIALOG_IMG.alt = pokedataJSON.name
    document.getElementById('body').classList.add('body-open')
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

function changeDialogClass(poke_data) {
    let bg_color = getBackgroundColor(poke_data[0].types[0].type.name)
    if (current_class !== "") {
        POKEMON_DIALOG.classList.remove(current_class)
    }
    POKEMON_DIALOG.classList.add(bg_color)
    current_class = bg_color
}

async function showBigPokemon(index) {
    let poke_data = await getDataFromAPI(index)
    document.getElementById("dialog_main").innerHTML = returnAboutSection()
    updateAboutSection(poke_data[0], poke_data[1])
    setDialogTypes(getPokeTypes(poke_data[0].types))
    changeDialogClass(poke_data)
    document.getElementById("dialog_nav").innerHTML = returnNav(poke_data[0])
    if (current_button != "") {
        current_button.classList.remove('current')
    }
    document.getElementById('about_button').classList.add('current')
    current_button = document.getElementById('about_button')
    POKEMON_DIALOG.showModal()
}

async function setAboutSection(index) {
    current_button.classList.remove('current')
    document.getElementById('about_button').classList.add('current')
    current_button = document.getElementById('about_button')
    let poke_dataJSON = renderedPokeData[index]
    let abilities = getAbilities(poke_dataJSON.abilities)
    document.getElementById("dialog_main").innerHTML = returnAboutSection()
    updateAboutSection(poke_dataJSON, abilities)
}

async function setStatsSection(index) {
    document.getElementById("dialog_main").innerHTML = await returnStatsSection(renderedPokeData[index])
    current_button.classList.remove('current')
    document.getElementById('stats_button').classList.add('current')
    current_button = document.getElementById('stats_button')
}

function setEvolutionSection(index) {
    current_button.classList.remove('current')
    document.getElementById('evo_button').classList.add('current')
    current_button = document.getElementById('evo_button')
    returnEvolution(index)

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

async function returnEvolution(index) {
    let pokejson = renderedPokeData[index]
    let pokespecies = await fetch(pokejson.species.url)
    let pokespeciesjson = await pokespecies.json()
    let evo = await fetch(pokespeciesjson.evolution_chain.url)
    let evojson = await evo.json()
    let allEvos = getEvo(evojson.chain)
    assignEvos(allEvos)

}

function checkDataAmount(amount) {
    if (amount > 50) {
        renderedPokemons.splice(75, amount - 75)
        renderedPokeData.splice(75, amount - 75)
    }
}

async function renderPokeSearch(pokemons) { 
    RENDER_SECTION.innerHTML = ""
    let poke_data = await loadDataByArray(pokemons)
    for (let index = 0; index < poke_data.length; index++) {
        const POKEMON = poke_data[index];
        let pokemon_data_array = getPokedata(POKEMON)
        let pokemon_types = getPokeTypes(POKEMON.types)
        RENDER_SECTION.innerHTML += createTemplateSmall(renderedPokemons.indexOf(POKEMON.name), POKEMON.name, POKEMON.sprites.front_default)
        addPokeType(pokemon_data_array[0], pokemon_types)
    }
    loading = false
    loadingFeedback()
}

function checkLoadStatus() {
    if (search = true) {
        search = false
        RENDER_SECTION.innerHTML = ""
        checkDataAmount(renderedPokemons.length)
        renderPokeSmallByData()
    }
}

async function onSearch() {
    let input = SEARCH_BAR.value
    let input_lenght = input.length
    if (input_lenght >= 3) {
        search = true
        let foundpokemons = renderedPokemons.filter(pokemon => pokemon.includes(input))
        if (foundpokemons.length > 0) {
            await renderPokeSearch(foundpokemons)
        } else {
            RENDER_SECTION.innerHTML = returnNoResultFound()
            search = false
        }
    } else {
        checkLoadStatus()
    }
}

function dialogClickLeft(index) {
    if (index > 0) {
        showBigPokemon(index - 1)
    } else {
        showBigPokemon(renderedPokemons.length - 1)
    }
}

function dialogClickRight(index) {
    if (index + 1 >= renderedPokemons.length) {
        showBigPokemon(0)
    } else {
        showBigPokemon(index + 1)
    }
}

function onClick(event) {
    if (event.target === dialog) {
        dialog.close();
        document.getElementById('body').classList.remove('body-open')
    }
}

const dialog = document.querySelector("dialog");
dialog.addEventListener("click", onClick);
