/* Home photo backdrop: show a random selection from the whole "One bag, many different lives"
 * wall on every page load. The page is static, so the shuffle runs in the browser. Each row
 * gets its own photos; both copies of a row's track get the same ones (that is what makes
 * the loop seamless). Without JS the newest photos that the HTML ships with simply stay. */
( function () {
	var bg = document.querySelector( '.lives-bg' );
	if ( ! bg ) return;
	var ids, base = bg.getAttribute( 'data-base' );
	try { ids = JSON.parse( bg.getAttribute( 'data-photos' ) ); } catch ( e ) { return; }
	var rows = bg.querySelectorAll( '.partner-marquee-row' );
	if ( ! ids || ! base || ! rows.length ) return;

	for ( var i = ids.length - 1; i > 0; i-- ) {
		var j = Math.floor( Math.random() * ( i + 1 ) ), t = ids[ i ];
		ids[ i ] = ids[ j ]; ids[ j ] = t;
	}
	var next = 0;
	Array.prototype.forEach.call( rows, function ( row ) {
		var tracks = row.querySelectorAll( '.partner-marquee-track' );
		var first = next;
		Array.prototype.forEach.call( tracks, function ( track ) {
			next = first;
			Array.prototype.forEach.call( track.querySelectorAll( 'img' ), function ( img ) {
				var id = ids[ next++ % ids.length ];
				img.src = base + id + '.webp';
			} );
		} );
	} );
} )();
