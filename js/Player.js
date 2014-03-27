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
		spitMovie,
		jumpMovie,
		slideMovie,
		direction = "right",
		scale = 1;

	var initMovie = function(movie) {
		movie.anchor.x = movie.anchor.y =  0.5;//1;
		movie.play();
		movie.animationSpeed = 0.1;
		stage.addChild(movie);
	}

	var init = function(stage) {
		leftMovie = new PIXI.MovieClip(llamaLeftFrames);
		rightMovie = new PIXI.MovieClip(llamaRightFrames);
		jumpMovie = new PIXI.MovieClip(llamaJumpFrames);
		spitMovie = new PIXI.MovieClip(llamaSpitFrames);
		slideMovie = new PIXI.MovieClip(llamaSlideFrames);

		initMovie(leftMovie);
		initMovie(rightMovie);
		initMovie(jumpMovie);
		initMovie(spitMovie);
		initMovie(slideMovie);
	}(stage);

	var update = function(newX, newY) {
		x = newX*scale;
		y = newY*scale;
	};

	var draw = function(time, direction) {
		var movie;

		rightMovie.position.y = -100;
		leftMovie.position.y = -100;
		jumpMovie.position.y = -100;
		spitMovie.position.y = -100;
		slideMovie.position.y = -100;

		if (jumpTicks < jumpTime){
			movie = jumpMovie;
		} else if (spitTicks < spitTime){
			movie = spitMovie;
		} else if (slideTicks < slideTime){
			if(!slideMovie.playing) slideMovie.play();
			movie = slideMovie;
		} else if(direction == "left") {
			movie = leftMovie;
		} else {
			movie = rightMovie;
		}
		stage.addChild(movie);

		if (slideTicks >= slideTime){
			slideMovie.stop();
		}

		movie.position.x = x;
		movie.position.y = y;

	  // just for fun, lets rotate mr rabbit a little
	  //image.rotation += 0.1;

	  movie.scale.x = scale*2;
		movie.scale.y = scale*2;
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
