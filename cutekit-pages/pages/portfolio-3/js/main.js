// menu toggler
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

// Scrolling behaviors
var scrollBehaviors = document.querySelectorAll('.scroll-behavior');
document.addEventListener('scroll', function(){
    var scrollPosition = window.pageYOffset;
    // var scrollPosition = document.body.scrollTop;
    if (scrollPosition > 100) {
        scrollBehaviors.forEach(function(scrollBehaviorElem) {
            scrollBehaviorElem.classList.add('scrolled');
        });
    } else {
        scrollBehaviors.forEach(function(scrollBehaviorElem) {
            scrollBehaviorElem.classList.remove('scrolled');
        });
        // scrollBehaviors.classList.remove('scrolled');
    }
})

// Slider
var swiperSliderSuperA = new Swiper('.slider-super-c.swiper-container', {
    // var swiperSliderSuperA = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-container.slider-super-c .slider-next',
        prevEl: '.swiper-container.slider-super-c .slider-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: 5000,
});
console.log('start slider');