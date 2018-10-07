'use strict';

/*Initialisation d'une nouvelle partie*/
function launch(){
	essai=1;
	
	$('.tentries').css('background-color',colors[difficulty]);
	$('.tries').css('opacity','1');

	activeTry(essai);
	activate(['help']);

	$.ajax({
		type: "post",
		url: "php/initd.php",
		data: {'difficulty': difficulty},
		success:function(data){
			inactivate(['lvlchange']);
		}
	});
}

/*à la validation d'une proposition*/
function onClickExecute(){
	let type = $(this).attr("id");
	if (attempts[type] != essai){
		$(`#${type}try`).html(`<span class="error bg-black">Vous êtes au n°${essai} !</span>`);
		return;
	}

	let saisie = $(`input.${type}`).val();
	if (saisie.match(/[a-zA-zÉéÀàÈèÙùÂâÊêÎîÔôÛûËëÏïÜüŸÿçÇ]{5}/) === null) {
		$(`#${type}try`).html('Veuillez saisir un mot de 5 lettres.');
		return;
	} else {
		document.body.className = "loading";
	}
	$.ajax({
		type: "post",
		url: "php/gamed.php",
		data: {'saisie': saisie,'try' : type},
		success:function(data){
			$(`#${type}try`).html(data);
			if(data.includes('Bravo')){
				playSound(6);
				gameEnded();

				$(`.${type}`).attr("disabled","disabled");
				
				sleepingGame();
				sleepingTry(essai);	
				submitScore();

				$('#answer').html('<p class="bg-white"><textarea id="commentaire" placeholder="Votre commentaire"></textarea><button id="write">Ajouter mon commentaire</button><span></p>');
				$('#write').on('click',addComm);
			}
			if (data.includes('solution')) {
				gameEnded();
				$('#help').css('background-position','-94px -10px');
			}
			if(data.includes('summary') &&(!data.includes('Bravo'))){
				sleepingTry(essai);
				$(`#${type}try`).addClass('bg-white');
				$(`.${Object.keys(attempts)[essai-1]}`).attr('disabled','disabled');

				activeTry(essai+1);
				if (essai==1){
						activate(['newgame']);
						activate(['giveup']);
				}
				essai++;
			}
			document.body.className = "";
		}
	});
}

/*Au clic sur l'icone podium*/

function openscore(){
	window.open('highscores.phtml','highscores','height=600, width=600, top=100, left=100, toolbar=no, menubar=yes, location=no, resizable=yes, scrollbars=no, status=no'); 
}

function startGame(){
	$('#start').css('background-position','-94px -178px');
	inactivate(['start']);
	$('.gameline').css('display','block');
	launch();
}

function submitScore(){
	let type = $(this).attr("id");

	$.ajax({
		type: "post",
		url: "php/podium.php",
		success:function(data){

			$(`#${type}try`).html(data);

			document.body.className = "";

			$('#addname').on('click',specifyName);
			if (essai == 1){
				activate(['newgame']);
			}
		}
	});
}

function specifyName(){
	let name= $('#playername').val();
	
	if (name.trim() === ""){
		$('#success span').html('Veuillez écrirer un nom.');
		return;
	}

	$.ajax({
		type: "post",
		url: "php/updatename.php",
		data: {'name': name},
		success:function(data){

			$('#wellmessage').html(data);

			if (data.includes('caractères')){
				$('#addname').on('click',specifyName);
			}
		}
	});
}



function addComm(){
	let comment= $('#commentaire').val();
	
	if (comment.trim() === ""){
		$('#success span').html('Veuillez écrirer un commentaire.');
		return;
	}

	$.ajax({
		type: "post",
		url: "php/addcomment.php",
		data: {'comment': comment},
		success:function(data){
			$('#answer').html(data);

			if (data.includes('caractères')){
				$('#write').on('click',addComm);
			}
		}
	});
}



/*Trois fonctions pour la pagination des commentaires*/
function goToPage(){
	let selected = $('#nthpage').val();

	$(`.page${currentPage}`).toggleClass('hidden');
	$(`.page${selected}`).toggleClass('hidden');
	currentPage = selected;
};

function goNextPage(){
	if (currentPage<pagesCount){
		$(`.page${currentPage}`).toggleClass('hidden');
		$(`.page${currentPage+1}`).toggleClass('hidden');
		currentPage++;
	}
}

function goPrevPage(){
	if (currentPage>1){
		$(`.page${currentPage}`).toggleClass('hidden');
		$(`.page${currentPage-1}`).toggleClass('hidden');
		currentPage--;
	}
}