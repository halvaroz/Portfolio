'use strict';
$(document).ready(function(){

	document.body.className = "loading";

	let classicDesign = false;

		$.ajax({
		type: "get",
		url: "php/loadscores.php",
		success:function(data){

			$('.leaderboard').html(data);
			console.log($('.leaderboard'));
			document.body.className = "";
		}
	});

	$('.switch-mode').on('click',function(){

		if (classicDesign === false){
			$('.switcher').attr('src','img/switch-on.png');
		} else {
			$('.switcher').attr('src','img/switch-off.png');
		}

		classicDesign = !classicDesign;
		$('table').toggleClass('container');
		$('.popup-container').toggleClass('modern');
		$('h1').toggleClass('modern');
		$('td').toggleClass('modern');
		$('th').toggleClass('modern');
		$('tr').toggleClass('modern');
		$('span').toggleClass('modern');
	});

	$('.switch-level').on('click',function(){
		if ($('.easy').hasClass('buster')){
			change('easy','medium',2);
		} else if ($('.medium').hasClass('buster')){
			change('medium','hard',3);
		} else if ($('.hard').hasClass('buster')){
			change('hard','easy',1);
		}
	 });
});

function change(current,next,lvl){
	$(`.${current}`).toggleClass('buster');
	$(`.${current}`).toggleClass('ghost');
	$(`.${next}`).toggleClass('buster');
	$(`.${next}`).toggleClass('ghost');
	$('h1').html('Classement niveau '+ lvl);
}
