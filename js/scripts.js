// Start of IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('group-list-item');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('pokemon-button'); //
    listPokemon.append(button);
    pokemonList.append(listPokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);

    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    });
  }

  function showDetails(item) {
   loadDetails(item).then(function () {
      showModal(item);
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
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.baseExperience = details.base_experience;
        item.types = [];
        details.types.forEach(function(detail) {
          item.types = details.types[0].type.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let modalImage = $('modal-image');
    let imgElement = document.createElement('img')
    imgElement.src = pokemon.imageUrl
 
    let modalBody = $(".modal-body");

    let contentElement = document.createElement("p");
    contentElement.innerText += "\n" + "Height: " + pokemon.height + " meters";
    contentElement.textContent += "\n" + "Base Experience:  " + pokemon.baseExperience + " points";
    contentElement.innerText += "\n" + "Types: " + pokemon.types;

    modalTitle.empty();
    modalImage.empty();
    modalBody.empty();

    modalTitle.append(titleElement);
    modalImage.append(imgElement);
    modalBody.append(imgElement);
    modalBody.append(contentElement);
  }

  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".pokemon-list li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

$('#pokemonModal').modal('handleUpdate')

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
