document.addEventListener('DOMContentLoaded', function() {

	var gridWidth = 24, gridHeight = 16;
	var gameGrid = $("#gameGrid");
	var player1Position = (gridWidth*(Math.round(gridHeight)/2)+Math.round(gridWidth/10));
	var player2Position = (gridWidth*((Math.round(gridHeight)/2)+1)-(1+Math.round(gridWidth/10)));
	createGrid();
	var scoreTileNumber = createScoreTile();
	var player1Score = 0;
	var player2Score = 0;

//============================ Pad Scoring =============================//

	function pad(player, player1Score, player2Score) {
		if (player === 1) {
			console.log("pad one is working");
	    	return (player1Score < 10) ? '0' + player1Score.toString() : player1Score.toString();
		} else {
			console.log("pad two is working");
	    	return (player2Score < 10) ? '0' + player2Score.toString() : player2Score.toString();
		}
	}
//======================================================================//

//=========================== 'Go' Button ==============================//

	$("#go-button").click(function(){
		console.log("go working");
	   	$("#timer-and-scores").show();
    	$("#instructions").slideUp();
    	startCountdown();



	});
//======================================================================//

//=================== Game-Start Countdown =============================//
	function startCountdown() {
		$("#countdown-to-start").show();
		var counter = 3;
		var interval = setInterval(function() {
		    $('#countdown-to-start').html(counter);
		    console.log(counter);
		    counter--;
		    if (counter === -1) {
		    	$("#gameGrid").show();
			   	$(".gridTiles").show();
		        $("#countdown-to-start").hide();
		        clearInterval(interval);
		        updateScoreBoards(player1Score,player2Score);
		    }
		}, 1000);
	}
//======================================================================//

//======================== Game 1 min timer ============================//

/* Once Game-Start-Countdown expires, run a 1 minute timer.
While timer is running, game is in play (GameGrid and GameTiles are visible).
Once 1 minute timer expires: 
	Winner is declared. Player with most points = winner. 
	Hide GameGrid & GameTiles, show winner screen ("playerX wins").
		Show option to replay game. This button resets the game. */ 

	function gameTimer () {
		var counter = 60;
		var interval = setInterval (function() {

		})

//======================================================================//

//======================== Create Score Tile ===========================//

	function createScoreTile() {
    	var scoreTile = Math.floor(Math.random()*(gridHeight*gridWidth));
    	var tiles = $(".gridTiles");
    	$(tiles[scoreTile]).css("background-color", "green");
    	return scoreTile;
    }
//======================================================================// 

//========================== Create Game Grid ==========================//

	function createGrid () {
		var tileWidth = ((gameGrid.width()-1)/gridWidth);
		var tileHeight = ((gameGrid.height()-1)/gridHeight);

		for (var i = 0; i < (gridHeight*gridWidth); i++) {
			var newTile = $('<li></li>');
			newTile.attr("class","gridTiles");
			newTile.css('width', tileWidth + 'px').css('height', tileHeight + 'px');
			gameGrid.append(newTile);
		}
	}
//======================================================================//

//============================== Scoring ===============================// 

	function incrementPlayerScore (player) {
		if (player === 1) {
			player1Score++;
		} else {
			player2Score++;
		};
		console.log("incrementPlayerScore is working");
		console.log(player1Score, player2Score)
		updateScoreBoards(player1Score, player2Score);
	}


//======================================================================//

//======================== Update Scores ===============================//
	function updateScoreBoards (player1Score, player2Score) {
    	$('#player1-scoreboard').html(player1Score);
    	$('#player2-scoreboard').html(player2Score);
    	console.log(player1Score, player2Score);
    }

//======================================================================//

//=========================== Player Movement ==========================//
	function playerMove (player, start, finish) {
		var tiles = $(".gridTiles");

		if (player === 1) {
			player1Position = finish;
			$(tiles[finish]).css("background-color", "red");
		} else {
			player2Position = finish;
			$(tiles[finish]).css("background-color", "blue");
		}
		$(tiles[start]).css("background", "none");

		if (finish === scoreTileNumber) {
			console.log("Score");
			incrementPlayerScore(player);
			scoreTileNumber = createScoreTile();
		}
	}
//====================================================================//

//====================================================================//

	$(document).on("keyup", function(event) {
		var player, start, finish;
		switch(event.keyCode) {
			case 87: 
				player = 1;
				start = player1Position;
				finish = start - gridWidth;
				break;
			case 68: 
				player = 1;
				start = player1Position;
				finish = start + 1;
				break;
			case 83: 
				player = 1;
				start = player1Position;				
				finish = start + gridWidth;
				break;
			case 65:
				player = 1;
				start = player1Position;
				finish = start - 1;
				break;
			case 38: 
				player = 2;
				start = player2Position;
				finish = start - gridWidth;
				break;
			case 39: 
				player = 2;
				start = player2Position;
				finish = start + 1;
				break;
			case 40: 
				player = 2;
				start = player2Position;
				finish = start + gridWidth;
				break;
			case 37:
				player = 2;
				start = player2Position;
				finish = start - 1;
				break;
			default: 
				return;
		}
		playerMove(player, start, finish);
	})
//====================================================================//



});
