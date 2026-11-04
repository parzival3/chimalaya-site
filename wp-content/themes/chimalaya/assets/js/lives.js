/* "One bag, many different lives": tiles fade in as they scroll into view.
 * Tiles already on screen stay put (no flash), and with reduced motion or without
 * IntersectionObserver everything is simply shown. */
( function () {
	var tiles = Array.prototype.slice.call( document.querySelectorAll( '.lives-tile' ) );
	if ( ! tiles.length || ! ( 'IntersectionObserver' in window ) ||
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) return;

	var seen = new IntersectionObserver( function ( entries ) {
		entries.forEach( function ( e ) {
			if ( ! e.isIntersecting ) return;
			e.target.classList.add( 'is-in' );
			seen.unobserve( e.target );
		} );
	}, { rootMargin: '0px 0px -6% 0px' } );

	tiles.forEach( function ( t, i ) {
		if ( t.getBoundingClientRect().top < window.innerHeight ) return;
		t.classList.add( 'is-pending' );
		t.style.transitionDelay = ( i % 4 ) * 70 + 'ms';
		seen.observe( t );
	} );
} )();
