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
    listPokemon.classList.add('list-group-item');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('pokemon-button'); //
    listPokemon.append(button);
    pokemonList.append(listPokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);

    button.setAttribute('data-toggle', '#pokemonModal');
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
        item.weight = details.weight;
        item.baseExperience = details.base_experience;
        details.types.forEach(function() {
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
    titleElement.classList.add('titleElement');
    titleElement.innerText = pokemon.name;

    let phraseElement = document.createElement("h2");
  phraseElement.classList.add('phraseElement');
    phraseElement.innerText = 'Gotta Catch \'Em All!';

    let modalImage = $('modal-image');
    let imgElement = document.createElement('img')
    imgElement.classList.add('imgElement')
    imgElement.src = pokemon.imageUrl
 
    let modalBody = $(".modal-body");

    let contentElement = document.createElement("p");
    contentElement.classList.add('contentElement');
    contentElement.innerText += "\n" + "Height: " + pokemon.height;
    contentElement.innerHTML += "\n" + "Weight: " + pokemon.weight;
    contentElement.innerHTML += "\n" + "Base Experience:  " + pokemon.baseExperience;
    contentElement.innerText += "\n" + "Type: " + pokemon.types;

    modalTitle.empty();
    modalImage.empty();
    modalBody.empty();

    modalTitle.append(phraseElement);
    modalBody.append(imgElement);
    modalBody.append(titleElement)
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
