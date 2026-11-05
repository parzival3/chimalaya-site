/* Home photo strip: show a random selection from the whole "One bag, many different lives"
 * wall and, every few seconds, fade one photo into another that is not on screen. The page
 * is static, so this runs in the browser. Without JS (or on error) the newest photos that
 * the HTML ships with simply stay. Reduced motion: shuffle once, no rotation. */
( function () {
	var strip = document.querySelector( '.lives-cta-strip' );
	if ( ! strip ) return;
	var ids, imgs = Array.prototype.slice.call( strip.querySelectorAll( 'img' ) );
	try { ids = JSON.parse( strip.getAttribute( 'data-photos' ) ); } catch ( e ) { return; }
	var base = strip.getAttribute( 'data-base' );
	if ( ! ids || ids.length <= imgs.length || ! base ) return;

	function shuffle( a ) {
		for ( var i = a.length - 1; i > 0; i-- ) {
			var j = Math.floor( Math.random() * ( i + 1 ) ), t = a[ i ];
			a[ i ] = a[ j ]; a[ j ] = t;
		}
		return a;
	}
	function url( id ) { return base + id + '.webp'; }

	var pool = shuffle( ids.slice() );
	var shown = imgs.map( function ( img, i ) { return pool[ i ]; } );
	imgs.forEach( function ( img, i ) { img.src = url( shown[ i ] ); } );   // first paint: a random set
	if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) return;

	function swap() {
		if ( document.hidden ) return;
		var visible = imgs.filter( function ( img ) { return img.offsetParent !== null; } );
		var spare = ids.filter( function ( id ) { return shown.indexOf( id ) < 0; } );
		if ( ! visible.length || ! spare.length ) return;
		var img = visible[ Math.floor( Math.random() * visible.length ) ];
		var id = spare[ Math.floor( Math.random() * spare.length ) ];
		var next = new Image();
		next.onload = function () {
			img.classList.add( 'is-swapping' );
			setTimeout( function () {
				shown[ imgs.indexOf( img ) ] = id;
				img.src = next.src;
				img.classList.remove( 'is-swapping' );
			}, 600 );
		};
		next.src = url( id );
	}
	setInterval( swap, 3500 );
} )();
