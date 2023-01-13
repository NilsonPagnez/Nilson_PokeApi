const pokeSprite = document.querySelectorAll('.pokemonSprite')
const idPokemon = document.querySelector('.pokeID')
const screenError = document.querySelector('.textError')
const pokemonName = document.querySelector('.pokemonName')
const prev = document.getElementById('js_btn_prev')
const next = document.getElementById('js_btn_next')
const pokeStats = document.querySelectorAll('.stats_number')
const form = document.querySelector('.form')
const input = document.querySelector('.searchForPokemon')



pokemonSearch = 1



const fetchPokeapi = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(apiResponse.status == 200){
        const data = await apiResponse.json();
        
        return data
    }
    
}


const renderPokemon = async (pokemon) =>{

    
    const data = await fetchPokeapi(pokemon)

    
    if(data){
        let infoPokemon = {
            pokeId: data.id,
            pokeName: data.name,
            sprite: data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
            types: data.types,
            stats: data.stats,
            weight: data.weight,
            height: data.height,
            abilities: data.abilities,
        }
        
        pokeSprite.forEach(pokemon => {
            pokemon.src = infoPokemon.sprite
            
            pokemon.style.display = 'block'
        });
        pokeStats.forEach((pokemon, index) =>{
            pokemon.innerHTML = infoPokemon.stats[index].base_stat

        })
        pokemonName.innerHTML = infoPokemon.pokeName
        idPokemon.innerHTML = infoPokemon.pokeId
        input.value =""
        screenError.style.display = 'none'

    }else{
        
        pokeSprite.forEach(pokemon => {
            pokemon.style.display = 'none'
        });
        pokeStats.forEach((pokemon, index) =>{
            pokemon.innerHTML = 'ERROR'

        })
        pokemonName.innerHTML = 'ERROR'
        idPokemon.innerHTML = ''
        input.value =""
        screenError.style.display = 'flex'
        
    }

    
    
}

form.addEventListener('submit',(e) =>{
    e.preventDefault()

     renderPokemon(input.value.toLowerCase())

   

})

function prevPokemon(){
    if(pokemonSearch >1){

        pokemonSearch -= 1
    }
    renderPokemon(pokemonSearch)
}

document.addEventListener('keydown', (e) =>{
    var Code = e.keyCode

    
    if(Code === 37 ){
        prevPokemon()
    }
})


prev.addEventListener('click', ()=>{
    prevPokemon()
})


function nextPokemon(){
    pokemonSearch += 1
    renderPokemon(pokemonSearch)
}


document.addEventListener('keydown', (e) =>{
    var Code = e.keyCode

    
    if(Code === 39 ){
        nextPokemon()
    }
})

next.addEventListener('click', ()=>{
    nextPokemon()
})


renderPokemon(pokemonSearch)
