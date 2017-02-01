document.addEventListener('DOMContentLoaded', function() {

	var gridWidth = 20, gridHeight = 16;
	var gameGrid = $("#gameGrid");
	var player1Score = 0;
	var player2Score = 0;
	var player1Position = (gridWidth*(Math.round(gridHeight)/2)+Math.round(gridWidth/10));
	var player2Position = (gridWidth*((Math.round(gridHeight)/2)+1)-(1+Math.round(gridWidth/10)));
	createGrid();
	var scoreTileNumber = createScoreTile();

	// #694349 = the purple from mixing red and blue


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

	$(".go-button").click(function() {
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
			   	$("#game-timer").show();
		        $("#countdown-to-start").hide();
		       	$("#timer-and-scores").show();
		        clearInterval(interval);
		        updateScoreBoards(player1Score,player2Score);
		        gameTimer();
		    }
		}, 1000);
	}
//======================================================================//

//======================== toggle game area ============================//

	function toggleGame () {

	};

//======================================================================//

//======================== Game 1 min timer ============================//


	function gameTimer () {
		var counter = 100;
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
			console.log("1");
			return "Player 1 Wins!";
		} else if (player2Score > player1Score) {
			console.log("2");
			return "Player 2 Wins!";
		} else {
			console.log("draw")
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
		var bottomLeftValue = ((gridWidth*gridHeight)-gridWidth)
		if (start > bottomLeftValue) {
			finish = (start - bottomLeftValue);
		} else {
		finish = start + gridWidth;
		}
		return finish;
	}
//======================================================================//

//====================== Left-Right Movement Wrap ======================//

//======================================================================//

//=========================== Player Movement ==========================//
	function playerMove (player, start, finish) {
		var tiles = $(".gridTiles");

		if (player === 1) {
			player1Position = finish;
			$(tiles[finish]).css("background-color", "#9e2a2a");
		} else {
			player2Position = finish;
			$(tiles[finish]).css("background-color", "#335b67");
		}
		$(tiles[start]).css("background", "none");

		if (finish === scoreTileNumber) {
			console.log("Score");
			incrementPlayerScore(player);
			scoreTileNumber = createScoreTile();
		}
	}
//====================================================================//
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
				finish = start + 1;
				break;
			case 83: 
				player = 1;
				start = player1Position;				
				finish = moveWrapDown(start, finish, gridWidth, gridHeight);
				break;
			case 65:
				player = 1;
				start = player1Position;
				finish = start - 1;
				break;
			case 38: 
				player = 2;
				start = player2Position;
				finish = moveWrapUp(start, finish, gridWidth, gridHeight);
				break;
			case 39: 
				player = 2;
				start = player2Position;
				finish = start + 1;
				break;
			case 40: 
				player = 2;
				start = player2Position;
				finish = moveWrapDown(start, finish, gridWidth, gridHeight);
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


//====================================================================//



});
