let pokemonRepository = (function () {
    let pokemonList = []; //empty array
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"; //API
  
    // adds pokemon to pokemonList
    function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
  
    //returns all pokemon in pokemonList array
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-button");
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      button.addEventListener("click", function (event) {
        showDetails(pokemon);
      });
    }
    // Promise
    function loadList() {
      // GET complete list of Pokemon from apiUrl
      return fetch(apiUrl)
        .then(function (response) { //result of fetch(apiUrl) is the response
          return response.json(); //converts response into json
        })
        .then(function (json) {
          // json.results = object.key
          json.results.forEach(function (item) { //"for each item, create a pokemon variable"
            let pokemon = {
              //  pokemon variable is object that has two keys
              name: item.name,
              detailsUrl: item.url,
            };
            // add function was declared earlier on line 6
            add(pokemon);
            // console.log(pokemon);
          });
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  
    // Another promise
    function loadDetails(item) {
      let url = item.detailsUrl; //.detailsUrl from line 44
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.imageUrl = details.sprites.front_default; // .spirtes is coming from API
          item.height = details.height;
          item.baseExperience = details.base_experience;
          item.types = details.types;
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    // Another promise
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
  })();
  
  pokemonRepository.loadList().then(function () {
    //pass lines 89 and 90 as values
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });