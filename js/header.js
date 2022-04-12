$(document).ready(function() {

    /* >>> >>> >>> >>> >>> Variables <<< <<< <<< <<< <<< */
    let inicio = $('.item-skin:nth-child(1)');
    let joyas = $('.item-skin:nth-child(2)');
    let contactanos = $('.item-skin:nth-child(3)');

    let sublist = $('.sublist-skin');
    var flag = false;

    /* >>> >>> >>> >>> >>> Funciones <<< <<< <<< <<< <<< */
    function showJewelry() {
    }

    /* >>> >>> >>> >>> >>> Eventos <<< <<< <<< <<< <<< */
    inicio.click(function() {
        //Href to the top of the page
        
    });

    joyas.click(function() {
        
    });

    contactanos.click(function() {
    });

    joyas.hover(function () {
            sublist.fadeIn(300);
        }, function () {
            sublist.fadeOut(100);
        }
    );

});