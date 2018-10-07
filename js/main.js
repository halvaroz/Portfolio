/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
/*;(function(window) {

	'use strict';

	var kalimbaEl = document.querySelector('.content--instrument > .kalimba'),
		isMobile = mobilecheck();

	function init() {
		// Preload all sounds and initialize the instruments.
		MIDI.loadPlugin({
			soundfontUrl: './soundfont/',
			instruments: ['kalimba'],
			onsuccess: function() {
				document.body.classList.remove('loading');
				// Initialize the Kalimba.
				new Kalimba(kalimbaEl);
			}
		});
	}

	init();

})(window);*/

/* document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';

	let kalimbaEl = document.querySelector('.content--instrument > .kalimba'),
		isMobile = mobilecheck();

	function init() {
		// Preload all sounds and initialize the instruments.
		MIDI.loadPlugin({
			soundfontUrl: './soundfont/',
			instruments: ['kalimba'],
			onsuccess: function() {
				document.body.classList.remove('loading');
				// Initialize the Kalimba.
				new Kalimba(kalimbaEl);
			}
		});
	}

	init();
  });*/