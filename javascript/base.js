'use strict';

document.addEventListener("DOMContentLoaded", function(event)
{	

	setRustine();

	window.addEventListener('resize',function(){
			setRustine();
		});

/*Au clic sur l'icone son - sous la nav à gauche*/
	$('#sound').click(function() {
	 	silence = !silence;
	 	let position = "";
	 	silence ? position="off" : position="on";
	 	$('#sound').html(`<img src="img/audio-${position}.png" alt="" />`);

	 	if (!soundEverActivated) {
	 		/**
			 * http://www.codrops.com
			 *
			 * Licensed under the MIT license.
			 * http://www.opensource.org/licenses/mit-license.php
			 * 
			 * Copyright 2016, Codrops
			 * http://www.codrops.com
			 */
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
	soundEverActivated = true;
	init();


	 	}
 	});


/*Jeu - Au clic sur le bouton power*/

    $('#light').click(function(){
    	if (gamestate === 0){
    		document.body.className = "loading";
    		if(gameEverSet === false) {
    			setGame()
    			gameEverSet = true
    		}

    		$('#light').css('background-position','-178px -178px');
    		activate(['start']);
    	
    		playSound(2);

	    	activate(['lvlchange',
							'start',
							'instructions',
							'topscores',
							'infos',
							'statistics',
							'comments']);
	    		
	    	$('#effect').toggleClass('voile');
	    	$('#effect2').toggleClass('voile');
	    	$('#rustine').toggleClass('shadow');
	    	$('#rustine').html('<p class="welcome">Bienvenue !</p>');

	    	gamestate=1;
	    	document.body.className = "";
	    } else {
	    	document.body.className = "loading";
	    	playSound(3);
	    	$('#light').css('background-position','-178px -94px');
	    	$('#start').css('background-position','-10px -10px');
	    	

	    	inactivate(['help','giveup','newgame','lvlchange','start',
				'instructions','topscores','infos','statistics','comments']);



	    	$('#start').on('click',startGame);
	    	$('#start').prop('disabled','true');

	    	for (let i=0;i<13;i++){
				sleepingTry(i);
			}

	    	$('#effect').toggleClass('voile');
	    	$('#effect2').toggleClass('voile');
	    	$('#rustine').toggleClass('shadow');
	    	$('#rustine').empty();
	    	$('.tentries').val('');
	    	$('.tentries').attr('disabled','true');

	    	$('.gameline').css('display','inline-block');

	    	$('#stats').empty();
	    	$('.result').empty();
	    	$('#winners').empty();
	
			if($('#infos').hasClass('help')) {
				$('.further').toggle('slow');
				$('#infos').removeClass('help');
			}

			if ($('#instructions').hasClass('help')){
				$('.how').toggle('slow');
				$('#instructions').removeClass('help');
			}


			difficulty=3;
			setDifficulty(difficulty);

	    	gamestate=0;
	    	document.body.className = "";
	    }
    });



/* Gestion des ancres prenant en compte la nav fixe*/
	(function($, window) {
        let setAnchor = function() {
		let $anchor = $(':target');
        let fixedElementHeight = 125;
            
        if(window.innerWidth<480){
            fixedElementHeight=308;
        }

		let tes = document.getElementById('projects')
		if ($anchor.length > 0) {
			let prim = $anchor.offset().top - fixedElementHeight
			
		}


        if ($anchor.length > 0) {
        	let testo = $anchor.offset().top - fixedElementHeight
        	let testi = $anchor.offsetTop
        	console.log(testo)
        	
			$('html, body')
                .stop()
                .animate({
                    scrollTop: $anchor.offset().top - fixedElementHeight
                }, 300);
            }
        };

        $(window).on('hashchange load', function() {
            setAnchor();
  			
        });

    })(jQuery, window);

    $('.anchors').on('click',function(e){
		let $anchor = $(':target');

		if (currentAnchor != $anchor.attr('id')){
    	
	    	let setAnchor = function() {

	        let fixedElementHeight = 125;
	            
	        if(window.innerWidth<480){
	            fixedElementHeight=308;
        }

			$('html, body')
                .stop()
                .animate({
                    scrollTop: $anchor.offset().top - fixedElementHeight
                }, 300);
            
        };
    	setAnchor()
    	currentAnchor = $anchor.attr('id')
    	
    	}

    
    });

    let miniatures = document.getElementsByClassName('miniatures');

    for (let i=1; i<=miniatures.length; i++) {
    	$(`#img${i}`).on('click',zoom);
    }
    console.log('here')

});





 



