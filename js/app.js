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

	function createGrid () {
		var gridWidth = 4;
		var gridHeight = 4;
		for (var i = 0; i < (gridHeight*gridWidth); i++) {
			var newSquare = document.createElement('li');
			newSquare.textContent = i;
			newSquare.setAttribute("class","gridSquares");
			gameGrid.appendChild(newSquare);
		}
	}
		createGrid();	

});
