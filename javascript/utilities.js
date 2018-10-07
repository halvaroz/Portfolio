'use strict';

let attempts = {'first' : 1, 'second' : 2,'third' : 3, 'fourth' : 4,'fifth' : 5, 'sixth' : 6,'seventh' : 7, 'eighth' : 8,'ninth' : 9, 'tenth' : 10, 'eleventh':11, 'twelfth' : 12};
let colors = {'1':'#7b5','2':'#fd5','3':'#e34'};
let gameEverSet = false;
let silence = true;
let difficulty = 1;
let essai = 0;
let nthgame = 0;
let gamestate = 0;
let currentPage = 0;
let pagesCount = 0;

let currentAnchor ='';

let soundEverActivated = false;

function playSound(id){
	if (silence === false){
		let sound = document.getElementsByTagName("audio")[id];
		sound.play();
	}
}

function sleepingGame(){
	for (let i=essai-1; i<13; i++){
		$(`.${Object.keys(attempts)[i]}`).attr('disabled','disabled');
		$(`.${Object.keys(attempts)[i]}`).css("background-color","rgb(235,235,228)");
		$(`#${Object.keys(attempts)[i]}`).css("background-color","rgb(55,55,55)");
		$(`#${Object.keys(attempts)[i]}`).prop('disabled','true');
		$("#giveup").prop('disabled','true');
	}
}

function sleepingTry(e){
	$(`.${Object.keys(attempts)[e-1]}`).attr('disabled','disabled');
	$(`.${Object.keys(attempts)[e-1]}`).css("background-color","rgb(235,235,228)");
	$(`#${Object.keys(attempts)[e-1]}`).css("background-color","rgb(55,55,55)");
	$(`#${Object.keys(attempts)[e-1]}`).prop('disabled','true');
	$(`.${e}`).removeAttr('id');
}

function activeTry(e){
	$(`#${Object.keys(attempts)[e-1]}`).css('background-color','white');
	$(`.${Object.keys(attempts)[e-1]}`).css("background-color","black");
	$(`.${e}`).attr('id',"current");
	$(`#${Object.keys(attempts)[e-1]}`).removeAttr('disabled');
	$(`.${Object.keys(attempts)[e-1]}`).removeAttr('disabled');
}

function activate(arr){
	arr.forEach(function(e) {
		$(`#${e}`).removeAttr('disabled');
		$(`#${e}`).addClass('activebutton');
		$(`#${e}`).removeClass('inactivebutton');
	})
}

function inactivate(arr){
	arr.forEach(function(e) {
		$(`#${e}`).prop('disabled','true');
		$(`#${e}`).removeClass('activebutton');
		$(`#${e}`).addClass('inactivebutton');
	})
}


function gameEnded(){
	inactivate(['giveup','help']);
	activate(['lvlchange']);
}

function setDifficulty($difficulty){
	switch($difficulty){
		case 1:
			$('#lvl').removeClass('green');
			$('#lvl').addClass('yellow');
			$('#lvl').html('Niveau II');
			difficulty = 2;
		break;
		case 2:
			$('#lvl').removeClass('yellow');
			$('#lvl').addClass('red');
			$('#lvl').html('Niveau III');
			difficulty = 3;
		break;
		case 3:
			$('#lvl').removeClass('red');
			$('#lvl').addClass('green');
			$('#lvl').html('Niveau I');
			difficulty = 1;
		break;
	}
}

function setRustine(){
	let largeur= window.innerWidth-118;

    /*adaptation au passage à un font-size=57% pour le html*/
        if (window.innerWidth<480){
        	largeur += 2;
        }
        
		largeur = largeur+'px';
        $('#rustine').css('width',largeur);     
}