"use strict";

window.addEventListener('load', function () {

    //1. behavior when main menu is visible or hidden
    var menuCollapse = document.getElementById('sidebar-left');
    menuCollapse.addEventListener('shown.bs.collapse', function () {
        document.body.classList.add('menu-visible');
    });
    menuCollapse.addEventListener('hidden.bs.collapse', function () {
        document.body.classList.remove('menu-visible');
    });

    var bsCollapse = new bootstrap.Collapse(menuCollapse, {
        toggle: false
    });
    //close menu when a link is clicked fo example
    [].forEach.call(document.querySelectorAll('#sidebar-left a'), function (el) {
        el.addEventListener('click', function (event) {
            bsCollapse.hide();
        });
    });

});