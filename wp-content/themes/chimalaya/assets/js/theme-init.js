/* Initialise carousels the original theme's main.js handled (which we could not fetch).
   Currently: the full-width hero banner. owl-carousel elements are display:none until
   owlCarousel() runs, so an uninitialised slider is invisible. */
jQuery(function ($) {
	if (!$.fn.owlCarousel) return;
	$('.banner-area.owl-carousel').each(function () {
		$(this).owlCarousel({
			items: 1,
			loop: true,
			nav: false,   // no arrow styling exists in the original CSS; autoplay drives the hero
			dots: true,
			autoplay: true,
			autoplayTimeout: 6000,
			autoplayHoverPause: true,
			smartSpeed: 800,
			navText: [
				'<i class="ri-arrow-left-s-line"></i>',
				'<i class="ri-arrow-right-s-line"></i>'
			]
		});
	});
	// Bag4Life page: photo carousel at the bottom of the page.
	$('.bag4life-carousel.owl-carousel').each(function () {
		$(this).owlCarousel({
			items: 1,
			loop: true,
			nav: false,
			dots: true,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			smartSpeed: 800
		});
	});
	// Safety net: reveal any owl-carousel that ended up uninitialised so content is never hidden.
	$('.owl-carousel').not('.owl-loaded').css('display', 'block');
});

// Collapsed navbar (below the lg breakpoint): first tap on a parent item expands
// its submenu, second tap follows the link. Desktop keeps pure-CSS hover dropdowns.
jQuery(function ($) {
	var collapsed = window.matchMedia('(max-width: 991.98px)');
	$(document).on('click', '.navbar-nav .menu-item-has-children > .nav-link', function (e) {
		if (!collapsed.matches) return;
		var item = $(this).closest('.nav-item');
		if (!item.hasClass('open')) {
			e.preventDefault();
			item.siblings('.nav-item.open').removeClass('open');
			item.addClass('open');
		}
	});
	// Reset submenus when the hamburger menu is closed.
	$('#navbarSupportedContent').on('hide.bs.collapse', function () {
		$('.navbar-nav .nav-item.open').removeClass('open');
	});
});

// Language switcher: click to toggle (hover also opens via CSS).
jQuery(function ($) {
	$(document).on('click', '.language-switcher .lang-toggle', function (e) {
		e.stopPropagation();
		$(this).closest('.language-switcher').toggleClass('open');
	});
	$(document).on('click', function () { $('.language-switcher').removeClass('open'); });
});
