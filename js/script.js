const pokeSprite = document.querySelectorAll('.pokemonSprite')
const idPokemon = document.querySelector('.pokeID')
const screenError = document.querySelector('.textError')
const pokemonName = document.querySelector('.pokemonName')
const prev = document.getElementById('js_btn_prev')
const next = document.getElementById('js_btn_next')
const pokeStats = document.querySelectorAll('.stats_number')
const pokeStatsTypes = document.querySelectorAll('.statsNumberTypes')

const form = document.querySelector('.form')
const input = document.querySelector('.searchForPokemon')

const btnMainStats = document.querySelector('.js_showMainStats')
const btnShowHpStats = document.querySelector('.js_showHPstats')

const statsNames = document.querySelectorAll(('.statsName li'))


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
            exp: data.base_experience,
        }
        
        
        
      
  
        pokeSprite.forEach(pokemon => {
            pokemon.src = infoPokemon.sprite
            
            pokemon.style.display = 'block'
        });


        
        pokeStats[0].innerHTML=  infoPokemon.pokeId
        pokeStats[1].innerHTML=  infoPokemon.pokeName
        if(infoPokemon.types.length == 2){
        pokeStatsTypes.forEach((tipo, index) =>{
            
            tipo.innerHTML = infoPokemon.types[index].type.name
            
            
        })
        }else{
            pokeStatsTypes[0].innerHTML =  infoPokemon.types[0].type.name
            pokeStatsTypes[1].innerHTML =  ''
        
        }
        pokeStats[3].innerHTML=  `${infoPokemon.height / 10} m` 
        pokeStats[4].innerHTML=  `${infoPokemon.weight / 10} kg`
        pokeStats[5].innerHTML=  infoPokemon.exp
        

        pokemonName.innerHTML = infoPokemon.pokeName
        idPokemon.innerHTML = infoPokemon.pokeId
        input.value =""
        screenError.style.display = 'none'

        
        btnMainStats.addEventListener('click', async function MainStats(){
            statsNames[0].innerHTML = 'No'
            statsNames[1].innerHTML = 'NAME'
            statsNames[2].innerHTML = 'TYPE'
            statsNames[3].innerHTML = 'HEIGHT'
            statsNames[4].innerHTML = 'WEIGHT'
            statsNames[5].innerHTML = 'EXP'

            pokeStats[0].innerHTML=  infoPokemon.pokeId
            pokeStats[1].innerHTML=  infoPokemon.pokeName
            
            if(infoPokemon.types.length == 2){
                pokeStatsTypes.forEach((tipo, index) =>{
                    
                    tipo.innerHTML = infoPokemon.types[index].type.name
                    
                    
                })
                }else{
                    pokeStatsTypes[0].innerHTML =  infoPokemon.types[0].type.name
                    pokeStatsTypes[1].innerHTML =  ''
                
                }
            pokeStats[3].innerHTML=  `${infoPokemon.height / 10} m` 
            pokeStats[4].innerHTML=  `${infoPokemon.weight / 10} kg`
            pokeStats[5].innerHTML=  infoPokemon.exp
        
            
        })
        btnShowHpStats.addEventListener('click', function HPstats(){
            statsNames[0].innerHTML = 'HP'
            statsNames[1].innerHTML = 'ATTACK'
            statsNames[2].innerHTML = 'DEFENSE'
            statsNames[3].innerHTML = 'SP-ATK'
            statsNames[4].innerHTML = 'SP-DEF'
            statsNames[5].innerHTML = 'SPEED'
            
            pokeStats.forEach((pokemon, index) =>{
                if(index == 2){
                    pokeStatsTypes[0].innerHTML =  infoPokemon.stats[2].base_stat
                    pokeStatsTypes[1].innerHTML =  ''
                
                }else{

                    pokemon.innerHTML = infoPokemon.stats[index].base_stat
                }
    
            })
            
        })
        
       
        
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




const mouseDown = function (btn, btn2){
    btn.addEventListener('mousedown', ()=>{
        btn.style.transform ="scale(0.9)"
    } )
    btn2.addEventListener('mousedown', ()=>{
        btn2.style.transform ="scale(0.9)"
    } )
} 
const mouseUp = function (btn, btn2){
    btn.addEventListener('mouseup', ()=>{
        btn.style.transform ="scale(1)"
    } )
    btn2.addEventListener('mouseup', ()=>{
        btn2.style.transform ="scale(1)"
    } )
} 

mouseDown(prev, next)
mouseUp(prev,next)



/*
function changeLi (){
    statsNames.forEach((category, index) =>{
        if(category.classList = active ){
            index[0].innerHTML = 'asda'
        }

    })
}
changeLi()
*/
renderPokemon(pokemonSearch)
