'use strict';

console.log("Initialization...");

var swiperSliderSuperA = new Swiper('.slides-a.swiper-container', {
	// var swiperSliderSuperA = new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.swiper-container.slides-a .slider-next',
			prevEl: '.swiper-container.slides-a .slider-prev',
		},
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		//   dynamicBullets: true,
		},
		slidesPerView: 1,
		loop: true,
		grabCursor: true,
		autoplay: 5000,
		// init: false,
	});
	
// Init all plugin when document is ready 
$(document).on('ready', function () {
	// 0. Init console to avoid error
	var method;
	var noop = function () { };
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});
	var contextWindow = $(window);
	var $root = $('html, body');
	while (length--) {
		method = methods[length];
		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}

	// page behavior
	var fullpageContainer = $('.fullpage-container');
 
	// 3. Show/hide menu when icon is clicked
	var menuItems = $('.all-menu-wrapper .nav-link');
	var menuIcon = $('.menu-icon, #navMenuIcon');
	var menuBlock = $('.all-menu-wrapper');
	var reactToMenu = $ ('.page-main, .navbar-sidebar, .page-cover, .body-page');
	var menuLinks = $(".navbar-mainmenu a, .navbar-sidebar a, .navbar-nav-menu a");
	var menuBg = $(".navbar-mainmenu .mainmenu-bg");
	// Menu icon clicked
	menuIcon.on('click', function () {
		menuIcon.toggleClass('menu-visible');
		menuBlock.toggleClass('menu-visible');
		menuItems.toggleClass('menu-visible');
		reactToMenu.toggleClass('menu-visible');
		return false;
	});

	// Hide menu after a menu item clicked
	menuLinks.on('click', function () {
		menuIcon.removeClass('menu-visible');
		menuBlock.removeClass('menu-visible');
		menuItems.removeClass('menu-visible');
		reactToMenu.removeClass('menu-visible');
		return true;
	});

	// Hide menu after menu bg clicked
	menuBg.on('click', function () {
		menuIcon.removeClass('menu-visible');
		menuBlock.removeClass('menu-visible');
		menuItems.removeClass('menu-visible');
		reactToMenu.removeClass('menu-visible');
		return true;
	});

	// 4 Slideshow / Slider

	// Slider Alpha : Projects slider
	/* var swiperSliderSuperA = new Swiper('.slides-a.swiper-container', {
		// var swiperSliderSuperA = new Swiper('.swiper-container', {
			navigation: {
				nextEl: '.swiper-container.slides-a .slider-next',
				prevEl: '.swiper-container.slides-a .slider-prev',
			},
			pagination: {
			  el: '.swiper-pagination',
			  clickable: true,
			//   dynamicBullets: true,
			},
			slidesPerView: 1,
			loop: true,
			grabCursor: true,
			autoplay: 5000,
			// init: false,
		}); */
	// var sliderAlphaInit = function () {
	// 	if ($('.slides-a.swiper-container').length) {
	// 		sliderAlpha.init();
	// 	}
	// }
	// sliderAlphaInit();
	
	/* // 7. Contact form
	var showInfoBtn = $('.show-contact-information');
	var showMessageBtn = $('.show-contact-message');
	var contactSwiper = new Swiper('.slider-swiper-contact .swiper-container', {
		grabCursor: true,
		centeredSlides: false,
		autoplay: 0,
		autoplayDisableOnInteraction: false,
		slidesPerView: 1,
		spaceBetween: 16,
		autoHeight: true,
		effect: 'slide',
	});

	showMessageBtn.on('click', function () {
		contactSwiper.slideTo($('.contact-message-slide').index(), 300, false);
		return false;
	});
	showInfoBtn.on('click', function () {
		contactSwiper.slideTo($('.contact-information-slide').index(), 300, false);
		return false;
	});
	// init contact form
	// Default server url
	var newsletterServerUrl = './ajaxserver/serverfile.php';
	var messageServerUrl = './ajaxserver/serverfile.php';

	var sendEmailForm = $('.send_email_form');
	var sendMessageForm = $('.send_message_form');
	// Use form define action attribute
	if (sendEmailForm.attr('action') && (sendEmailForm.attr('action')) != '') {
		newsletterServerUrl = sendEmailForm.attr('action');
	}
	if (sendMessageForm.attr('action') && (sendMessageForm.attr('action') != '')) {
		messageServerUrl = sendMessageForm.attr('action');
	}

	sendEmailForm.initForm({
		serverUrl: newsletterServerUrl,
	});
	sendMessageForm.initForm({
		serverUrl: messageServerUrl,
	});
	 */

	// 8. Prepare content for animation
	$('.section .content .anim.anim-wrapped').wrap("<span class='anim-wrapper'></span>");

	 
	// Scroll to  next/previous section
	$('.scrolldown a, .scroll.down').on('click', function () {
		contextWindow.scrollTop(window.innerHeight);

	});
	$('.scroll.up').on('click', function () {
		contextWindow.scrollTop(-window.innerHeight);
		$root.animate({
				scrollTop: window.innerHeight
			}, 400, function () {
		});
	});

	// 9. Scrolling animation
	var scrollHeight = $(document).height() - contextWindow.height();
	var siteSections = $('.scroll-anim .section');
	contextWindow.on('scroll', function () {
		var scrollpos = $(this).scrollTop();
		var siteHeaderFooter = $('.page-footer, .page-header, .page-cover');
		// if (scrollpos > 10 && scrollpos < scrollHeight - 100) {
		// hide some ui on scroll
		if (scrollpos > 100) {
			siteHeaderFooter.addClass("scrolled");
		}
		else {
			siteHeaderFooter.removeClass("scrolled");
		}
		// sections animations
		siteSections.each(function(i, el) {
			var el = $(el);
			if (el.visible(true)) {
				el.addClass("active"); 
			}
		});
	});
	
	// 9. Page Loader : hide loader when all are loaded
	contextWindow.on('load', function () {
		$('#page-loader').addClass('p-hidden');
		$('.section').addClass('anim');
		$('.scrollpage-container .section-home').addClass('active');
		
		siteSections.each(function(i, el) {
			var el = $(el);
			if (el.visible(true)) {
				el.addClass("active"); 
			} 
		});
	});

});

