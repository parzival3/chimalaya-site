(function($) {

	'use strict';
	
	// Header Sticky, Go To Top JS
	let prevScrollPos = window.pageYOffset;

	$(window).on('scroll', function() {
		// Header Sticky JS
		let currentScrollPos = window.pageYOffset;

		if (prevScrollPos > currentScrollPos) {
			$('.navbar-area').addClass("is-sticky");
		} else {
			$('.navbar-area').removeClass("is-sticky");
		}

		prevScrollPos = currentScrollPos;

		// Go To Top JS
		var scrolled = $(window).scrollTop();
		if (scrolled > 300) $('.go-top').addClass('active');
		if (scrolled < 300) $('.go-top').removeClass('active');
	});

	// Services Slide JS
	$('.services-slide').owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 1,
			},
			414: {
				items: 1,
			},
			576: {
				items: 2,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 3,
			},
		},
	});

	// Services Slide Two JS
	$('.services-slide-two').owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		nav: false,
		dots: false,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 1,
			},
			414: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
				center: true,
			},
			1200: {
				items: 3,
				center: true,
			},
			1400: {
				items: 4,
				center: true,
			},
		},
	});

	// Blog Slide JS
	$('.blog-slide').owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		nav: false,
		dots: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			},
			414: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 2,
			},
			1200: {
				items: 3,
			},
		},
	});

	// Review Slide JS
	$('.review-slide').owlCarousel({
		items: 1,
		loop: true,
		margin: 24,
		nav: false,
		dots: false,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		animateOut: 'fadeOut',
		responsive: {
			0: {
				items: 1,
			},
			414: {
				items: 1,
			},
			576: {
				items: 2,
			},
			768: {
				items: 2,
			},
			992: {
				items: 2,
			},
			1200: {
				items: 2,
			},
		},
	});

	// Gallery Popup JS (magnific-popup plugin is not bundled — skip when absent)
	if ($.fn.magnificPopup) {
		$('.gallery-popup').each(function() {
			$(this).magnificPopup({
				delegate: '.img',
				type: 'image',
				gallery: {
				  enabled:true
				}
			});
		})
	}
	
	// Click Event JS
	$('.go-top').on('click', function() {
		$("html, body").animate({ scrollTop: "0" }, 50);
	});

	/* Countdown timer from the original theme removed: its target date (Nov 2022)
	   is long past, no #days/#hours markup exists, and the 300ms interval caused
	   constant layout adjustments (scroll-anchoring warnings) while scrolling. */

	// Preloader
	$(window).on('load', function() {
		$('.preloader').addClass('preloader-deactivate');
	}) 

	// Subscribe form + MailChimp JS. Both depend on plugins the rebuild does not
	// bundle (validator, ajaxChimp) — skip the whole block when they are absent,
	// otherwise the TypeError would abort the rest of this file.
	if ($.fn.validator && $.fn.ajaxChimp) {
		$(".newsletter-form").validator().on("submit", function (event) {
			if (event.isDefaultPrevented()) {
			// handle the invalid form...
				formErrorSub();
				submitMSGSub(false, "Please enter your email correctly.");
			} else {
				// everything looks good!
				event.preventDefault();
			}
		});
		function callbackFunction (resp) {
			if (resp.result === "success") {
				formSuccessSub();
			}
			else {
				formErrorSub();
			}
		}
		function formSuccessSub(){
			$(".newsletter-form")[0].reset();
			submitMSGSub(true, "Thank you for subscribing!");
			setTimeout(function() {
				$("#validator-newsletter").addClass('hide');
			}, 4000)
		}
		function formErrorSub(){
			$(".newsletter-form").addClass("animated shake");
			setTimeout(function() {
				$(".newsletter-form").removeClass("animated shake");
			}, 1000)
		}
		function submitMSGSub(valid, msg){
			if(valid){
				var msgClasses = "validation-success";
			} else {
				var msgClasses = "validation-danger";
			}
			$("#validator-newsletter, #validator-newsletter-2").removeClass().addClass(msgClasses).text(msg);
		}

		// AJAX MailChimp JS
		$(".newsletter-form").ajaxChimp({
			url: "https://Envy Theme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
			callback: callbackFunction
		});
	}
	
	// Odometer JS — the jquery.appear plugin is not bundled, so fill counters
	// immediately instead of on scroll-into-view.
	$('.odometer').each(function () {
		$(this).html($(this).attr('data-count'));
	});

	// FAQ Accordion JS
	$('.accordion').find('.accordion-title').on('click', function(){
		$(this).toggleClass('active');
		$(this).next().slideToggle('fast');
		$('.accordion-content').not($(this).next()).slideUp('fast');
		$('.accordion-title').not($(this)).removeClass('active');		
	});

	// TweenMax JS (library not bundled — skip the parallax mousemove when absent)
	if (window.TweenMax) {
		$('.banner-area, .why-choose-us-area, .our-review-area, .subscribe-area, .quality-area, .page-title-area').mousemove(function(e){
			var wx = $(window).width();
			var wy = $(window).height();
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			var newx = x - wx/2;
			var newy = y - wy/2;
			$('.shape').each(function(){
				var speed = $(this).attr('data-speed');
				if($(this).attr('data-revert')) speed *= -.4;
				TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
			});
		});
	}

	// AOS JS (library not bundled — styles are neutralised in style.css)
	if (window.AOS) { AOS.init(); }

	// Others Option For Responsive JS
	$(".others-option-for-responsive .dot-menu").on("click", function(){
		$(".others-option-for-responsive .container .container").toggleClass("active");
	});
	
	// Get the checkbox and the div element
	$(document).ready(function() {
		$('#active').change(function() {
			if(this.checked) {
				$('body').addClass('no-scroll');
			} else {
				$('body').removeClass('no-scroll');
			}
		});
	});

})(jQuery);
