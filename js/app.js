document.addEventListener('DOMContentLoaded', function() {
	console.log("hello");

//=========================== 'Go' Button ==============================//

	$("#go-button").click(function(){
		console.log("go working");
	   	$("#timer-and-scores").show();
	   	$(".gameGrid").show();
	   	$(".gridSquares").show();
    	$("#instructions").slideUp();

	});

//======================================================================//

//=================== Game-Start Countdown (not working) ===============//

	// function goCountdown {
	// 	var count = 3;
	// 	var counter = setInterval(timer,1500);

	// 	function timer {

	// 	}
	// }

	var gridWidth = 18, gridHeight = 11;
	var gameGrid = $("#gameGrid");
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

	function playerMove () {
		var playerSquare = 92;
		var tiles = $(".gridTiles");
		console.log(tiles[92]);
		$(tiles[92]).css("background-color", "red");
		// $(squares[92]).html(•);

	}
	playerMove();

});
