const id = getRandomInt();

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

    var info = await getPokemon(name, url);

    //console.log(info);

    //console.log(info.habitat);

        document.querySelector(".inputimg").innerHTML = `
            <img src="${info.img}" alt="${info.name}">
            `
        document.querySelector(".inputtype1").innerHTML = info.type1;
        document.querySelector(".inputtype2").innerHTML = info.type2;
        document.querySelector(".inputweight").innerHTML = info.weight.toFixed(2) + "lbs";
        document.querySelector(".inputheight").innerHTML = info.height + "cm";
        document.querySelector(".inputevolution").innerHTML = info.evolution;
        document.querySelector(".inputhabitat").innerHTML = info.habitat;
        document.querySelector(".inputcolor").innerHTML = info.color;
}



async function comparePokemon() { 
    var id = getRandomInt();
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    var name = id;

    var pokeinfo1 = await getPokemon(document.getElementById('userInput').value, url);
    var pokeinfo2 = await getPokemon(name, url);

    console.log(pokeinfo1);
    console.log(pokeinfo2);

    for (var key in pokeinfo1) {
        var element = document.querySelector(".input"+key);

        if (pokeinfo1[key] !== pokeinfo2[key] && key != "name") {

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