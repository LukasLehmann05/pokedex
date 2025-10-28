const POKE_URL = "https://pokeapi.co/api/v2/"
const RENDER_SECTION = document.getElementById("render_section")

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
        console.log(pokemon_data_array);
        
        RENDER_SECTION.innerHTML += createTemplateSmall(pokemon_data_array[0],pokemon_data_array[1])
    }
}

function getPokedata(pokemon_datajson) {
    return [pokemon_datajson.name,pokemon_datajson.sprites.front_default]
}