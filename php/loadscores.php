<?php

/*Création des trois tableaux de scores*/

include '../application/bdd_connection.php';
include 'utilities.php';

$tables = ['easy','medium','hard'];

$datas =[];

for ($i=1; $i<=count($tables); $i++){

$query = $pdo->prepare (
		'SELECT * FROM `highscores` WHERE `difficulty`='.$i.' ORDER BY tries, day, name'
		);

		$query->execute();

		$datas[$i] = $query->fetchAll();

		for ($j=0;$j<count($datas[$i]);$j++){
			$prov = explode('-',$datas[$i][$j]['day']);
			$datas[$i][$j]['day']= $prov[2].' '.$months[$prov[1]].' '.$prov[0];
		};
	};

for ($i=1; $i<=count($tables); $i++){

	$previous=0;

	echo '<table class="'.$tables[$i-1].' container';
		if ($i>1){
			echo' ghost';
		} else {
			echo' buster';
		}
	echo '"><tr class="modern"><th class="modern">Rang</th><th class="modern">Nom</th><th class="modern">Essais</th><th class="modern">Mot</th><th class="modern">Date</th></tr>';

	for ($j=0; $j<count($datas[$i]); $j++){

		echo'<tr class="modern"><td class="modern">';

		if ($datas[$i][$j]['tries'] != $previous) {
			echo($j+1);
		} else {
			echo '-';
		}

		echo '</td><td class="modern naming">'.$datas[$i][$j]['name'].'</td><td class="modern">'.$datas[$i][$j]['tries'].'</td><td class="modern">'.$datas[$i][$j]['word'].'</td><td class="modern">'.$datas[$i][$j]['day'].'</td></tr>';
		
		$previous=$datas[$i][$j]['tries'];
	};

	echo '</table>';
}