document.addEventListener('DOMContentLoaded', function() {
	console.log("hello");

	$("#go-button").click(function(){
		console.log("go working");
	   	$("#timer-and-scores").show();
    	$("#instructions").slideUp();

	});

	// function goCountdown {
	// 	var count = 3;
	// 	var counter = setInterval(timer,1500);

	// 	function timer {

	// 	}
	// }

	var gridWidth = 18, gridHeight = 11;
	var gameGrid = $("#gameGrid");

	function createGrid () {
		var squareWidth = ((gameGrid.width()-1)/gridWidth);
		var squareHeight = ((gameGrid.height()-1)/gridHeight);

		for (var i = 0; i < (gridHeight*gridWidth); i++) {
			var newSquare = $('<li></li>');
			newSquare.html(i).attr("class","gridSquares");
			newSquare.css('width', squareWidth + 'px').css('height', squareHeight + 'px');
			gameGrid.append(newSquare);
		}
	}

	createGrid();


	function playerMove () {
		var playerSquare = 92;
		var squares = $(".gridSquares");
		console.log(squares[92]);
		$("#squares"[92]).css("background-color", "red");
		// squares[92].append(•);

	}
	playerMove();

});
