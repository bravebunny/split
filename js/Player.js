/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(stage,startX, startY) {
	var x = startX,
		y = startY,
		moveAmount = 5,
		texture,
		bunny;

	var init = function(stage) {
		texture = PIXI.Texture.fromImage("assets/bunny.png");
		// create a new Sprite using the texture
		bunny = new PIXI.Sprite(texture);

		// center the sprites anchor point
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 0.5;

		stage.addChild(bunny);
	}(stage);

	var update = function(newX, newY) {
		x = newX;
		y = newY;
	};

	var draw = function() {
		bunny.position.x = x;
		bunny.position.y = y;

	    // just for fun, lets rotate mr rabbit a little
	    bunny.rotation += 0.1;
	};

	return {
		update: update,
		draw: draw
	}
};