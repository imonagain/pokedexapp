//  IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  //  modalContainer
  let modalContainer = document.querySelector("#modal-container");

  //  Assign -getAll- function to shows all pokemon
  function getAll() {
    return pokemonList;
  }

  //  Assign -add- function to add pokemon to end of array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    // Setting a list of variables
    let pokedexList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");

    // Button text and styling
    button.innerText = pokemon.name;
    button.classList.add("button-style");

    // Append list and button
    listPokemon.appendChild(button);
    pokedexList.appendChild(listPokemon);

    // Event listener - click on button - shows pokemon details
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  // Show detials function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Load List function
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  // Load Details function
  function loadDetails(item) {

    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //  event listener so showModal function starts on click
  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal("Modal title", "This is the modal content!");
  });

  //  event listener to window for keyboard input esc
  window.addEventListener("keydown", (e) => {
    //  if user esc and modal container is visible, executes hideModal function
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // event listener when user clicks outside
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //  function to show modal
  function showModal(pokemon) {
    modalContainer.innerHTML = "";

    //  creates modal inside modal container
    let modal = document.createElement("div");
    modal.classList.add("modal");

    //  add the new modal content (button, title and content)
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h2");
    titleElement.innerText = pokemon.name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;

    let weightElement = document.createElement("p");
    weightElement.innerText = "Height: " + pokemon.weight;

    let typeElement = document.createElement("p");
    typeElement.innerText = "Types: ";
    pokemon.types.forEach((type, numberOfTypes) => {
      numberOfTypes = pokemon.types.pokemon;

      if (numberOfTypes === 1) {
        typeElement.innerText += type.type.name;
      } else {
        typeElement.innerText += type.type.name + " ";
      }
    });

    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-image");
    imageElement.src = pokemon.imageUrl;

    //  append contents into modal, and append modal into modal container
    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typeElement);
    modalContainer.appendChild(modal);

    //  finally adds .is-visible class to modal container to appear
    modalContainer.classList.add("is-visible");
  }

  //  function to hide modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//  Show all 151 pokemon using API
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
