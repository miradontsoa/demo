"use strict";

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
    var menuCollapse = document.getElementById('navbarMenuCollapse');
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
    [].forEach.call(document.querySelectorAll('#navbarMenuCollapse a'), function (el) {
        el.addEventListener('click', function (event) {
            bsCollapse.hide();
        });
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

    // Gallery Slider
    let swiperSliderGalleryA = new Swiper('.slider-gallery-a.swiper-container', {
        navigation: {
            nextEl: '.swiper-container.slider-gallery-a .slider-next',
            prevEl: '.swiper-container.slider-gallery-a .slider-prev',
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
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 0,
        effect: 'fade',
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

    //6. Scroll slider
    
    try {
        var scrollSlider = new ScrollSlider('.scroll-simple-a', {
            scale1: 0.1
        });
        scrollSlider.init();

        //7. Section Scroller
        var sectionScroller = new SectionScroll('.sections-scroll ', {
            sectionClass: 'section',
            navDotContainer :'.nav-dot-menu',
            changeOnSectionColor: '.change-on-section-color, .nav-dot-menu .nav-link'
        });
        sectionScroller.init();
    }
    catch (error) {
        console.log('scroll-slider not available')
    }

    //8. Cursor parallax 
    /* var parallaxCover = document.querySelector('#parallax-hero-cover')
    if (parallaxCover) {
        var parallaxInstance = new Parallax(parallaxCover);
        // if (window.innerWidth > 768) {
        //     var parallaxInstance = new Parallax(parallaxCover);
        // }
    } */
    // Rellax parallax
    try {
        var rellax = new Rellax('.rellax');
    } catch (error) {
        console.log('rellax-js not available')
    }

    // add animation when element is visible on screen
    if (!!window.IntersectionObserver) {
        let observer;
        let options = {
            root: null,
            // rootMargin: "0px",
            rootMargin: "0px 0px -48px 0px",
            // threshold: [0.2, 0.8]
            // threshold: [0.25, 0.5, 1]
            threshold: [0.15, 0.5, 1]
        }
        let observerFunction = function observerFunction (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // console.log(entry);
                    entry.target.classList.add('anim-visible');
                    observer.unobserve(entry.target);
                }
            })
        }
        observer = new IntersectionObserver(observerFunction, options);
        document.querySelectorAll('.scroll-anim [data-anim-visible]').forEach(element => {
            element.classList.add('anim-ready');
            observer.observe(element);
        });
    }

    // text char by char animation
    if (window.innerWidth > 768 && !!window.IntersectionObserver) {
        let byCharElts = document.querySelectorAll('.anim-by-char, [data-anim-visible="by-letter"]');
        byCharElts.forEach(byCharElt => {
            // let lines = byCharElt.innerText.split('\n');
            let animBegin = 0.0;
            if (byCharElt.getAttribute('data-anim-start')) {
                animBegin = parseFloat(byCharElt.getAttribute('data-anim-start'))
            }
            let animLetterParam = 0.02;
            if (byCharElt.getAttribute('data-anim-letter-delay')) {
                animLetterParam = parseFloat(byCharElt.getAttribute('data-anim-letter-delay'))
            }
            let animLineParam = 0.15;
            if (byCharElt.getAttribute('data-anim-line-delay')) {
                animLineParam = parseFloat(byCharElt.getAttribute('data-anim-line-delay'))
            }
            console.log(animLineParam)
            let lines = byCharElt.childNodes;
            lines.forEach((line, lineIndex) => {
                if (line.tagName !== 'BR') {
                    let lineNode = document.createElement('span');
                    lineNode.classList.add('line');
                    // let chars = line.split('');
                    let letters = line.textContent.trim().replace(/(\r\n|\n|\r|\t)/g," ").replace(/  +/g," ").trim().split('');
                    let beginLine = (lineIndex - 1) * animLineParam
                    letters.forEach((letter, letterIndex) => {
                        let letterNode = document.createElement('span');
                        letterNode.classList.add('letter');
                        letterNode.innerText = letter;
                        let animDelay = (animBegin + beginLine - animLetterParam) + letterIndex*animLetterParam + 0.2;
                        letterNode.style.transitionDelay = `${animDelay}s`
                        lineNode.appendChild(letterNode)
                    })
                    line.replaceWith(lineNode)
                }
            })
        })
	}

    // Custom Scroll parallax
    var parallaxElements = document.querySelectorAll('[data-prl]');
    parallaxElements.forEach(function (parallaxElement, index) {
        parallaxElement.style['will-change'] = `transform`
        if (_isVisible(parallaxElement)) {
            _computeParallaxPosition(parallaxElement)
        }
        window.addEventListener('scroll', function (e) {
            if (_isVisible(parallaxElement)) {
                _computeParallaxPosition(parallaxElement)
            }
        });
    });
    function _computeParallaxPosition(element) {
        let rtop = element.getBoundingClientRect().top
        let rbottom = element.getBoundingClientRect().bottom

        // y will be the element center
        let y = rtop + Math.abs(rbottom - rtop) / 2
        let vh = window.innerHeight
        // distance from center of the screen
        let distance = (y - vh / 2) / (vh / 2)
        let speedY = parseFloat(element.getAttribute('data-prl-speed-y')) || 0
        let speedX = parseFloat(element.getAttribute('data-prl-speed-x')) || 0
        let scaleCoeff = parseFloat(element.getAttribute('data-prl-scale')) || 0


        // if speed is set, valid and non null
        let refWidth = 0.25 * window.innerWidth
        let refHeight = 0.25 * vh
        let sMax = 1;

        let scaleValue = 0.5 *sMax * distance * scaleCoeff + 1
        let translateX = speedX ? `translateX(${distance * speedX * refWidth}px)` : ''
        let translateY = speedY ? `translateY(${distance * speedY * refHeight}px)` : ''
        let scale = scaleCoeff ? `scale(${scaleValue })` : ''
        // let scale = ''

        element.style.transform = `${translateY} ${translateX}  ${scale}`
    }
    function _isVisible(element) {
        let ltop = element.getBoundingClientRect().top
        let lbottom = element.getBoundingClientRect().bottom
        let topVisible = false
        let bottomVisible = false
        let wh = window.innerHeight;
        let padding = wh / 3
        // if (ltop < window.innerHeight && ltop > 0) {
        if (ltop < wh + padding && ltop + padding > 0) {
            // top is visible
            topVisible = true
        }
        if (lbottom < wh + padding && lbottom + padding > 0) {
            // bottom is visible
            bottomVisible = true
        }
        return topVisible || bottomVisible
    }

});

window.addEventListener('load', function () {
    // document loaded, hide loading screen
    var pageLoader = document.querySelector('#page-loader');
    if (pageLoader) {
        pageLoader.classList.add('p-hidden');
    }
    document.body.classList.add('page-loaded');
    // $('#page-loader').addClass('p-hidden');
    // $('.section').addClass('anim');
    // $('.scrollpage-container .section-home').addClass('active');
    // siteHeaderFooter.removeClass('loading-anim');
});