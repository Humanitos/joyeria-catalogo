$(document).ready(function () {
    /* >>> >>> >>> >>> >>> Variables <<< <<< <<< <<< <<< */
    let inicio = $('.item-skin:nth-child(1)');
    let joyas = $('.item-skin:nth-child(2)');
    let contactanos = $('.item-skin:nth-child(3)');
    var sublist = $('.sublist-skin');
    var subitem = $('.subitem-skin');
    let preloader = $('.preloader-container-structure');

    /* >>> >>> >>> >>> >>> Eventos <<< <<< <<< <<< <<< */
    inicio.click(function () {
        preloader.fadeIn(300);
        setTimeout(function () {
            $('.card-skin').fadeIn();
        }, 400);
        setTimeout(function () {
            preloader.fadeOut(300);
        }, 600);
    });

    joyas.hover(function () {
        sublist.fadeIn(300);
    }, function () {
        sublist.fadeOut(100);
    }
    );

    $('.sublist-structure').click(function () {
        setTimeout(function () {
            let subitems = $('.subitem-structure');
            subitems.each(function () {
                if ($(this).css('color') !== 'rgb(76, 76, 76)') {
                    //texto en minusculas
                    let text = $(this).text().toLowerCase();
                    categoryRequest(text);
                }
            });
        }, 300);
    });

    contactanos.click(function () {
        //Scroll al final de la pantalla
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 1000);
    });

    /* >>> >>> >>> >>> >>> Funciones <<< <<< <<< <<< <<< */
    function productsRequest() {
        var categorias = [];
        $.ajax({
            url: 'https://speechless-wines.000webhostapp.com/joyeria/mostrar-productos.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let products = data;
                let productsContainer = $('.products-structure');
                productsContainer.html('');
                for (let i = 0; i < products.length; i++) {
                    let card = $('<div class="card-structure card-skin ' + products[i].categoria + '"></div>');
                    let image = $('<img src="' + products[i].imagen + '" class="image-structure image-skin"></img>');
                    let decoration = $('<div class="decoration-structure decoration-skin"></div>');
                    let separator = $('<hr class="separator-structure separator-skin"></hr>');
                    let diamond = $('<div class="diamond-structure diamond-skin"></div>');
                    let separator2 = $('<hr class="separator-structure separator-skin"></hr>');
                    let title = $('<h2 class="title-structure title-skin">' + products[i].nombre + '</h2>');
                    let material = $('<h2 class="material-structure material-skin">' + products[i].material + '</h2>');
                    let price = $('<h2 class="precio-structure precio-skin">' + products[i].precio + '$</h2>');
                    card.append(image);
                    card.append(decoration);
                    decoration.append(separator);
                    decoration.append(diamond);
                    decoration.append(separator2);
                    card.append(title);
                    card.append(material);
                    card.append(price);
                    let subitemUpper = subitem.text().charAt(0).toUpperCase() + subitem.text().slice(1);
                    subitem.text(subitemUpper);
                    $('.sublist-skin').append(subitem);
                    productsContainer.append(card);
                    categorias.push(products[i].categoria);
                    preloader.fadeOut(300);
                }
                showCategory(categorias);
            },
            error: function (error) {
                console.log(error);
                preloader.fadeOut(300);
            }
        });
    }

    function categoryRequest(category) {

        preloader.fadeIn(300);

        setTimeout(() => {
            $('.card-skin').each(function () {
                if (!$(this).hasClass(category)) {
                    $(this).fadeOut(300);
                }
            });
            $('.card-skin').each(function () {
                if ($(this).hasClass(category)) {
                    $(this).fadeIn(300);
                }
            });
        }, 400);

        setTimeout(() => {
            preloader.fadeOut(300);
        }, 1000);

    }
    
    function showCategory(categorias) {
        let sublist = $('.sublist-skin');
        sublist.html('');
        
        let unique = categorias.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        
        unique.sort();
        
        for (let i = 0; i < unique.length; i++) {
            //Primera letra mayuscula
            let subitemUpper = unique[i].charAt(0).toUpperCase() + unique[i].slice(1);
            let subitem = $('<div class="subitem-structure subitem-skin">' + subitemUpper + '</div>');
            sublist.append(subitem);
        }
    }

    /* >>> >>> >>> >>> >>> Inicializacion <<< <<< <<< <<< <<< */
    productsRequest();

});