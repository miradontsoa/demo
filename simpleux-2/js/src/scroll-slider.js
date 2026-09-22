

const helpers = {
    propertyCache: {},
    vendors: [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']],

    clamp(value, min, max) {
        return min < max
            ? (value < min ? min : value > max ? max : value)
            : (value < max ? max : value > min ? min : value)
    },

    data(element, name) {
        return helpers.deserialize(element.getAttribute('data-' + name))
    },

    deserialize(value) {
        if (value === 'true') {
            return true
        } else if (value === 'false') {
            return false
        } else if (value === 'null') {
            return null
        } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value)
        } else {
            return value
        }
    },
}

const END_MARGIN = 160,
    DEFAULTS = {
        speed1Multiplier = 0.05,
        speed2Multiplier = -0.1,
        speed3Multiplier = 0.1,
        scale1Multiplier = 0.15,
        scale1Multiplier = 0.2,
    }

class ScrollSlider {
    constructor(element, options) {
        this.element = element
        const data = {
            slideClass: helpers.data(this.element, 'scroll-slide')
        }

        for (let key in data) {
            if (data[key] === null) {
                delete data[key]
            }
        }

        objectAssign(this, DEFAULTS, data, options)

        // main var
    }

    initialise() {
        
    }
}

// scroll slider
var scrollSliderContainer = document.querySelector('.scroll-simple-a');
if (scrollSliderContainer && window.innerWidth > 576) {
    // slide scroll effects on desktop or ipad only
    var horizScrolWrap = scrollSliderContainer.querySelector('.scroll-wrapper');
    const slides = horizScrolWrap.querySelectorAll('.scroll-slide');

    horizScrolWrap.style.paddingLeft = `${window.innerWidth / 2 - slides[0].offsetWidth / 2}px`;

    var sticky = document.querySelector('.scroll-simple-a .scroll-sticky');
    scrollSliderContainer.style.height = `${comuteDynamicHeight(horizScrolWrap)}px`;
    repositionSlider(sticky);
    const animElements = []
    slides.forEach(function (slide) {
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
        animElements.push(animElement)
    });
    // console.log(animSlides)
    animateElements(animElements, sticky.offsetTop);
    window.addEventListener('scroll', function () {
        let distance = sticky.offsetTop;
        let scrollPosition = window.pageYOffset;
        if (
            scrollPosition > (scrollSliderContainer.offsetTop + window.innerHeight / 2) &&
            scrollPosition < (scrollSliderContainer.offsetTop + scrollSliderContainer.offsetHeight + window.innerHeight / 2)
        ) {
            horizScrolWrap.style.transform = `translateX(${-distance}px)`;
            animateElements(animElements, distance);
        }
        // horizScrolWrap.style.transform = `translateX(${-distance}px)`;
        // animateElements(animElements, distance);
    });
    window.addEventListener('resize', function () {
        scrollSliderContainer.style.height = `${comuteDynamicHeight(horizScrolWrap)}px`;
        stickyScrollTop = (window.innerHeight - horizScrolWrap.offsetHeight) / 2;
        repositionSlider(sticky);
    });

    // reposition slider sticky top value
    function repositionSlider(slider) {
        let horizScrolWrapTemp = scrollSliderContainer.querySelector('.scroll-wrapper');
        let topPos = (window.innerHeight - horizScrolWrapTemp.offsetHeight) / 2;
        topPos = topPos > 0 ? topPos : 0;
        slider.style.top = `${topPos}px`;
    }
    // compute slider total height for scroll
    function comuteDynamicHeight(ref) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const objectWidth = ref.scrollWidth;
        return objectWidth - vw + vh + 160;
    }

    // compute here transform (position,scale) of each slide speed-X, scale-X element
    function animateElements(animElements, distance) {
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


}