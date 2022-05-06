// Start of IIFE
let pokemonRepository = (function () {
  let pokemonList = []; //empty array
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"; //API


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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_shiny; // .spirtes is coming from API
        pokemon.height = details.height;
        pokemon.baseExperience = details.base_experience;
        pokemon.types = details.types[0].type.name;
      })
      .catch(function (e) {
        console.error(e);
      });
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
// Listen for external click
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
    
    let contentElement = document.createElement('p');
    contentElement.src = pokemon.imageUrl;
    contentElement.textContent += "Height: " + pokemon.height + " meters";
    contentElement.textContent += "\n" + "Base Experience:  " + pokemon.baseExperience + " points";
    contentElement.innerText += "\n" + "Types: " + pokemon.types;
    
    // modal2.appendChild(closeButtonElement);
    modalInnerBody.appendChild(titleElement);
    modalInnerBody.appendChild(imgElement);
    modalInnerBody.appendChild(contentElement);
    modalBody.appendChild(modalInnerBody);
    
    // modal.classList.add('is-visible');
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

function outsideClick(e) {
  if(e.target === modal) {
      modal.style.display = 'none';
  }
}

// Function to close on Escape click
function escapeClick(event) { 
if (event.key === 'Escape') {
  modal.style.display = 'none';
  console.log(123);
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