document.addEventListener('DOMContentLoaded', function () {

    var menuBehaviors = document.querySelectorAll('.menu-behavior');

    [].forEach.call(document.querySelectorAll('.menu-toggler'), function (el) {
        el.addEventListener('click', function (event) {
            menuBehaviors.forEach(function (menuBehavior) {
                menuBehavior.classList.toggle('menu-visible');
            });
            event.preventDefault();
        });
    });

    // close menu when a link is clicked fo example
    [].forEach.call(document.querySelectorAll('.menu-close'), function (el) {
        el.addEventListener('click', function (event) {
            menuBehaviors.forEach(function (menuBehavior) {
                menuBehavior.classList.remove('menu-visible');
            });
        });
    });

    // Rellax parallax
    try {
        var rellax = new Rellax('.rellax');
    } catch (error) {
        console.log('rellax-js not available')
    }
});

document.addEventListener("scroll", function () {
    // add scrolled class to body if document is scrolled
    if (window.pageYOffset > 4 ) {
        if (!document.body.classList.contains('scrolled')){
            document.body.classList.add('scrolled');
        }
    } else{
        document.body.classList.remove('scrolled');
    }
})


// Slider
var swiperSliderSuperA = new Swiper('.slider-super-a.swiper-container', {
    // var swiperSliderSuperA = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-container.slider-super-a .slider-next',
        prevEl: '.swiper-container.slider-super-a .slider-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: 5000,
});
console.log('start slider A');

var swiperSliderSuperB = new Swiper('.slider-super-b.swiper-container', {
    navigation: {
        nextEl: '.swiper-container.slider-super-b .slider-next',
        prevEl: '.swiper-container.slider-super-b .slider-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: 5000,
});
console.log('start slider B');