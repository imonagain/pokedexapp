// Start of IIFE
let pokemonRepository = (function () {
  let pokemonList = []; //empty array
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"; //API
  let modalContainer = document.querySelector("#modal-container");

  // adds pokemon to end of pokemonList
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
    }
  }

  //returns all pokemon in pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Creates button with pokemon name
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    
    
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");


    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
    loadDetails(pokemon).then(() => {
      showModal(item)
    });
  }

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

  function loadDetails(item) {
    let url = item.detailsUrl;
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
    // modal visible
  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal("Modal title", "Modal Content");
  });

    
    // press escape button
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
    
  // click outside modal
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

function showModal(title, text) {
  modalContainer.innerHTML = '';
  
  let modal = document.createElement('div');
  modal.classList.add('modal');
  
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);
  
  let titleElement = document.createElement('h1');
  titleElement.innerText = title;
  
  let contentElement = document.createElement('p');
  contentElement.innerText = text;
  
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  
  modalContainer.classList.add('is-visible');
 }

 function hideModal() {
  modalContainer.classList.remove('is-visible');
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
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});