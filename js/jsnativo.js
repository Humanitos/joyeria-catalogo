/* >>> >>> >>> >>> >>> Variables <<< <<< <<< <<< <<< */
let sublist = document.querySelector('.sublist-structure');
let subitem = document.querySelector('.subitem-skin');
let card = document.querySelector('.card-skin');
let cards = document.querySelectorAll('.card-skin');

let inicio = document.querySelector('.item-skin:nth-child(1)');
let joyas = document.querySelector('.item-skin:nth-child(2)');
let contactanos = document.querySelector('.item-skin:nth-child(3)');

let preloader = document.querySelector('.preloader-container-structure');

/* >>> >>> >>> >>> >>> Funciones <<< <<< <<< <<< <<< */
function hide(element) {
    if (!element.classList.contains('fadeOpacity')) {
        element.classList.add('fadeOpacity');
        setTimeout(() => {
            element.classList.add('fadeDisplay');
        }, 300);
    }
}

function show(element) {
    if (element.classList.contains('fadeOpacity')) {
        element.classList.remove('fadeDisplay');
        setTimeout(() => {
            element.classList.remove('fadeOpacity');
        }, 300);
    }
}

function productsRequest() {
    let categories = [];
    request = new XMLHttpRequest();
    request.open('GET', 'https://tumorserver.ddns.net/joyeria/mostrar-productos.php', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(this.response);
            let productsContainer = document.querySelector('.products-structure');
            productsContainer.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                createCard(data[i].imagen, data[i].nombre, data[i].material, data[i].precio, data[i].categoria);
                if (!categories.includes(data[i].categoria)) {
                    categories.push(data[i].categoria);
                }
            }
            createCategory(categories);
        } else {
            console.log('error');
        }
    };
    request.send();
}

function createCard(image, name, mineral, cost, category) {
    let card = "<div class='card-structure card-skin " + category + "'>";
    let photo = "<img src='" + image + "' class='image-structure image-skin'></img>";
    let decoration = "<div class='decoration-structure decoration-skin'>";
    let separator = "<hr class='separator-structure separator-skin'></hr>";
    let diamond = "<div class='diamond-structure diamond-skin'></div>";
    let separator2 = "<hr class='separator-structure separator-skin'></hr>";
    let title = "<h2 class='title-structure title-skin'>" + name + "</h2>";
    let material = "<h2 class='material-structure material-skin'>" + mineral + "</h2>";
    let price = "<h2 class='price-structure price-skin'>" + cost + "$</h2>";
    decoration += separator + diamond + separator2 + "</div>";
    card += photo + decoration + title + material + price + "</div>";

    let productsContainer = document.querySelector('.products-structure');
    productsContainer.innerHTML += card;
}

function createCategory(categories) {
    sublist.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        let categoryUpper = categories[i].charAt(0).toUpperCase() + categories[i].slice(1);
        let category = "<div class='subitem-structure subitem-skin'>" + categoryUpper + "</div>";
        sublist.innerHTML += category;
    }
}

function selectCards(category){
    let cards = document.querySelectorAll('.card-skin');
    category = category.toLowerCase();
    for(let i = 0; i < cards.length; i++){
        if(cards[i].classList.contains(category)){
            show(cards[i]);
        }
        if(!cards[i].classList.contains(category)){
            hide(cards[i]);
        }
        
    }
}

/* >>> >>> >>> >>> >>> Eventos <<< <<< <<< <<< <<< */
window.addEventListener('load', function () {
    this.setTimeout(function () {
        hide(preloader);
    }, 2000);
});

inicio.addEventListener('click', function () {
    show(preloader);
    setTimeout(function () {
        productsRequest();
    }, 400);
    setTimeout(function () {
        hide(preloader);
    }, 1500);
});

joyas.addEventListener('click', function () {
    if(sublist.classList.contains('fadeOpacity')){
        show(sublist);
    }
    if(!sublist.classList.contains('fadeOpacity')){
        hide(sublist);
    }
});

sublist.addEventListener('click', function () {
    show(preloader);
    let subitem = event.target;
    setTimeout(function () {
        selectCards(subitem.innerHTML.toLowerCase());
    }, 700);
    setTimeout(function () {
        hide(preloader);
    }, 1400);
});

contactanos.addEventListener('click', function () {
    window.scrollTo(0, document.body.scrollHeight);
});

productsRequest();
