/**************************************************
** GAME FRAME CLASS
**************************************************/
var Frame = function(id) {
	var stage,			// PIXI Stage element
		renderer,		// PIXI Renderer
		background,
		localPlayer,	// Local player
		lover,
		theme;

	var init = function() {
		stage = new PIXI.Stage(0x002633);
		renderer = PIXI.autoDetectRenderer(320, 240);
		renderer.view.style.position = "absolute";
		renderer.view.style.top="0px";
		renderer.view.style.left="0px";
		renderer.view.style.border   = "1px solid";

		document.body.appendChild(renderer.view);

		// Set the initial position
		var startX = 100,
			startY = 10;

		theme = getRandomInt(1, 6);

		// Initialise the background
		background = new Background(stage, 320, 240, theme);

		// Initialise the local player
		localPlayer = new Player(stage, startX, startY, theme);
		lover = new Lover(stage, realX, startY, theme);
	}();

	var changePosition = function(x,y,width,height) {
		renderer.resize(width, height);
		renderer.view.style.top=y+"px";
		renderer.view.style.left=x+"px";

		var newSize = background.changeSize(width, height);
		localPlayer.changeSize(newSize);
		lover.changeSize(newSize);
	}

	var update = function(newX, newY) {
		background.update(newX, newY);
		localPlayer.update(100, newY);
		lover.update(newX, groundLevel);
	};

	var draw = function(time, direction) {
		// Draw background
		background.draw();

		// Draw the local player
		localPlayer.draw(time, direction);
		lover.draw(time, direction);

		renderer.render(stage);
	};

	return {
		changePosition: changePosition,
		update: update,
		draw: draw
	}
};
