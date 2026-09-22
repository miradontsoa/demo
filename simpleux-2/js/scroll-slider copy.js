/**
 * Scroll Slider
 * ------------
 * Version : 1.0
 */

; (function () {
    'use strict'

    var scrollSlider


    class ScrollSlider {
        constructor(element, config) {
            // Support instantiation without the `new` keyword.
            if (typeof this === 'undefined' || Object.getPrototypeOf(this) !== ScrollSlider.prototype) {
                return new ScrollSlider(element, config);
            }

            scrollSlider = this; // Save reference to instance.
            scrollSlider.version = '1.0';

            // scrollSlider.defaults.container = _resolveContainer(scrollSlider.defaults);
            scrollSlider.container = _resolveContainer(element);
            // scrollSlider.container = element;
            scrollSlider.initialized = false;

            return scrollSlider;
        }
        init() {
            if (scrollSlider) {
                _init();
            } else {
                console.log('ScrollSlider: initiation failed.');
            }
            return scrollSlider;
        }
    }

        /**
         * Configuration
         * -------------
         * This object signature can be passed directly to the ScrollSlider constructor,
         * or as the second argument of the `reveal()` method.
         */

        ScrollSlider.prototype.defaults = {
        // Starting scale value, will transition from this value to 1
        scale: 0.9,

        // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
        easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',

        // .scroll-slider is the default reveal container. You can pass either:
        // DOM Node, e.g. document.querySelector('.fooContainer') or 
        // Selector, e.g. '.fooContainer'
        container: document.querySelector('.scroll-slider'),

        // speeds and scales multiplier
        speed1: 0.1,
        speed2: -0.1,
        speed3: 0.2,
        scale1: 0.1,
        scale2: -0.1,
        marginEnd: 160,
    }



    /**
     * Private Methods
     */
    function _init() {
        
        console.log('Initiation.');
        // A one-time binding of window event listeners.
        // if (scrollSlider.container && window.innerWidth > 576) {
        // slide scroll effects on desktop or ipad only
        scrollSlider.horizScrolWrap = scrollSlider.container.querySelector('.scroll-wrapper');
        scrollSlider.slides = scrollSlider.horizScrolWrap.querySelectorAll('.scroll-slide');

        
        scrollSlider.sticky = scrollSlider.container.querySelector('.scroll-sticky');
        _repositionSlider(scrollSlider.sticky);
        scrollSlider.animElements = []
        scrollSlider.slides.forEach(function (slide) {
            let animElement = {}
            animElement.slide = slide
            let speed1 = slide.querySelector('.speed-1');
            if (speed1) {
                animElement.speed1 = speed1
            }
            let speed2 = slide.querySelector('.speed-2');
            if (speed2) {
                animElement.speed2 = speed2
            }
            let speed3 = slide.querySelector('.speed-3');
            if (speed3) {
                animElement.speed3 = speed3
            }
            let scale1 = slide.querySelector('.scale-1');
            if (scale1) {
                animElement.scale1 = scale1
            }
            let scale2 = slide.querySelector('.scale-2');
            if (scale2) {
                animElement.scale2 = scale2
            }
            scrollSlider.animElements.push(animElement)
        });
        _animateElements(scrollSlider.animElements, scrollSlider.sticky.offsetTop);
        if (!scrollSlider.initialized) {
            window.addEventListener('scroll', _scrollHandler)
            window.addEventListener('resize', _resizeHandler)
            scrollSlider.initialized = true
        }
        return scrollSlider
    }

    function _scrollHandler() {
        let distance = scrollSlider.sticky.offsetTop;
        let scrollPosition = window.pageYOffset;
        if (
            scrollPosition > (scrollSlider.container.offsetTop + window.innerHeight / 2) &&
            scrollPosition < (scrollSlider.container.offsetTop + scrollSlider.container.offsetHeight + window.innerHeight / 2)
        ) {
            scrollSlider.horizScrolWrap.style.transform = `translateX(${-distance}px)`;
            _animateElements(scrollSlider.animElements, distance);
        }
        // horizScrolWrap.style.transform = `translateX(${-distance}px)`;
        // animateElements(animElements, distance);
    }
    function _resizeHandler() {
        console.log('screen resized')
        // scrollSlider.container.style.height = `${_comuteDynamicHeight(scrollSlider.horizScrolWrap)}px`;
        // scrollSlider.stickyScrollTop = (window.innerHeight - scrollSlider.horizScrolWrap.offsetHeight) / 2;
        // _repositionSlider(scrollSlider.sticky);
        _init()
    }

    function _resolveContainer(container) {
        if (container) {
            if (typeof container === 'string') {
                return window.document.documentElement.querySelector(container)
            } else if (_isNode(container)) {
                return container
            } else {
                console.log('ScrollSlider: invalid container "' + container + '" provided.')
                console.log('ScrollSlider: falling back to default container.')
            }
        }
        return document.querySelector('.scroll-slider')
    }

    // reposition slider sticky top value
    function _repositionSlider(slider) {
        let horizScrolWrapTemp = scrollSlider.container.querySelector('.scroll-wrapper');
        let topPos = (window.innerHeight - horizScrolWrapTemp.offsetHeight) / 2;
        // let topPos = (window.innerHeight - scrollSlider.horizScrolWrap.offsetHeight) / 2;
        scrollSlider.container.style.height = `${_comuteDynamicHeight(scrollSlider.horizScrolWrap)}px`;
        // scrollSlider.container.style.height = `${_comuteDynamicHeight(scrollSlider.horizScrolWrap)}px`;
        scrollSlider.horizScrolWrap.style.paddingLeft = `${window.innerWidth / 2 - scrollSlider.slides[0].offsetWidth / 2}px`;

        topPos = topPos > 0 ? topPos : 0;
        slider.style.top = `${topPos}px`;
    }
    // compute slider total height for scroll
    function _comuteDynamicHeight(ref) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const objectWidth = ref.scrollWidth;
        return objectWidth - vw + vh + 100*vw/vh;
        // return objectWidth - vw + vh + 160;
    }

    // compute here transform (position,scale) of each slide speed-X, scale-X element
    function _animateElements(animElements, distance) {
        animElements.forEach(function (animElement) {
            // console.log(animSlide)
            let slide = animElement.slide
            // translate position
            let moveOrigin = distance - slide.offsetLeft - slide.offsetWidth / 2 + window.innerWidth / 2;
            if (animElement.speed1) {
                let move = -moveOrigin * 0.05;
                animElement.speed1.style.transform = `translateX(${move}px)`;
            }
            if (animElement.speed2) {
                let move = -moveOrigin * 0.1
                animElement.speed2.style.transform = `translateX(${move}px)`;
            }
            if (animElement.speed3) {
                let move = moveOrigin * 0.1
                animElement.speed3.style.transform = `translateX(${move}px)`;
            }

            // scale position
            let scaleOrigin = (distance - slide.offsetLeft - slide.offsetWidth / 2 + window.innerWidth / 2) / (window.innerWidth / 2);
            // console.log(Math.abs(scaleOrigin))
            scaleOrigin = Math.pow(scaleOrigin, 2)
            // scaleOrigin = Math.abs(scaleOrigin)
            // let scale1 = slide.querySelector('.scale-1');
            if (animElement.scale1) {
                let scale = scaleOrigin * 0.15;
                scale = scale > 1 ? 1 : scale
                animElement.scale1.style.transform = `scale(${1 - scale})`;
            }
            // let scale2 = slide.querySelector('.scale-2');
            if (animElement.scale2) {
                let scale = scaleOrigin * 0.2;
                scale = scale > 1 ? 1 : scale
                animElement.scale2.style.transform = `scale(${1 - scale})`;
            }
        });
    }

    /* Utilities */
    function _isNode(object) {
        return typeof window.Node === 'object'
            ? object instanceof window.Node
            : object && typeof object === 'object' &&
            typeof object.nodeType === 'number' &&
            typeof object.nodeName === 'string'
    }


    /**
     * Module Wrapper
     * --------------
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ScrollSlider
    } else {
        window.ScrollSlider = ScrollSlider
    }
    // if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    //     define(function () {
    //         return ScrollSlider
    //     })
    // } else if (typeof module !== 'undefined' && module.exports) {
    //     module.exports = ScrollSlider
    // } else {
    //     window.ScrollSlider = ScrollSlider
    // }
})();
