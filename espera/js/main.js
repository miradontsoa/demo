// Avoid `console` errors in browsers that lack a console.
(function () {
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
}());

/* CSS fixes */
/*$('.menu-nav').css({'margin-top': '250px'});
$('.menu-nav').css({'opacity': 0});
$(document).ready(function() {	
	var marginTop = $(window).height()/2 - $('.logo-container').height() - $('.menu-nav').height()/2 - 50;
	$('.menu-nav').css({'margin-top': marginTop + 'px'});
	$('.menu-nav').css({'opacity': 1});
	//console.log(marginTop+'px');
});*/

/* Background image as data attribut */
var list = $('.bg-img');

for (var i = 0; i < list.length; i++) {
	var src = list[i].getAttribute('data-image-src');
	list[i].style.backgroundImage = "url('" + src + "')";
	list[i].style.backgroundRepeat = "no-repeat";
	list[i].style.backgroundSize = "cover";
	list[i].style.backgroundPosition = "center";
}

/* Animate works section when srcoll */
$(document).ready(function() {
	try{
		$('.works .work .images').addClass("hidden-opacity").viewportChecker({
			classToAdd: 'visible-opacity animated zoomIn', // Class to add to the elements when they are visible
			offset: 100
		   });
		$('.works .work .caption').addClass("hidden-opacity").viewportChecker({
			classToAdd: 'visible-opacity animated zoomIn', // Class to add to the elements when they are visible
			offset: 100
		   });
	}
	catch(err){
		console.log(err);

	}
});

/* Activate menu after clicked */
var menuItemList = $('.menu-nav a');

$('.menu-nav a').click(function(){
	for (var i = 0; i < menuItemList.length; i++) {
		$(menuItemList[i]).removeClass('active');
		//menuItemList[i].removeClass('active');
	}
	/* menuItemList.forEach(function (menuItem) {
		// $(menuItem).addClass('active');
     });*/
	menuItemList = $('.menu-nav a');
	$(this).addClass('active');
});


// Window resized

$(window).on('resize', function () {
	var slideHeight = $('.slick-track').innerHeight();
});




/** Static video background **/
/*$(function(){
        // Helper function to Fill and Center the HTML5 Video
        $('.video-container video, .video-container object').maximage('maxcover');
      });*/
/** youtube / vimeo background */
/*$(function(){
    if(backgroundVideoUrl != 'none'){

        //disable video background for smallscreen
        if($(window).width() > 640){

          $.okvideo({ source: backgroundVideoUrl,
                    adproof: true

                    });
        }
    }
    });*/


/* Smoth scroll a links */
var $root = $('html, body');
$('a.s-scroll').click(function () {
	var href = $.attr(this, 'href');
	// Smooth scrolling
	$root.animate({
		scrollTop: $(href).offset().top
	}, 500, function () {
		window.location.hash = href;
	});

	// Close menu
	$(".menu-left").removeClass("open");
	menuopen = false;

	return false;
});

/* Scroll down */
$('.scroll-down').click(function (event) {
	// Preventing default action of the event
    event.preventDefault();
    // Getting the height of the document
    var n = $(window).height();
	// scroll to top if at bottom
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    	$root.animate({ scrollTop: 0 }, 600);
	}
	// else scroll down
	else{
		$root.animate({ scrollTop: n }, 300);
	}
	return false;
});

/* Animate background at scroll*/
/* fade header element at scroll */
$(document).ready(function () {

	var rotValue = 0;
	var rotValue2 = 0;
	var rotValue;
	var rotValue2;
	var scaleFact;
	var scaleValue;
	var opacityValue;

	$(window).scroll(function () {
		var scrollpos = $(this).scrollTop();


		if ($(this).scrollTop() > -1) {

			// Scroll zoom rotate
			if ($(this).scrollTop() < 1030) {

				rotValue = 0 + $(this).scrollTop() / 40;
				rotValue2 = 0 + $(this).scrollTop() / 2 ;
				scaleFact = 0.002;
//				var scaleFact = 0.0009;
				$('.page-cover .background-cover').css({
					'transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + rotValue2 + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * scaleFact) + ')',
					'-webkit-transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + rotValue2 + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * scaleFact) + ')',
					'-ms-transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + rotValue2 + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * scaleFact) + ')',
					'-moz-transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + rotValue2 + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * scaleFact) + ')',
				});
			}

			$('.page-cover .background-cover.rot-reverse').css({
				'transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + (-1*rotValue2) + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * 0.5*scaleFact) + ')',
				'-webkit-transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + (-1*rotValue2) + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * 0.5*scaleFact) + ')',
				'-ms-transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + (-1*rotValue2) + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * 0.5*scaleFact) + ')',
				'-moz-transform': 'rotateX(' + rotValue + 'deg) rotateZ(' + (-1*rotValue2) + 'deg)' + 'scale(' + (1 + $(this).scrollTop() * 0.5*scaleFact) + ')',
			});
		//	console.log($(window).scrollTop());
			var maxScroll = 2000;
			// Scroll transluscent
			if ($(this).scrollTop() < 150) {
				$('.cover-footer.fade-scroll').removeClass('transluscent');
				$('.cover-footer.fade-scroll').removeClass('invisible');
				$('.cover-footer.fade-scroll').removeClass('scroll-up');
				$('.cover-footer.fade-scroll .scroll-d').removeClass('up');

				$('.cover-footer.fade-scroll .scroll-down .s-down-txt').removeClass('hidden');
				$('.cover-footer.fade-scroll .scroll-down .s-up-txt').addClass('hidden');

			}
			else if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
				$('.cover-footer.fade-scroll').addClass('transluscent');
				$('.cover-footer.fade-scroll .scroll-d').addClass('up');
				$('.cover-footer.fade-scroll').removeClass('invisible');

				$('.cover-footer.fade-scroll .scroll-down .s-down-txt').addClass('hidden');
				$('.cover-footer.fade-scroll .scroll-down .s-up-txt').removeClass('hidden');
		}
			else{
//				$('.cover-footer.fade-scroll').addClass('transluscent');
				$('.cover-footer.fade-scroll').addClass('invisible');

			}
			// Menu transluscent
			if ($(this).scrollTop() < 400) {
				$('.menu-btn').removeClass('scroll');
			} else {
				$('.menu-btn').addClass('scroll');
			}

			// Scroll scale down
			if ($(this).scrollTop() < 1400) {
				scaleFact2 = 0.0009;
				scaleValue = 1 - $(this).scrollTop() * scaleFact2;
				$('.scroll-scale-down').css({
					'transform': 'scale(' + scaleValue + ')',
					'-webkit-transform': 'scale(' + scaleValue + ')',
					'-ms-transform': 'scale(' + scaleValue + ')',
					'-moz-transform': 'scale(' + scaleValue + ')',
				})
			} else {
				$('.scroll-scale-down').css({
					'transform': 'scale(' + scaleValue + ')',
					'-webkit-transform': 'scale(' + scaleValue + ')',
					'-ms-transform': 'scale(' + scaleValue + ')',
					'-moz-transform': 'scale(' + scaleValue + ')',
				})
			}

		}

	});
});
/* END OF fade header element at scroll */
/* END OF Animate background at scroll*/

/* Menu button clicked -> show menu on small devices*/
var menuopen = false;
$("#menu-btn").click(function() {
	if (!menuopen) {
		$(".menu-left").addClass("open");
		menuopen = true;
	} else {
		$(".menu-left").removeClass("open");
		menuopen = false;
	}
});

/* Show coment button clicked -> show comments block*/
var commentopen = false;
$("#comment-btn").click(function() {
	if (!commentopen) {
		$(".paper.page .comments").removeClass("hide-pane");
		commentopen = true;
	} else {
		$(".paper.page .comments").addClass("hide-pane");
		commentopen = false;
	}
});


/* Page Loader : hide loader when all are loaded */
$(window).load(function () {
	$('.page-loader').addClass('hidden-p');
});

/* END OF Page Loader : hide loader when all are loaded */
