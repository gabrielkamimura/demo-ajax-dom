// Nesta área, estamos buscando os elementos no DOM
var campoFrase = document.querySelector('#ffrase'),
    formAdicao = document.querySelector('#formAdicao'),
    listaFrases = document.querySelector('#listaItens');

// Aqui, adicionados os eventos a determinados elementos
formAdicao.addEventListener('submit', adicionarItem);
window.addEventListener('load', carregarItens); // Ao carregar a página, buscamos a lista

/**
 * Carrega os itens da lista
 */
function carregarItens() {
    var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                var listaRetornada = JSON.parse(this.responseText);
                for (var i in listaRetornada) {
                    var itemAdicionar = {
                        frase: listaRetornada[i].frase
                    }

                    inserirNaLista(itemAdicionar);
                }
            }
        };

        xhttp.open("GET", './list.json', true);
        xhttp.send();
}

/**
 * Adiciona um novo item na lista de frases
 * @param {Object} event 
 */
function adicionarItem(event) {
    event.preventDefault(); // Caso contrário, a página será recarregada com o envio do post
    
    var itemAdicionar = {
        frase: campoFrase.value
    }
    // Se foi definida alguma frase pelo usuário
    if (itemAdicionar.frase) {
        inserirNaLista(itemAdicionar);
        campoFrase.value = ""; // Limpa campo do formulário
    }
}

/**
 * Insere uma nova frase à lista de frases
 * @param {Object} item 
 */
function inserirNaLista(item) {
    var newListItem = document.createElement('li'); // Aqui, estamos criando um <li> para inserir dentro da lista <ul>
    newListItem.innerText = item.frase;
    listaFrases.appendChild(newListItem);
}