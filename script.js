const POKE_URL = "https://pokeapi.co/api/v2/"
const RENDER_SECTION = document.getElementById("render_section")
const POKEMON_DIALOG = document.getElementById("pokemon_dialog")
const DIALOG_CAPTION = document.getElementById("dialog_caption")
const DIALOG_IMG = document.getElementById("dialog_img")

async function load() {
    let pokedata = await fetch(POKE_URL + "pokemon?limit=10&offset=0")
    let pokejson = await pokedata.json()
    let pokearray = await pokejson.results
    //console.log(pokejson);
    renderPokeSmall(pokearray)

}

async function renderPokeSmall(pokearray) {
    for (let index = 0; index < pokearray.length; index++) {
        const POKEMON = pokearray[index];
        let pokemon_data = await fetch(POKEMON.url)
        let pokemon_datajson = await pokemon_data.json()
        let pokemon_data_array = getPokedata(pokemon_datajson)
        let pokemon_types = getPokeTypes(pokemon_datajson.types)
        RENDER_SECTION.innerHTML += createTemplateSmall(pokemon_data_array)
        addPokeType(pokemon_data_array[0], pokemon_types)
    }
}

function getPokedata(pokemon_datajson) {
    return [pokemon_datajson.name, pokemon_datajson.sprites.front_default, pokemon_datajson.id]
}

function getBackgroundColor(poketype, pokename) {
    let pokesection = document.getElementById(pokename + '_section')
    switch (poketype) {
        case "grass":
            pokesection.classList.add('grass')
            break
        case "fire":
            pokesection.classList.add('fire')
            break
        case "water":
            pokesection.classList.add('water')
            break
        case "electric":
            pokesection.classList.add('electric')
            break
        case "poison":
            pokesection.classList.add('poison')
            break
        default:
            pokesection.classList.add('default')
            break
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
            getBackgroundColor(element, pokename)
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

function getImage(pokemonJSON) {

}
async function getDataFromAPI(poke_id) {
    let pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`)
    let pokedataJSON = await pokedata.json()
    let poke_abilities = getAbilities(pokedataJSON.abilities)
    DIALOG_CAPTION.innerText = pokedataJSON.name
    DIALOG_IMG.src = pokedataJSON.sprites.other.dream_world.front_default
    DIALOG_IMG.alt = pokedataJSON.name
    return [pokedataJSON,poke_abilities]
}

function setAboutSection(poke_dataJSON,abilities) {
    document.getElementById("species").innerText = poke_dataJSON.species.name
    document.getElementById("height").innerText = poke_dataJSON.height
    document.getElementById("weight").innerText = poke_dataJSON.weight + "kg"
     document.getElementById("abilities").innerText = ""
    for (let index = 0; index < abilities.length; index++) {
        const ability = abilities[index];
        document.getElementById("abilities").innerText += ability
    }
}

async function showBigPokemon(poke_id) {
    POKEMON_DIALOG.showModal()
    let poke_data = await getDataFromAPI(poke_id)
    document.getElementById("dialog_main").innerHTML = returnAboutSection()
    setAboutSection(poke_data[0],poke_data[1])

}

function setStatsSection() {

}

function setEvolutionSection() {

}

function setMovesSection() {
    
}
