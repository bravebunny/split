/**************************************************
** GAME FRAME CLASS
**************************************************/
var Frame = function(id) {
	var canvas,			// Canvas DOM element
		ctx,			// Canvas rendering context
	//	keys,			// Keyboard input
		localPlayer;	// Local player

	var init = function() {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext("2d");
		canvas.id     = "CursorLayer";
		canvas.width  = window.innerWidth/frames.length+2;
		canvas.height = window.innerHeight;
		canvas.style.position = "absolute";
		canvas.style.top="0px";
		canvas.style.left=frames*"px";
		canvas.style.zIndex   = 8;
		canvas.style.border   = "1px solid";
		document.body.appendChild(canvas);

		// Calculate a random start position for the local player
		// The minus 5 (half a player size) stops the player being
		// placed right on the egde of the screen
		var startX = Math.round(Math.random()*(canvas.width-5)),
			startY = Math.round(Math.random()*(canvas.height-5));

		// Initialise the local player
		localPlayer = new Player(startX, startY);
	}();

	var changePosition = function(x,y,width,height) {
		canvas.width  = width;
		canvas.height = height;
		canvas.style.top=y+"px";
		canvas.style.left=x+"px";
	}

	var update = function(keys) {
		localPlayer.update(keys);
	};

	var draw = function() {
		// Wipe the canvas clean
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the local player
		localPlayer.draw(ctx);
	};

	return {
		changePosition: changePosition,
		update: update,
		draw: draw
	}
};