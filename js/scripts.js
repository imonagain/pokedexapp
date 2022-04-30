let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Pikachu",
      nationalNumber: 25,
      height: 0.4,
      type: "Electric",
      abilities: "Static",
    },
    {
      name: "Staryu",
      nationalNumber: 120,
      height: 0.8,
      type: "Water",
      abilities: ["Illuminate", " Natural Cure"],
    },
    {
      name: "Meowth",
      nationalNumber: 52,
      height: 0.4,
      type: "Normal",
      abilities: ["Pickup", "Technician"],
    },
    {
      name: "Poliwag",
      nationalNumber: 60,
      height: 0.6,
      type: "Water",
      abilities: ["Water Absorb", "Damp"],
    },
    {
      name: "Jigglypuff",
      nationalNumber: 39,
      height: 0.7,
      type: ["Normal", " Fairy"],
      abilities: ["Pickup", " Technician"],
    },
    {
      name: "Cubone",
      nationalNumber: 104,
      height: 0.4,
      type: "Ground",
      abilities: ["Rock Head", " Lightning Rod"],
    },
    {
      name: "Exeggutor",
      nationalNumber: 103,
      height: 2,
      type: ["Grass", " Psychic"],
      abilities: "Chlorophyll",
    },
    {
      name: "Mewtwo",
      nationalNumber: 150,
      height: 3,
      type: "Psychic",
      abilities: "Pressure",
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    return pokemonList.push(pokemon);
  } 

  function addListItem(pokemon) {
    let pokemonListClass = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListClass.appendChild(listItem);
    button.addEventListener('click',function() {
      showDetails(pokemon.name);
    });
  } 


  function showDetails(pokemon) {
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  }


})();

pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);
}); 
