function guess()  {
    var userGuess = document.getElementById("userInput").value;
    
/*  for i number of times (Where i is the number of boxes)
        if the correct pokemons characteristic completely matches the guessed pokemon
            turn the ith box green
        else if the correct pokemons characteristic has at least one match with the guessed pokemon
            turn the ith box red
        else 
            turn the ith box red
*/
}

window.addEventListener('load', () => {
    document.getElementById('userButton').addEventListener('click', getPokemon());
});

function getPokemon() {
    var name = document.getElementById('userInput').value.toLowerCase();

    //Removes guessed pokemon from autocomplete so user doesn't think they can guess it again
    var pokemonIndex = pokemon.indexOf(name);
    pokemon.splice(pokemonIndex, 1);

    //Resets input field value to nothing, so user doesn't have to delete previous answer to type new one
    document.getElementById('userInput').value = "";
    
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    // console.log(name);

    var pokeinfo1 = {
        name: null,
        type1: null,
        type2: null,
        weight: null,
        height: null,
        habitat: null,
        color: null,
        evolution: null
    }; 

    fetch(url + name)
        .then(response => response.json())
        .then((data) => {
            //console.log(data);
            
            pokeinfo1.name = data.name;
            pokeinfo1.type1 = data.types['0'].type.name.toUpperCase();
            pokeinfo1.weight = parseInt(data.weight)/10 * 2.20462;
            pokeinfo1.height = parseInt(data.height)*10;

            if (Object.keys(data.types).length >= 2) {
                pokeinfo1.type2 = data.types['1'].type.name.toUpperCase();
            } else {
                pokeinfo1.type2 = "NONE";
            }

            document.querySelector(".inputName").innerHTML = `
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${pokeinfo1.name}">
            `
            document.querySelector(".inputType1").innerHTML = pokeinfo1.type1;
            document.querySelector(".inputType2").innerHTML = pokeinfo1.type2;
            document.querySelector(".inputWeight").innerHTML = pokeinfo1.weight.toFixed(2) + "lbs";
            document.querySelector(".inputHeight").innerHTML = pokeinfo1.height + "cm";
            

            // document.querySelector(".inputHabitat").innerHTML = data
            // document.querySelector(".inputColor").innerHTML =
            // document.querySelector(".inputEvo").innerHTML =

        }).catch((err) => {
            console.log("Pokemon not found", err);
        });
    
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + name)
        .then(response => response.json())
        .then((data1) => {
            console.log(data1);

            pokeinfo1.color = data1.color.name.toUpperCase();

            if (data1.habitat != null) {
                pokeinfo1.habitat = data1.habitat.name.toUpperCase();
            } else {
                pokeinfo1.habitat = "N/A";
            }

            if (data1.evolves_from_species == null) {
                pokeinfo1.evolution = '1';
                document.querySelector(".inputEvo").innerHTML = pokeinfo1.evolution;
            } else {
                fetch("https://pokeapi.co/api/v2/pokemon-species/" + data1.evolves_from_species.name)
                .then(response => response.json())
                .then((evo) => {
                    console.log(evo.evolves_from_species);
                    if (evo.evolves_from_species == null) {
                        pokeinfo1.evolution = '2';
                    } else {
                        pokeinfo1.evolution = '3';
                    }

                    document.querySelector(".inputEvo").innerHTML = pokeinfo1.evolution;

                }).catch((err) => {
                    console.log("Pokemon not found", err);
                });
            }
            
            console.log(pokeinfo1.evolution + "oop");

            document.querySelector(".inputHabitat").innerHTML = pokeinfo1.habitat;
            document.querySelector(".inputColor").innerHTML = pokeinfo1.color;

        }).catch((err) => {
            console.log("Pokemon not found", err);
        });



}


function setPokemon() { //creates the URL using “value”
    var id = getRandomInt();
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    var name = id;
    
    fetch(url + name) 
        .then(response => response.json) 
        .then((data) => {

            var pokeinfo2 = {
                name: data.name,
                type1: data.types['0'].type.name.toUpperCase(),
                type2: data.types['1'].type.name.toUpperCase(),
                weight: parseInt(data.weight)/10 * 2.20462,
                height: parseInt(data.height)*10
            };

        });
}
 
function getRandomInt() {
    return Math.floor(Math.random() * 809) + 1;
  }
