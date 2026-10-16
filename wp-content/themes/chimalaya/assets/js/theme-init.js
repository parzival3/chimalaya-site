/* Initialise carousels the original theme's main.js handled (which we could not fetch).
   owl-carousel elements are display:none until owlCarousel() runs, so an uninitialised
   slider is invisible. (The old hero banner carousel is gone — Phase 1 replaced it with
   the static template hero. The home partner/services/blog sliders were never
   initialised here; the safety net below reveals them as static grids.) */
jQuery(function ($) {
	if (!$.fn.owlCarousel) return;
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

// Sticky header: shadow only after 8px of scroll (A.8). Passive listener, no jQuery.
(function () {
	var header = document.querySelector('.header-area');
	if (!header) return;
	var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
})();

// Home introductory video: play in place. The card links to YouTube; on click it is
// replaced by a youtube-nocookie embed, so YouTube is only contacted once asked.
document.addEventListener('click', function (e) {
	var link = e.target.closest && e.target.closest('.intro-video-play[data-video]');
	if (!link) return;
	e.preventDefault();
	var frame = document.createElement('iframe');
	frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(link.dataset.video) + '?autoplay=1&rel=0';
	frame.title = link.getAttribute('aria-label') || 'Video';
	frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
	frame.allowFullscreen = true;
	link.replaceWith(frame);
	frame.focus();
});
