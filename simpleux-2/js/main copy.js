// document.addEventListener('DOMContentLoaded', function () {
window.addEventListener('load', function () {
    // document.addEventListener('DOMContentLoaded', function () {

    //     var menuBehaviors = document.querySelectorAll('.menu-behavior');

    //     [].forEach.call(document.querySelectorAll('.menu-toggler'), function (el) {
    //         el.addEventListener('click', function (event) {
    //             menuBehaviors.forEach(function (menuBehavior) {
    //                 menuBehavior.classList.toggle('menu-visible');
    //             });
    //             event.preventDefault();
    //         });
    //     });

    //     // close menu when a link is clicked fo example
    //     [].forEach.call(document.querySelectorAll('.menu-close'), function (el) {
    //         el.addEventListener('click', function (event) {
    //             menuBehaviors.forEach(function (menuBehavior) {
    //                 menuBehavior.classList.remove('menu-visible');
    //             });
    //         });
    //     });
    // });

    // behavior when main menu is visible or hidden
    let menuCollapse = document.getElementById('navbarMenuCollapse');
    menuCollapse.addEventListener('shown.bs.collapse', function () {
        document.body.classList.add('menu-visible');
    });
    menuCollapse.addEventListener('hidden.bs.collapse', function () {
        document.body.classList.remove('menu-visible');
    });

    /* document.addEventListener("scroll", function () {
        // add scrolled class to body if document is scrolled
        if (window.pageYOffset > 4 ) {
            if (!document.body.classList.contains('scrolled')){
                document.body.classList.add('scrolled');
            }
        } else{
            document.body.classList.remove('scrolled');
        }
    }) */
    var prevScrollpos = window.pageYOffset;
    var pageHeader = document.querySelector('.navbar-top');
    window.addEventListener("scroll", function () {
        // window.onscroll = function() {
        // toggle hide-header class of header on scoll down or up
        var currScrollpos = window.pageYOffset;
        if (currScrollpos > prevScrollpos && currScrollpos > 64) {
            if (!pageHeader.classList.contains('hide-header')) {
                pageHeader.classList.add('hide-header');
            };
        } else {
            pageHeader.classList.remove('hide-header');
        }
        prevScrollpos = window.pageYOffset;

        // add scrolled class to body if document is scrolled
        if (window.pageYOffset > 4) {
            if (!document.body.classList.contains('scrolled')) {
                document.body.classList.add('scrolled');
            }
        } else {
            document.body.classList.remove('scrolled');
        }
    });


    // custom vh (viewport height) unit to fix on resize or scroll on mobile
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener("resize", function () {
        // update on resize
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
    // Slider
    let swiperSliderSimpleA = new Swiper('.slider-simple-a.swiper-container', {
        // var swiperSliderSimpleA = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-container.slider-simple-a .slider-next',
            prevEl: '.swiper-container.slider-simple-a .slider-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
        },
        spaceBetween: 160,
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 600,
        // centeredSlidesBounds: true,
    });

    let swiperSliderSimpleB = new Swiper('.slider-simple-b.swiper-container', {
        // navigation: {
        //     nextEl: '.swiper-container.slider-simple-b .slider-next',
        //     prevEl: '.swiper-container.slider-simple-b .slider-prev',
        // },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
        },
        effect: 'fade',
    });

    
    var scrollContainer = document.querySelector('.scroll-simple-a');
    if (scrollContainer.offsetHeight > 0) {
        var horizScrolWrap = scrollContainer.querySelector('.scroll-wrapper');
        const slides= horizScrolWrap.querySelectorAll('.scroll-slide');

        horizScrolWrap.style.paddingLeft = `${window.innerWidth/2 - slides[0].offsetWidth/2}px`;
        
        var sticky = document.querySelector('.scroll-simple-a .scroll-sticky');
        scrollContainer.style.height = `${comuteDynamicHeight(horizScrolWrap)}px`;
        repositionSlider(sticky);
        speedTransformOfSlides(slides, sticky.offsetTop);
        const animSlides = []
        slides.forEach(function(slide) {
            let animElements = {}
            let speed1 = slide.querySelector('.speed-1');
            if (speed1) {
                animElements.speed1 = speed1
            }
            let speed2 = slide.querySelector('.speed-2');
            if (speed2) {
                animElements.speed2 = speed2
            }
            let speed3 = slide.querySelector('.speed-3');
            if (speed3) {
                animElements.speed3 = speed3
            }
            animSlides.push(slide)
        });
        console.log(animSlides)
        window.addEventListener('scroll', () => {
            let distance = sticky.offsetTop;
            horizScrolWrap.style.transform = `translateX(${-distance}px)`;
            speedTransformOfSlides(slides, distance);
        });
        window.addEventListener('resize', () => {
            scrollContainer.style.height = `${comuteDynamicHeight(horizScrolWrap)}px`;
            stickyScrollTop = (window.innerHeight - horizScrolWrap.offsetHeight) / 2;
            repositionSlider(sticky);
        });

        // reposition slider sticky top value
        function repositionSlider(slider) {
            let horizScrolWrapTemp = scrollContainer.querySelector('.scroll-wrapper');
            slider.style.top = `${(window.innerHeight - horizScrolWrapTemp.offsetHeight) / 2}px`;
        }
        // compute slider total height for scroll
        function comuteDynamicHeight(ref) {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const objectWidth = ref.scrollWidth;
            return objectWidth - vw + vh + 160;
        }

        // compute here transform (position,scale) of each slide speed-X element
        function speedTransformOfSlides(slides, distance) {
            slides.forEach(function (slide) {
                // console.log(slide)
                // translate position
                let moveOrigin =  distance - slide.offsetLeft - slide.offsetWidth/2 + window.innerWidth/2;
                let speed1 = slide.querySelector('.speed-1');
                if (speed1) {
                    let move = -moveOrigin*0.05  ;
                    speed1.style.transform = `translateX(${move}px)`;
                }
                let speed2 = slide.querySelector('.speed-2');
                if (speed2) {
                    let move = -moveOrigin*0.1  
                    speed2.style.transform = `translateX(${move}px)`;
                }
                let speed3 = slide.querySelector('.speed-3');
                if (speed3) {
                    let move = moveOrigin*0.1 
                    speed3.style.transform = `translateX(${move}px)`;
                }

                // scale position
                let scaleOrigin =  (distance - slide.offsetLeft - slide.offsetWidth/2 + window.innerWidth/2) / (window.innerWidth/2);
                // console.log(Math.abs(scaleOrigin))
                scaleOrigin = Math.pow(scaleOrigin,2)
                // scaleOrigin = Math.abs(scaleOrigin)
                let scale1 = slide.querySelector('.scale-1');
                if (scale1) {
                    let scale = scaleOrigin * 0.15;
                    scale = scale > 1 ? 1 : scale
                    scale1.style.transform = `scale(${1-scale})`;
                }
                let scale2 = slide.querySelector('.scale-2');
                if (scale2) {
                    let scale = scaleOrigin * 0.2;
                    scale = scale > 1 ? 1 : scale
                    scale2.style.transform = `scale(${1-scale})`;
                }
            });
        }

       
    }

});