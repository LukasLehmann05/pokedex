const POKE_URL = "https://pokeapi.co/api/v2/"
const RENDER_SECTION = document.getElementById("render_section")

async function load() {
    let pokedata = await fetch(POKE_URL + "pokemon?limit=100&offset=0")
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
    return [pokemon_datajson.name, pokemon_datajson.sprites.front_default]
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