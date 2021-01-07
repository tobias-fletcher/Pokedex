//creates array of pokemon with properties name, type, weight, and gender

      //wrapped in IIFE
let pokemonRepository = (function () {
    let modalContainer = document.querySelector('#modal-container');
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//    let pleaseWait = 'Loading...'
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon !== 'object') {
            return 'Not an object';
        } else if ("name" in pokemon && "type" in pokemon && "weight" in pokemon) {
            return `Object doesn't have required properties`;
        } else {
            pokemonList.push(pokemon);
        }
    }


    /*function showLoadingMessage() {
        spinner.className = "show";
        setTimeout(() => {
            spinner.className = "show";
        }, 5000);
    };

    function hideLoadingMessage() {
        spinner.className.remove('show');
    };*/

//creates buttons for pokemon
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('nameButton');
        addListener(button, pokemon);
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }

    function addListener(button, pokemon){
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(pokemon);
        })
    }

    async function loadList() {
//        showLoadingMessage();
        try {
            const response = await fetch(apiUrl);
            const json = await response.json();
            //            hideLoadingMessage();
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        } catch (e) {
            //            hideLoadingMessage();
            console.error(e);
        }
    }

//add timeout function to show loader while loading
    async function loadDetails(item) {
        let url = item.detailsUrl;
//        showLoadingMessage();
        try {
            const response = await fetch(url);
            const details = await response.json();
            //        hideLoadingMessage();
            item.imageUrl - details.sprites.front_default;
            item.weight = details.weight;
            item.types = details.types;
        } catch (e) {
            //            hideLoadingMessage();
            console.error(e);
        }
    }

    function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
    }

    function showModal(title, text) {
        modalContainer.innerHtml = '';
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
        modalContainer.classList.add('is-visibile');

    }

    function hideModal() {
        modalContainer.classList.remove('is-visibile');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visibile'))
        {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    //creates new object, sent to repository
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        addListener: addListener,
        loadList:loadList,
        loadDetails: loadDetails,
        showDetails:showDetails
    };
})();


//writes pokemon list
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });


});
