'use strict'

function setGame(){
	
/*Au clic sur le feu tricolore*/
	$('#lvlchange').on('click',function(){
		playSound(8);
		setDifficulty(difficulty);
	});

/*Au clic sur le bouton start*/
    $('#start').on('click',startGame);

/*Au clic sur l'icone règles'*/
	$('#instructions').on('click',function(){
		$('.how').toggle('slow');
		/*$('#instructions').toggleClass('on');
		if($('#instructions').hasClass('on')){
			playSound(7);
		}*/

	});

/*Au clic sur l'icone infos'*/
	$('#infos').on('click',function(){
		$('.further').toggle('slow');
	});

/*Au clic sur l'icone stats'*/

	$('#statistics').on('click',function(){
		let content=$('#stats').html();

		if(content.length>20){
			$('#stats').html(' ');
		} else {

		$.ajax({
				type: "get",
				url: "php/stats.php",
				success:function(data){
				$('#stats').html(data);
				}
		});
	}
	});

/*Au clic sur le bouton 'HELP''*/

	$('#help').on('click',function(){
		$.ajax({
				type: "get",
				url: "php/help.php",
				success:function(data){
				
				$('#answer').html(data);
				inactivate(['help']);
				}
			});
	});





/*Au clic sur l'icone bulles'*/
	$('#comments').on('click',function(){
		let content=$('#winners').html();
		
		if(content.length>20){
			
			$('#winners').html(' ');
		} else {
					
			$.ajax({
					type: "get",
					url: "php/comments.php",
					success:function(data){
				
					$('#winners').html(data);
					pagesCount = $('.hidden').length;

					$('.page1').toggleClass('hidden');
					currentPage = 1;

					$('#pageSelect').on('click',goToPage);

					$('.nextPage').on('click',goNextPage);
					$('.prevPage').on('click',goPrevPage);
					}
			});
		}
	});


/*Au clic sur le bouton 'Rejouer'*/
	$('#newgame').on('click',function(){
		playSound(4);
		$('#help').css('background-position','-10px -94px');
		$('.tentries').prop('disabled',false).val('');
		$('.result').html('');

		inactivate(['newgame','giveup']);
		activate(['help']);
		for (let i=0;i<13;i++){
			sleepingTry(i);
		}
		
		activate(['help']);

		launch();
	});


/*Au clic sur le bouton 'Abandonner'*/
	$('#giveup').on('click',function(){
		$('#help').css('background-position','-94px -10px');
		playSound(5);
		$.ajax({
				type: "get",
				url: "php/abort.php",
				success:function(data){
					
				sleepingGame();
				$('#answer').html(data);
				gameEnded();
			}
		});
	});


/*À la validation d'une proposition*/
	$('.game').on('click',onClickExecute);
	
	
}