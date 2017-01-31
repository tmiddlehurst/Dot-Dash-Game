document.addEventListener('DOMContentLoaded', function() {
	console.log("hello world");

//=========================== 'Go' Button ==============================//

	$("#go-button").click(function(){
		console.log("go working");
	   	$("#timer-and-scores").show();
	   	$("#gameGrid").show();
	   	$(".gridTiles").show();
    	$("#instructions").slideUp();
    	var score = Math.floor(Math.random()*(gridHeight*gridWidth));
    	console.log(score);
    	var tiles = $(".gridTiles");


	});

//======================================================================//

//=================== Game-Start Countdown (not working) ===============//

	// function goCountdown {
	// 	var count = 3;
	// 	var counter = setInterval(timer,1500);

	// 	function timer {

	// 	}
	// }

	var gridWidth = 25, gridHeight = 16;
	var gameGrid = $("#gameGrid");
	var player1 = (gridWidth*(Math.round(gridHeight)/2)+Math.round(gridWidth/10));
	var player2 = (gridWidth*((Math.round(gridHeight)/2)+1)-(1+Math.round(gridWidth/10)));
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

	createGrid();
//=====================================================================//

//=========================== Player Movement =========================//
//============================================== player 1 =============// 
	function player1Move (start, finish) {
		var tiles = $(".gridTiles");
		$(tiles[finish]).css("background-color", "red");
		$(tiles[start]).css("background", "none");

		console.log(start, finish);
		player1 = finish;
	}

	$(document).on("keyup", function(event) {
		var start = player1;
		var finish;
		switch(event.keyCode) {
			case 87: 
				finish = start - gridWidth;
				break;
			case 68: 
				finish = start + 1;
				break;
			case 83: 
				finish = start + gridWidth;
				break;
			case 65:
				finish = start - 1;
				break;
			default: 
				return;
		}
		player1Move(start, finish);
	})

//====================================================================//
//============================================= player 2 =============//

	function player2Move (start, finish) {
		var tiles = $(".gridTiles");
		$(tiles[finish]).css("background-color", "blue");
		$(tiles[start]).css("background", "none");

		console.log(start, finish);
		player2 = finish;
	}

	$(document).on("keyup", function(event) {
		var start = player2;
		var finish;
		switch(event.keyCode) {
			case 38: 
				finish = start - gridWidth;
				break;
			case 39: 
				finish = start + 1;
				break;
			case 40: 
				finish = start + gridWidth;
				break;
			case 37:
				finish = start - 1;
				break;
			default: 
				return;
		}
		player2Move(start, finish);
	})

//====================================================================//
//====================================================================//

//===========================

});
