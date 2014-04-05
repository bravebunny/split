/**************************************************
** GAME LOVER CLASS
**************************************************/
var Lover = function(stage,sX, startY, theme) {
	var startX = sX+2000,
		x = 0,
		y = 0,
		theme = theme,
		texture,
		loverMovie,
		loved = false,
		scale = 1;

	var initMovie = function(movie) {
		movie.anchor.x = movie.anchor.y =  0.5;//1;
		movie.play();
		movie.animationSpeed = 0.1;
		stage.addChild(movie);
	}

	var init = function(stage) {
		loverMovie = new PIXI.MovieClip(llamaLoverFrames);

		initMovie(loverMovie);
	}(stage);

	var update = function(newX, newY) {
		x = (100-(realX-startX)*scale);
		//x /= scale;
		y = newY*scale;

		if(loved == false && x < 100) {
			loved=true;
			newFrame();
		}
	};

	var draw = function(time, direction) {
		loverMovie.position.x = x;
		loverMovie.position.y = y;

	  loverMovie.scale.x = scale*2;
		loverMovie.scale.y = scale*2;
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
