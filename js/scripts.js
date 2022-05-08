// Start of IIFE
let pokemonRepository = (function () {
  let pokemonList = []; //empty array
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";


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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      openModal(pokemon)
    });
  }

  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      pokemon.imageUrl = details.sprites.other.dream_world.front_default;
      pokemon.height = details.height;
      pokemon.baseExperience = details.base_experience;
      pokemon.types = details.types[0].type.name;
    } catch (e) {
      console.error(e);
    }
  }

// Get modal element
let modal = document.getElementById('simpleModal');
// Get open modal button - Show modal button
let modalBtn = document.getElementById('modalBtn');
// Get close modal button
let closeBtn = document.getElementsByClassName('closeBtn')[0];
// Get modal content
let modalBody = document.getElementById('modal-body')


// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);
// Listen for escape keydown
window.addEventListener('keydown', escapeClick);

//Function to open modal
function openModal(pokemon) {
    modal.style.display = 'block';
    modalBody.innerHTML = '';

    let modalInnerBody = document.createElement('div');
    modalInnerBody.classList.add('modalInnerBody');
    
    let titleElement = document.createElement('h2');
    titleElement.innerText = pokemon.name;
   
    let imgElement = document.createElement('img')
    imgElement.src = pokemon.imageUrl
    
    let contentElement = document.createElement('p')
    contentElement.textContent += "Height: " + pokemon.height + " meters";
    contentElement.textContent += "\n" + "Base Experience:  " + pokemon.baseExperience + " points";
    contentElement.innerText += "\n" + "Types: " + pokemon.types;
    
    modalInnerBody.appendChild(titleElement);
    modalInnerBody.appendChild(imgElement);
    modalInnerBody.appendChild(contentElement);
    modalBody.appendChild(modalInnerBody);
}

// Function to close modal by x
function closeModal() {
    modal.style.display = 'none';
}

// Function to close modal on outside click
function outsideClick(e) {
  if(e.target === modal) {
      modal.style.display = 'none';
  }
}

// Function to close on Escape keydown
function escapeClick(event) { 
if (event.key === 'Escape') {
  modal.style.display = 'none';
  // hideModal();
}
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