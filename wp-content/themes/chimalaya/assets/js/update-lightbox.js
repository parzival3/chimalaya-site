/* Photo viewer for a single update (single-activity.php): clicking a photo opens it
 * full-size over the page, with previous/next buttons, arrow keys, swipe and Esc.
 * Covers the lead photo, inline figures and the gallery, in page order. Also used by the
 * photo wall on "One bag, many different lives" (.lives-tile). */
( function () {
	var L = window.chimalayaLightbox || { close: 'Close', prev: 'Previous photo', next: 'Next photo' };
	var triggers = Array.prototype.slice.call( document.querySelectorAll(
		'.update-lead img, .update-inline img, .update-gallery-grid a, .lives-tile' ) );
	if ( ! triggers.length ) return;

	var photos = triggers.map( function ( el ) {
		var img = el.tagName === 'IMG' ? el : el.querySelector( 'img' );
		var full = el.tagName === 'A' ? el.getAttribute( 'href' ) : ( img.currentSrc || img.src ).replace( /-\d+x\d+(\.\w+)$/, '$1' );
		return { src: full, alt: img.alt || '' };
	} );

	var box = document.createElement( 'div' );
	box.className = 'lightbox';
	box.hidden = true;
	box.setAttribute( 'role', 'dialog' );
	box.setAttribute( 'aria-modal', 'true' );
	box.innerHTML =
		'<button type="button" class="lightbox-close" aria-label="' + L.close + '">&times;</button>' +
		'<button type="button" class="lightbox-nav lightbox-prev" aria-label="' + L.prev + '">&#8249;</button>' +
		'<figure class="lightbox-stage"><img alt=""><figcaption></figcaption></figure>' +
		'<button type="button" class="lightbox-nav lightbox-next" aria-label="' + L.next + '">&#8250;</button>';
	document.body.appendChild( box );

	var img = box.querySelector( 'img' ), cap = box.querySelector( 'figcaption' ),
		closeBtn = box.querySelector( '.lightbox-close' ), at = 0, opener = null;

	function preload( i ) {
		var n = photos[ ( i + photos.length ) % photos.length ];
		( new Image() ).src = n.src;
	}
	function show( i ) {
		at = ( i + photos.length ) % photos.length;
		img.src = photos[ at ].src;
		img.alt = photos[ at ].alt;
		cap.textContent = ( at + 1 ) + ' / ' + photos.length;
		preload( at + 1 ); preload( at - 1 );
	}
	function open( i, from ) {
		opener = from;
		show( i );
		box.hidden = false;
		document.documentElement.classList.add( 'lightbox-open' );
		closeBtn.focus();
	}
	function close() {
		box.hidden = true;
		img.removeAttribute( 'src' );
		document.documentElement.classList.remove( 'lightbox-open' );
		if ( opener ) opener.focus();
	}

	triggers.forEach( function ( el, i ) {
		el.addEventListener( 'click', function ( e ) { e.preventDefault(); open( i, el ); } );
		if ( el.tagName === 'IMG' ) {
			el.style.cursor = 'zoom-in';
			el.tabIndex = 0;
			el.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Enter' || e.key === ' ' ) { e.preventDefault(); open( i, el ); }
			} );
		}
	} );

	box.addEventListener( 'click', function ( e ) {
		if ( e.target === box || e.target === closeBtn || e.target.classList.contains( 'lightbox-stage' ) ) close();
		else if ( e.target.classList.contains( 'lightbox-prev' ) ) show( at - 1 );
		else if ( e.target.classList.contains( 'lightbox-next' ) ) show( at + 1 );
	} );
	document.addEventListener( 'keydown', function ( e ) {
		if ( box.hidden ) return;
		if ( e.key === 'Escape' ) close();
		else if ( e.key === 'ArrowLeft' ) show( at - 1 );
		else if ( e.key === 'ArrowRight' ) show( at + 1 );
		else if ( e.key === 'Tab' ) {   // keep focus inside the dialog
			var f = box.querySelectorAll( 'button' ), first = f[ 0 ], last = f[ f.length - 1 ];
			if ( e.shiftKey && document.activeElement === first ) { e.preventDefault(); last.focus(); }
			else if ( ! e.shiftKey && document.activeElement === last ) { e.preventDefault(); first.focus(); }
		}
	} );

	var x0 = null;
	box.addEventListener( 'touchstart', function ( e ) { x0 = e.touches[ 0 ].clientX; }, { passive: true } );
	box.addEventListener( 'touchend', function ( e ) {
		if ( x0 === null ) return;
		var dx = e.changedTouches[ 0 ].clientX - x0;
		x0 = null;
		if ( Math.abs( dx ) > 50 ) show( at + ( dx < 0 ? 1 : -1 ) );
	}, { passive: true } );
} )();
