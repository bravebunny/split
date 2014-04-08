/**************************************************
** GAME FRAME CLASS
**************************************************/
var Frame = function(num) {
	var stage,			// PIXI Stage element
		renderer,		// PIXI Renderer
		background,
		localPlayer,	// Local player
		lover,
		rock,
		id = num,
		theme;

	var init = function() {
		stage = new PIXI.Stage(backgroundColors[id]);
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
		rock = new Stone(stage, realX, startY, theme);

		setInterval(function(){lover = new Lover(stage, realX, startY, theme);}, getRandomInt(5,15)*1000);
		setInterval(function(){rock = new Stone(stage, realX, startY, theme);}, getRandomInt(5,8)*3000);
	}();

	var changePosition = function(x,y,width,height) {
		renderer.resize(width, height);
		renderer.view.style.top=y+"px";
		renderer.view.style.left=x+"px";

		var newSize = background.changeSize(width, height);
		localPlayer.changeSize(newSize);
		lover.changeSize(newSize);
		rock.changeSize(newSize);
	}

	var update = function(newX, newY) {
		background.update(newX, newY);
		localPlayer.update(100, newY);
		lover.update(newX, groundLevel);
		rock.update(newX, groundLevel, id);
	};

	var draw = function(time, direction) {
		// Draw background
		background.draw();

		// Draw the local player
		localPlayer.draw(time, direction);
		lover.draw(time, direction);
		rock.draw(time, direction);

		renderer.render(stage);
	};

	var kill = function(){
			document.body.removeChild(renderer.view);
	}

	return {
		changePosition: changePosition,
		update: update,
		draw: draw,
		kill: kill
	}
};
