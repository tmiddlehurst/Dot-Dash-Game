document.addEventListener('DOMContentLoaded', function() {


	var gridWidth = 25, gridHeight = 16;
	var gameGrid = $("#gameGrid");
	var player1Position = (gridWidth*(Math.round(gridHeight)/2)+Math.round(gridWidth/10));
	var player2Position = (gridWidth*((Math.round(gridHeight)/2)+1)-(1+Math.round(gridWidth/10)));
	createGrid();
	var scoreTileNumber = createScoreTile();

//=========================== 'Go' Button ==============================//

	$("#go-button").click(function(){
		console.log("go working");
	   	$("#timer-and-scores").show();
	   	$("#gameGrid").show();
	   	$(".gridTiles").show();
    	$("#instructions").slideUp();


	});

//======================================================================//
//======================== Create Score Tile ===========================//

	function createScoreTile() {
    	var scoreTile = Math.floor(Math.random()*(gridHeight*gridWidth));
    	var tiles = $(".gridTiles");
    	$(tiles[scoreTile]).css("background-color", "green");
    	return scoreTile;
    }

//======================================================================// 
//======================== Scoring =====================================// 

	function incrementPlayerScore (player) {
		playerScore1=0
		playerScore2=0
		("playerScore"+player)++;
		console.log(player);
	}


//======================================================================// 


//=================== Game-Start Countdown (not working) ===============//

	// function goCountdown {
	// 	var count = 3;
	// 	var counter = setInterval(timer,1500);

	// 	function timer {

	// 	}
	// }


//=====================================================================//

//========================== Create Game Grid =========================//

	function createGrid () {
		var tileWidth = ((gameGrid.width()-1)/gridWidth);
		var tileHeight = ((gameGrid.height()-1)/gridHeight);

		for (var i = 0; i < (gridHeight*gridWidth); i++) {
			var newTile = $('<li></li>');
			newTile.html(i).attr("class","gridTiles");
			newTile.css('width', tileWidth + 'px').css('height', tileHeight + 'px');
			gameGrid.append(newTile);
		}
	}

//=====================================================================//

//=========================== Player Movement =========================//
	function playerMove (player, start, finish) {
		var tiles = $(".gridTiles");
		$(tiles[finish]).css("background-color", "red");
		$(tiles[start]).css("background", "none");
		if (player === 1) {
			player1Position = finish;
		} else {
			player2Position = finish;
		}
		if (finish === scoreTileNumber) {
			console.log("DUNNIT");
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
