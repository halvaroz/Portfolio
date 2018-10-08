/**
 * kalimba.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */

let keyDownActive = false

let nextKeyPress = true
let X = 0.137

function setHandleNextKeypressTrue() {
    handleNextKeypress = true;
}

function setHandleNextKeypressTrueAfterDelay(delay) {
    setTimeout(setHandleNextKeypressTrue, delay);
}

function testing (e){
	if(handleNextKeypress) {
        handleKeyDown(e)
        handleNextKeypress = false;
        setHandleNextKeypressTrueAfterDelay(X * 1000);
    }

}


;(function(window) {
	/**
	 * Kalimba obj. Tuned to CMaj (C4..C5)
	 */
	function Kalimba(el, options) {
		this.el = el;
		this.tines = [].slice.call(this.el.querySelectorAll('.kalimba__tine'));
		this.midiCode = 108; // Check http://www.ccarh.org/courses/253/handout/gminstruments/
		this._initEvents();
	}

	Kalimba.prototype._initEvents = function() {
		var self = this,
			isMobile = mobilecheck(),
			evs = {
				down: isMobile ? 'touchstart' : 'mousedown',
				up: isMobile ? 'touchend' : 'mouseup'
			};

		this.tines.forEach(function(tine) {
			tine.addEventListener(evs.down, function(ev) {
				var note = self._getNote(tine);
				self.mdown = true;

				if( !isMobile ) {
					self.mouseLeaveFn = function(ev) {
						
					self._play(note, 'off');
					
						
						this.removeEventListener('mouseleave', self.mouseLeaveFn);
					};
					tine.addEventListener('mouseleave', self.mouseLeaveFn);
				}
				

				self._play(note, 'on', tine);
					
			});

			tine.addEventListener(evs.up, function(ev) {
				if( !self.mdown && !isMobile ) {
					return false;
				}
				self.mdown = false;
				var note = self._getNote(tine);
				
				if( !isMobile ) {
					this.removeEventListener('mouseleave', self.mouseLeaveFn);
				}
				self._play(note, 'off');
					
			});

			if( !isMobile ) {
				tine.addEventListener('mouseenter', function(ev) {
					if( !self.mdown ) {
						return false;
					}

					var note = self._getNote(tine);
					self.mouseLeaveFn = function(ev) {
						
					self._play(note, 'off');
					
						
						this.removeEventListener('mouseleave', self.mouseLeaveFn);
					};
					tine.addEventListener('mouseleave', self.mouseLeaveFn);

					console.log(note)
				console.log(tine)
					self._play(note, 'on', tine);
					
					
				});
			}
		});

		

			function handleKeyDown(e){
			
				switch(e.keyCode){
					case 83:
						let tineA = self.tines[0]
						let noteA = self._getNote(tineA);
						self._play(noteA, 'on', tineA );
						break;
					case 68:
						let tineB = self.tines[1]
						let noteB = self._getNote(tineB);
						self._play(noteB, 'on', tineB );
						break;
					case 70:
						let tineC = self.tines[2]
						let noteC = self._getNote(tineC);
						self._play(noteC, 'on', tineC );
						break;
					case 71:
						let tineD = self.tines[3]
						let noteD = self._getNote(tineD);
						self._play(noteD, 'on', tineD );
						break;
					case 72:
						let tineE = self.tines[4]
						let noteE = self._getNote(tineE);
						self._play(noteE, 'on', tineE );
						break;
					case 74:
						let tineF = self.tines[5]
						let noteF = self._getNote(tineF);
						self._play(noteF, 'on', tineF );
						break;
					case 75:
						let tineG = self.tines[6]
						let noteG = self._getNote(tineG);
						self._play(noteG, 'on', tineG );
						break;
					case 76:
						let tineH = self.tines[7]
						let noteH = self._getNote(tineH);
						self._play(noteH, 'on', tineH );
						break;
				}
				
			}

			function handleKeyUp(e){
				console.log(e.keyCode)
				switch(e.keyCode){
					case 83:
						let tineA = self.tines[0]
						let noteA = self._getNote(tineA);
						self._play(noteA, 'off' );
						break;
					case 68:
						let tineB = self.tines[1]
						let noteB = self._getNote(tineB);
						self._play(noteB, 'off' );
						break;
					case 70:
						let tineC = self.tines[2]
						let noteC = self._getNote(tineC);
						self._play(noteC, 'off' );
						break;
					case 71:
						let tineD = self.tines[3]
						let noteD = self._getNote(tineD);
						self._play(noteD, 'off' );
						break;
					case 72:
						let tineE = self.tines[4]
						let noteE = self._getNote(tineE);
						self._play(noteE, 'off' );
						break;
					case 74:
						let tineF = self.tines[5]
						let noteF = self._getNote(tineF);
						self._play(noteF, 'off' );
						break;
					case 75:
						let tineG = self.tines[6]
						let noteG = self._getNote(tineG);
						self._play(noteG, 'off' );
						break;
					case 76:
						let tineH = self.tines[7]
						let noteH = self._getNote(tineH);
						self._play(noteH, 'off' );
						break;
				}
				
			}

		
			
			let firstSection = document.querySelector('.a_content');


			firstSection.addEventListener('click', function(ev){
				if (!keyDownActive){
					window.addEventListener('keydown', handleKeyDown)
					keyDownActive = true
				}
			})

			firstSection.addEventListener('mouseenter', function(ev){
				if (!keyDownActive){
					window.addEventListener('keydown', handleKeyDown)
					keyDownActive = true
				}
			})

			firstSection.addEventListener('mouseleave', function(ev){
				window.removeEventListener('keydown', handleKeyDown)
				keyDownActive = false
			});

		
		if( !isMobile ) {
			this.el.addEventListener('mousedown', function(ev) { self.mdown = true; });
			this.el.addEventListener('mouseup', function(ev) { self.mdown = false; });
			this.el.addEventListener('mouseleave', function(ev) { self.mdown = false; });
		}
	};

	Kalimba.prototype._getNote = function(tine) {
		return tine.getAttribute('note:id');
	};

	Kalimba.prototype._play = function(note, status, tine) {

		if (silence === true){
			return false
		}
		var channel = 0,
			note = parseInt(note) + 21,
			delay = 0,
			velocity = 127; // how hard the note hits
		
		MIDI.programChange(0, this.midiCode);

		if( status === 'on' ) {
			MIDI.noteOn(channel, note, velocity, delay);
			
			anime({
				targets: tine,
				duration: 1500,
				easing: 'easeOutElastic',
				elasticity: 900,
				translateY: [-3,0]
			});
		}
		else {
			MIDI.noteOff(channel, note, delay+4);
		}
	};

	window.Kalimba = Kalimba;

})(window);