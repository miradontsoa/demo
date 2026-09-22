'use strict';

// Init all plugin when document is ready 
$(document).on('ready', function() {
	// 0. Init console to avoid error
	var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
	
	
	// 1. Background image as data attribut 
	var list = $('.bg-img');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-image-src');
		list[i].style.backgroundImage = "url('" + src + "')";
		list[i].style.backgroundRepeat = "no-repeat";
		list[i].style.backgroundPosition = "center";
		list[i].style.backgroundSize = "cover";
	}
	// Background color as data attribut
	var list = $('.bg-color');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-bgcolor');
		list[i].style.backgroundColor = src;
	}

	
	// 2. Init Coutdown clock
	try{
		// check if clock is initialised
		$('.clock-countdown').downCount({
			date: $('.site-config').attr('data-date'),
			offset: +10
		});
	}
	catch(error){
	  // Clock error : clock is unavailable
		console.log("clock disabled/unavailable");
	}
	
    // 3. Show/hide menu when icon is clicked
    var menuItems = $('.page-menu');
    var menuIcon = $('.menu-icon,#menu-link');
    // Menu icon clicked
    menuIcon.on('click', function () {
        if (menuIcon.hasClass('menu-visible')) {
            menuIcon.removeClass('menu-visible');
        } else {
            menuIcon.addClass('menu-visible');
        }
        if (menuItems.hasClass('menu-visible')) {
            menuItems.removeClass('menu-visible');
        } else {
            menuItems.addClass('menu-visible');
        }
        return false;
    });
    // Hide menu after a menu item clicked
    $(".page-menu a").on('click',function(){
        if (menuItems.hasClass('menu-visible')) {
            menuIcon.removeClass('menu-visible');
            menuItems.removeClass('menu-visible');
        }
        return true;
    });

	// 4. Init Slideshow background 
	var imageList = $('.slide-show .img');
	var imageSlides = [];
	for (var i = 0; i < imageList.length; i++) {
		var src = imageList[i].getAttribute('data-src');
		imageSlides.push({src: src});
	}
	$('.slide-show').vegas({
        delay: 5000,
        shuffle: true,
        slides: imageSlides,
		animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
    });
	
	// 5. Init video background
	$('.video-container video, .video-container object').maximage('maxcover');
	
	// 6. Products/Projects/items slider
	var swiper = new Swiper('.items-slide', {
        pagination: '.items-pagination',
        paginationClickable: '.items-pagination',
        nextButton: '.items-button-next',
        prevButton: '.items-button-prev',
		grabCursor: true,
        slidesPerView: '2',
        centeredSlides: false,
        spaceBetween: 64,
		breakpoints: {
            1024: {
                slidesPerView: 2,
            },
            800: {
                slidesPerView: 2,
                spaceBetween: 32
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 32
            },
            440: {
                slidesPerView: 1,
                spaceBetween: 32
            }
        }
    });
  
    // 7. Init fullPage.js plugin
	var pageSectionDivs = $('.fullpg .section');
	var headerLogo = $('.header-top .logo');
	var bodySelector = $('body');
	var sectionSelector = $('.section');
	var slideElem = $('.slide');
	var arrowElem = $('.p-footer .arrow-d');
	var pageElem = $('.section');
	var pageSections = [];
	var pageAnchors = [];
	var nextSectionDOM;
	var nextSection;
	var fpnavItem;
	var mainPage = $('#mainpage');
	// Get sections name
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function(pageSection , cb){
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function(err){
		// Init plugin
		if(mainPage.height()){
			// config fullpage.js
			mainPage.fullpage({
				menu: '#qmenu',
				anchors: pageAnchors,
				responsiveWidth: 601,
				scrollOverflow: true,
				verticalCentered: true,
				css3: true,
				navigation: true,
				onLeave: function(index, nextIndex, direction){
                	// Behavior when a full page is leaved
					arrowElem.addClass('gone');
					pageElem.addClass('transition');
					slideElem.removeClass('transition');
					pageElem.removeClass('transition');
					
					nextSectionDOM = sectionSelector[(nextIndex-1)];
					nextSection = $(nextSectionDOM);
					if(nextSection.hasClass('dark-bg')){
						bodySelector.addClass('dark-section');
						headerLogo.addClass('dark-bg');
					}
					else{
						bodySelector.removeClass('dark-section');
						headerLogo.removeClass('dark-bg');
					}
				},
				afterLoad: function(anchorLink, index){
					// Behavior after a full page is loaded
					// manage dark bg for active section
					if ($('.section.active').hasClass('js-left-light')) {
						bodySelector.addClass('left-light');
						headerLogo.addClass('dark-bg');
					} else {
						bodySelector.removeClass('left-light');
						headerLogo.removeClass('dark-bg');
					}

					//set text value of fpnav
					fpnavItem = $("#fp-nav ul li a.active");
					if (!fpnavItem.children("span").hasClass("title")) {
						// Init text content
						fpnavItem.append('<span class="title">' + $(".section.active .page-title").text() +
							'</span>')
					}
				}
			});
			
		}
	});
    // Scroll to fullPage.js next/previous section
    $('.s-footer a.down').on('click', function () {
        $.fn.fullpage.moveSectionDown();
    });
    $('.s-footer a.up').on('click', function () {
        $.fn.fullpage.moveSectionUp();
    });
});


// Page Loader : hide loader when all are loaded
$(window).on('load', function(){
    $('#page-loader').addClass('p-hidden');
	$('.section').addClass('anim');
});
