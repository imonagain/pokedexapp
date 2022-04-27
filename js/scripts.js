let pokemonListRepository = (function () {
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

  function add(pokemon) {
    return pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonListRepository.add({
  name: "Diglett",
  nationalNumber: 50,
  height: 0.2,
  type: "Ground",
  abilities: ["Sand Veil", " Area Trap"],
});

console.log(pokemonListRepository.getAll());

pokemonListRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 2) {
    document.write(
      "<p><b>" +
        "Name: " +
        "</b>" +
        pokemon.name +
        "<br><b>" +
        "Height: " +
        "</b>" +
        pokemon.height +
        " " +
        "meters -- whoa that's huge!" +
        "<br><b>" +
        "Type: " +
        "</b>" +
        pokemon.type +
        "<br><b>" +
        "Abilities: " +
        "</b>" +
        pokemon.abilities +
        "</p>"
    );
  } else {
    document.write(
      "<p><b>" +
        "Name: " +
        "</b>" +
        pokemon.name +
        "<br><b>" +
        "Height: " +
        "</b>" +
        pokemon.height +
        " " +
        "meters" +
        "<br><b>" +
        "Type: " +
        "</b>" +
        pokemon.type +
        "<br><b>" +
        "Abilities: " +
        "</b>" +
        pokemon.abilities +
        "</p>"
    );
  }
});
