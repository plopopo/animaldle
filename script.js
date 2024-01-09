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

function getPokemon(n, u) {
    var name = n;
    var url = u;

    console.log(name);
    console.log(url);

    var pokeinfo1 = {
        name: "poop",
        type1: "poop",
        type2: "poop",
        weight: "poop",
        height: "poop",
        habitat: "poop",
        color: "poop",
        evolution: "poop",
        img: "poop"
    }; 

    fetch(url + name)
        .then(response => response.json())
        .then((data) => {
            //console.log(data);
            
            pokeinfo1.name = data.name;
            pokeinfo1.type1 = data.types['0'].type.name.toUpperCase();
            pokeinfo1.weight = parseInt(data.weight)/10 * 2.20462;
            pokeinfo1.height = parseInt(data.height)*10;
            pokeinfo1.img = data.sprites.other['official-artwork'].front_default;

            if (Object.keys(data.types).length >= 2) {
                pokeinfo1.type2 = data.types['1'].type.name.toUpperCase();
            } else {
                pokeinfo1.type2 = "NONE";
            }         

            // document.querySelector(".inputHabitat").innerHTML = data
            // document.querySelector(".inputColor").innerHTML =
            // document.querySelector(".inputEvo").innerHTML =

        }).catch((err) => {
            console.log("Pokemon not found", err);
        });
    
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + name)
        .then(response => response.json())
        .then((data1) => {
            //console.log(name);

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
                    //console.log(evo.evolves_from_species);
                    if (evo.evolves_from_species == null) {
                        pokeinfo1.evolution = '2';
                    } else {
                        pokeinfo1.evolution = '3';
                    }

                }).catch((err) => {
                    console.log("Pokemon not found", err);
                });
            }
            
            //console.log(pokeinfo1.evolution + "oop");

        }).catch((err) => {
            console.log("Pokemon not found", err);
        });

    //console.log(pokeinfo1);
    
    return (pokeinfo1);
}


    function setBoxes() {
        var name = document.getElementById('userInput').value;
        var url = 'https://pokeapi.co/api/v2/pokemon/';
        
        //console.log(name);

        var info = getPokemon(name, url);

        console.log(info);

        console.log(info.habitat);
        
        document.querySelector(".inputName").innerHTML = `
            <img src="${info.img}" alt="${info.name}">
            `
        document.querySelector(".inputType1").innerHTML = info.type1;
        document.querySelector(".inputType2").innerHTML = info.type2;
        document.querySelector(".inputWeight").innerHTML = info.weight.toFixed(2) + "lbs";
        document.querySelector(".inputHeight").innerHTML = info.height + "cm";
        document.querySelector(".inputEvo").innerHTML = info.evolution;
        document.querySelector(".inputHabitat").innerHTML = info.habitat;
        document.querySelector(".inputColor").innerHTML = info.color;

    }



function comparePokemon() { //creates the URL using “value”

function setPokemon() { //creates the URL using “value”
    var id = getRandomInt();
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    var name = id;

    var pokeinfo1 = getPokemon()

    var pokeinfo2 = {
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
            
            pokeinfo2.name = data.name;
            pokeinfo2.type1 = data.types['0'].type.name.toUpperCase();
            pokeinfo2.weight = parseInt(data.weight)/10 * 2.20462;
            pokeinfo2.height = parseInt(data.height)*10;

            if (Object.keys(data.types).length >= 2) {
                pokeinfo1.type2 = data.types['1'].type.name.toUpperCase();
            } else {
                pokeinfo1.type2 = "NONE";
            }

        }).catch((err) => {
            console.log("Pokemon not found", err);
        });
    
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + name)
        .then(response => response.json())
        .then((data1) => {
            console.log(data1);

            pokeinfo2.color = data2.color.name.toUpperCase();

            if (data2.habitat != null) {
                pokeinfo2.habitat = data2.habitat.name.toUpperCase();
            } else {
                pokeinfo2.habitat = "N/A";
            }

            if (data1.evolves_from_species == null) {
                pokeinfo2.evolution = '1';
                document.querySelector(".inputEvo").innerHTML = pokeinfo2.evolution;
            } else {
                fetch("https://pokeapi.co/api/v2/pokemon-species/" + data1.evolves_from_species.name)
                .then(response => response.json())
                .then((evo) => {
                    console.log(evo.evolves_from_species);
                    if (evo.evolves_from_species == null) {
                        pokeinfo2.evolution = '2';
                    } else {
                        pokeinfo2.evolution = '3';
                    }

                    document.querySelector(".inputEvo").innerHTML = pokeinfo2.evolution;

                }).catch((err) => {
                    console.log("Pokemon not found", err);
                });
            }

        }).catch((err) => {
            console.log("Pokemon not found", err);
        });
 }


function getRandomInt() {
    return Math.floor(Math.random() * 809) + 1;
}
}

