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
    var name = document.getElementById('userInput').value;
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    console.log(name);

    fetch(url + name)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.querySelector(".pokemonBox").innerHTML = `
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            `
        }).catch((err) => {
            console.log("Pokemon not found", err);
        });

}

//getPokemon();
 