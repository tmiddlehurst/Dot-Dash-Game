document.addEventListener('DOMContentLoaded', function() {

	var gridWidth = 18, gridHeight = 14;
	var gameGrid = $("#gameGrid");
	var player1Score = 0;
	var player2Score = 0;
	var player1Position = (gridWidth*(Math.round(gridHeight)/2)+Math.round(gridWidth/10));
	var player2Position = (gridWidth*((Math.round(gridHeight)/2)+1)-(1+Math.round(gridWidth/10)));
	createGrid();
	var scoreTileNumber = createScoreTile();

	// #694349 = the purple from mixing red and blue

//====================== Key Up Event Listener =========================//

	$(document).on("keyup", function(event) {
		var player, start, finish;
		switch(event.keyCode) {
			case 87: 
				player = 1;
				start = player1Position;
				finish = moveWrapUp(start, finish, gridWidth, gridHeight);
				break;
			case 68: 
				player = 1;
				start = player1Position;
				finish = moveWrapRight(start, finish, gridWidth, gridHeight);
				break;
			case 83: 
				player = 1;
				start = player1Position;				
				finish = moveWrapDown(start, finish, gridWidth, gridHeight);
				break;
			case 65:
				player = 1;
				start = player1Position;
				finish = moveWrapLeft(start, finish, gridWidth, gridHeight);
				break;
			case 38: 
				player = 2;
				start = player2Position;
				finish = moveWrapUp(start, finish, gridWidth, gridHeight);
				break;
			case 39: 
				player = 2;
				start = player2Position;
				finish = moveWrapRight(start, finish, gridWidth, gridHeight);
				break;
			case 40: 
				player = 2;
				start = player2Position;
				finish = moveWrapDown(start, finish, gridWidth, gridHeight);
				break;
			case 37:
				player = 2;
				start = player2Position;
				finish = moveWrapLeft(start, finish, gridWidth, gridHeight);
				break;
			default: 
				return;
		}
		playerMove(player, start, finish);
	})
//======================================================================//


//============================ Pad Scoring =============================//

	function pad(player, player1Score, player2Score) {
		if (player === 1) {
	    	return (player1Score < 10) ? '0' + player1Score.toString() : player1Score.toString();
		} else {
	    	return (player2Score < 10) ? '0' + player2Score.toString() : player2Score.toString();
		}
	}
//======================================================================//

//=========================== Load PLayers =============================//

	function loadPlayers (player1Position, player2Position) {
		var tiles = $(".gridTiles");
		$(tiles[player1Position]).css("background-color", "#F03A47");
	}

//======================================================================//

//=========================== 'Go' Button ==============================//

	$("#go-button").click(function() {
    	$("#instructions").slideUp();
    	startCountdown();

	});
//======================================================================//

//=========================='Replay' Button ============================//

	$("#replay-button").click(function() {
		location.reload();
	});
//======================================================================//

//======================== Game-Start Countdown ========================//
	function startCountdown() {
		$("#countdown-to-start").show();
		var counter = 3;
		var interval = setInterval(function() {
		    $('#countdown-to-start').html(counter);
		    counter--;
		    if (counter === -1) {
		    	$("#gameGrid").show();
			   	$(".gridTiles").show();
			   	$("#game-timer").show();
		        $("#countdown-to-start").hide();
		       	$("#timer-and-scores").show();
		        clearInterval(interval);
		        updateScoreBoards(player1Score,player2Score);
		        gameTimer();
		        playThemeMusic();
		    }
		}, 750);
	}
//======================================================================//

//========================== Theme Music ===============================//

	function playThemeMusic () {
		var theme = new Audio('Sounds/51239__rutgermuller__8-bit-electrohouse.wav');
		theme.play();
	}

//======================================================================//

//======================== toggle game area ============================//

	// function toggleGame () {
	// 	$("#gameGrid").show();
	//    	$(".gridTiles").show();
	//    	$("#game-timer").show();
 //        $("#countdown-to-start").hide();
 //       	$("#timer-and-scores").show();

	// };

//======================================================================//

//======================== Game 1 min timer ============================//


	function gameTimer () {
		var counter = 30;
		var interval = setInterval (function() {
			$("#game-timer").html(counter);
			counter--;
			if (counter === -1) {
		        clearInterval(interval);
				checkWinner(player1Score,player2Score);
				showWinScreen();
			}
		}, 1000);
	}
//======================================================================//

//======================== Check Winner ================================//

	function checkWinner (player1Score, player2Score) {
		if (player1Score > player2Score) {
			return "Player 1 Wins!";
		} else if (player2Score > player1Score) {
			return "Player 2 Wins!";
		} else {
			return "It Was a Tie!";
		}
	}

//======================================================================//

//========================= Show Win Screen ============================//
	function showWinScreen () {
		$("#gameGrid").hide();
		$(".gridTiles").hide();
		$("#game-timer").hide();
		$("#win-screen").show();
		$("#win-text").html(checkWinner(player1Score,player2Score));

	}

//======================================================================//

//========================== Create Game Grid ==========================//

	function createGrid () {
		var tileWidth = ((gameGrid.width()-1)/gridWidth);
		var tileHeight = ((gameGrid.height()-21)/gridHeight);
		loadPlayers(player1Position, player2Position);

		for (var i = 0; i < (gridHeight*gridWidth); i++) {
			var newTile = $('<li></li>');
			newTile.attr("class","gridTiles");
			newTile.css('width', tileWidth + 'px').css('height', tileHeight + 'px');
			gameGrid.append(newTile);
		}
	}
//======================================================================//

//======================== Create Score Tile ===========================//

	function createScoreTile() {
    	var scoreTile = Math.floor(Math.random()*(gridHeight*gridWidth));
    	var tiles = $(".gridTiles");
    	$(tiles[scoreTile]).css("color", "black").html("+1");
    	return scoreTile;
    }
//======================================================================// 

//============================== Scoring ===============================// 

	function incrementPlayerScore (player) {
		if (player === 1) {
			player1Score++;
		} else {
			player2Score++;
		};
		var audio = new Audio('Sounds/Pickup_Coin26.wav');
		audio.play();
		updateScoreBoards(player1Score, player2Score);
	}


//======================================================================//

//======================== Update Scores ===============================//
	function updateScoreBoards (player1Score, player2Score) {
    	$('#player1-scoreboard').html(player1Score);
    	$('#player2-scoreboard').html(player2Score);
    }

//======================================================================//

//======================= Up-Down Movement Wrap ========================//

	function moveWrapUp (start, finish, gridWidth, gridHeight) {
		if (start < gridWidth) {
			finish = (start + (gridWidth*gridHeight)-gridWidth);
		} else {
			finish = start - gridWidth;
		}
		return finish;
	}
	function moveWrapDown (start, finish, gridWidth, gridHeight) {
		var bottomLeftValue = (gridWidth*gridHeight)-gridWidth;
		if (start > bottomLeftValue) {
			finish = (start - bottomLeftValue);
		} else {
			finish = start + gridWidth;
		}
		return finish;
	}
//======================================================================//

//====================== Left-Right Movement Wrap ======================//
	
	function moveWrapRight (start, finish, gridWidth, gridHeight) {
		var a = ((start+1)%gridWidth);
		if (a === 0) {
			finish = start - gridWidth + 1;
		} else {
			finish = start +1;
		}
		return finish;
	}

	function moveWrapLeft (start, finish, gridWidth, gridHeight) {
		if ((start%gridWidth) === 0) {
			finish = start + gridWidth - 1;
		} else {
			finish = start -1;
		}
		return finish;
	}

//======================================================================//

//=========================== Player Movement ==========================//
	function playerMove (player, start, finish) {
		var tiles = $(".gridTiles");
		if (player === 1) {
			player1Position = finish;
			$(tiles[finish]).css("color", "#F03A47").html("⬤").css("font-size", "20px");
		} else {
			player2Position = finish;
			$(tiles[finish]).css("color", "#276FBF").html("⬤").css("font-size", "20px");
		}
		$(tiles[start]).css("background", "none").html("");

		collision(player1Position,player2Position, tiles);

		if (finish === scoreTileNumber) {
			incrementPlayerScore(player);
			scoreTileNumber = createScoreTile();
		}
	}
//====================================================================//

//========================== Collision ===============================//
	
	function collision (player1Position, player2Position, tiles) {
		if (player1Position === player2Position) {
			$(tiles[player1Position]).css("color", "#694349").html("⬤").css("font-size", "25px");
		}
	}
//====================================================================//

//====================================================================//
	
//====================================================================//


//====================================================================//



});
