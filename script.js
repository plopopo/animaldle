
const id = getRandomInt();
var guessCount = 0;


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

async function getPokemon(n, u) {
    var name = n;
    var url = u;

    let pokeinfo1 = {};

    try {
        const response = await fetch(url + name);
        const data = await response.json();

        pokemon.splice(pokemon.indexOf(data.name.toLowerCase()), 1);

        pokeinfo1.name = data.name;
        pokeinfo1.type1 = data.types[0].type.name.toUpperCase();
        pokeinfo1.weight = parseInt(data.weight) / 10 * 2.20462;
        pokeinfo1.height = parseInt(data.height) * 10;
        pokeinfo1.img = data.sprites.other['official-artwork'].front_default;

        if (data.types.length >= 2) {
            pokeinfo1.type2 = data.types[1].type.name.toUpperCase();
        } else {
            pokeinfo1.type2 = "NONE";
        }

        const responseSpecies = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + name);
        const dataSpecies = await responseSpecies.json();

        pokeinfo1.color = dataSpecies.color.name.toUpperCase();

        if (dataSpecies.habitat != null) {
            pokeinfo1.habitat = dataSpecies.habitat.name.toUpperCase();
        } else {
            pokeinfo1.habitat = "N/A";
        }

        if (dataSpecies.evolves_from_species == null) {
            pokeinfo1.evolution = '1';
        } else {
            const evoResponse = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + dataSpecies.evolves_from_species.name);
            const evo = await evoResponse.json();

            if (evo.evolves_from_species == null) {
                pokeinfo1.evolution = '2';
            } else {
                pokeinfo1.evolution = '3';
            }
        }
    } catch (err) {
        console.log("Pokemon not found", err);
    }

    return pokeinfo1;
}

async function setBoxes() {
    var name = document.getElementById('userInput').value;
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    
    if (pokemon.includes(name.toLowerCase())) {
        guessCount++;

        var info = await getPokemon(name, url);

        //Creating the new Row
        var newRow = document.createElement("div");
        newRow.setAttribute("class","row justify-content-md-center");
        newRow.setAttribute("id", "guess_" + guessCount.toString());
        document.getElementById("guesses").appendChild(newRow)

        var newInputImg = document.createElement("div");
        newInputImg.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputimg guesses");
        newInputImg.setAttribute("id", "inputimg_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputImg);

        var newInputType1 = document.createElement("div");
        newInputType1.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputtype1 guesses");
        newInputType1.setAttribute("id", "inputtype1_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputType1);

        var newInputType2 = document.createElement("div");
        newInputType2.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputtype2 guesses");
        newInputType2.setAttribute("id", "inputtype2_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputType2);

        var newInputHabitat = document.createElement("div");
        newInputHabitat.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputhabitat guesses");
        newInputHabitat.setAttribute("id", "inputhabitat_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputHabitat);

        var newInputColor = document.createElement("div");
        newInputColor.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputcolor guesses");
        newInputColor.setAttribute("id", "inputcolor_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputColor);

        var newInputEvolution = document.createElement("div");
        newInputEvolution.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputevolution guesses");
        newInputEvolution.setAttribute("id", "inputevolution_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputEvolution);

        var newInputHeight = document.createElement("div");
        newInputHeight.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputheight guesses");
        newInputHeight.setAttribute("id", "inputheight_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputHeight);

        var newInputWeight = document.createElement("div");
        newInputWeight.setAttribute("class", "col-1 p-3 mx-3 my-5 container-sm rounded border border-dark bg-primary overflow-auto inputweight guesses");
        newInputWeight.setAttribute("id", "inputweight_" + guessCount.toString());
        document.getElementById("guess_" + guessCount.toString()).appendChild(newInputWeight);

        document.getElementById("inputimg_" + guessCount.toString()).innerHTML = `<img src="${info.img}" alt="${info.name}">`
        document.getElementById("inputtype1_" + guessCount.toString()).innerHTML = info.type1;
        document.getElementById("inputtype2_" + guessCount.toString()).innerHTML = info.type2;
        document.getElementById("inputweight_" + guessCount.toString()).innerHTML = info.weight.toFixed(2) + "lbs";
        document.getElementById("inputheight_" + guessCount.toString()).innerHTML = info.height + "cm";
        document.getElementById("inputevolution_" + guessCount.toString()).innerHTML = info.evolution;
        document.getElementById("inputhabitat_" + guessCount.toString()).innerHTML = info.habitat;
        document.getElementById("inputcolor_" + guessCount.toString()).innerHTML = info.color;
    }  
}



async function comparePokemon() { 
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    var name = id;

    var pokeinfo1 = await getPokemon(document.getElementById('userInput').value, url);
    var pokeinfo2 = await getPokemon(name, url);

    console.log(pokeinfo1);
    console.log(pokeinfo2);

    for (var key in pokeinfo1) {
        var element = document.getElementById("input"+key + "_" + guessCount.toString());

        if (key == "img") {
            if (element) {
                
                element.classList.add('differencelazy');
            } else {
                console.error("Element with class 'input"+key+"' not found.");
            }
        } else if (pokeinfo1[key] !== pokeinfo2[key] && key != "name") {

            if (element) {
                element.classList.add('difference1');

            } else {
                console.error("Element with class 'input"+key+"' not found.");
            }
        } else {
            if (element) {
                element.classList.add('difference2');

            } else {
                console.error("Element with class 'input"+key+"' not found.");
            }
        }

    }
 }


function getRandomInt() {
    return Math.floor(Math.random() * 1025) + 1;
}