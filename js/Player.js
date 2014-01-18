/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(stage,startX, startY, theme) {
	var x = startX,
		y = startY,
		theme = theme,
		moveAmount = 5,
		texture,
		image,
		scale = 1;
		

	var init = function(stage) {
		texture = PIXI.Texture.fromImage("assets/player" + theme + ".png");
		// create a new Sprite using the texture
		image = new PIXI.Sprite(texture);

		// center the sprites anchor point
		image.anchor.x = 0.5;
		image.anchor.y = 0.5;

		stage.addChild(image);
	}(stage);

	var update = function(newX, newY) {
		x = newX;
		y = newY*scale;
	};

	var draw = function() {
		image.position.x = x;
		image.position.y = y;

	    // just for fun, lets rotate mr rabbit a little
	    image.rotation += 0.1;
	};
	
	var changeSize = function(scale) {
		image.scale.x = scale;
		image.scale.y = scale;
		scale = scale;
		
	};

	return {
		update: update,
		draw: draw,
		changeSize : changeSize
	}
};