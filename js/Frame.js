/**************************************************
** GAME FRAME CLASS
**************************************************/
var Frame = function(id) {
	var stage,			// PIXI Stage element
		renderer,		// PIXI Renderer
		background,
		localPlayer;	// Local player

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

		// Initialise the background
		background = new Background(stage, 320, 240);

		// Initialise the local player
		localPlayer = new Player(stage, startX, startY);
	}();

	var changePosition = function(x,y,width,height) {
		renderer.resize(width, height);
		renderer.view.style.top=y+"px";
		renderer.view.style.left=x+"px";

		background.changeSize(width, height);
	}

	var update = function(keys) {
		background.update(keys);
		localPlayer.update(keys);
	};

	var draw = function() {
		// Draw background
		background.draw();

		// Draw the local player
		localPlayer.draw();
		
		renderer.render(stage);
	};

	return {
		changePosition: changePosition,
		update: update,
		draw: draw
	}
};