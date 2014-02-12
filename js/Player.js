/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(stage,startX, startY, theme) {
	var x = startX,
		y = startY,
		theme = theme,
		moveAmount = 5,
		texture,
		leftMovie,
		rightMovie,
		direction = "right";
		scale = 1
		

	var init = function(stage) {
		leftMovie = new PIXI.MovieClip(llamaLeftFrames);
		rightMovie = new PIXI.MovieClip(llamaRightFrames);

		leftMovie.anchor.x = leftMovie.anchor.y =  0.5//1;
		leftMovie.play();
		leftMovie.animationSpeed = 0.1;
		stage.addChild(leftMovie);

		rightMovie.anchor.x = rightMovie.anchor.y =  0.5//1;
		rightMovie.play();
		rightMovie.animationSpeed = 0.1;
		stage.addChild(rightMovie);
	}(stage);

	var update = function(newX, newY) {
		x = newX*scale;
		y = newY*scale;
	};

	var draw = function(time, direction) {
		var movie;
		if(direction == "left") {
			movie = leftMovie;

			rightMovie.position.y = -100;
		} else {
			movie = rightMovie;

			leftMovie.position.y = -100;
		}
		stage.addChild(movie);

		movie.position.x = x;
		movie.position.y = y;

	  // just for fun, lets rotate mr rabbit a little
	  //image.rotation += 0.1;

	  movie.scale.x = scale;
		movie.scale.y = scale;
	};
	
	var changeSize = function(newScale) {
		scale = newScale;
	};

	return {
		update: update,
		draw: draw,
		changeSize : changeSize
	}
};