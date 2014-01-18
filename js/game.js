/**************************************************
** GAME VARIABLES
**************************************************/
var frames,			// Frames
	keys,			// Keyboard input
	localPlayer;	// Local player


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Initialise keyboard controls
	keys = new Keys();

	// Initialise frames array
	frames = [];

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// Window resize
	window.addEventListener("resize", onResize, false);
};

// Keyboard key down
function onKeydown(e) {
	keys.onKeyDown(e);
};

// Keyboard key up
function onKeyup(e) {
	keys.onKeyUp(e);
};

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	updateFramesPosition();
};


/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	for(var i=0; i<frames.length; i++) {
		frames[i].update(keys);
	}

	if (keys.space && frames.length < 6) {
		frames.push(new Frame("frame" + frames.length));
		updateFramesPosition();
		keys.space = false;
	}
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	for(var i=0; i<frames.length; i++) {
		frames[i].draw();
	}
};

/**************************************************
** UPDATE EACH FRAME POSITION
**************************************************/
function updateFramesPosition() {
	switch(frames.length) {
		case 1:
			frames[0].changePosition(0,0,window.innerWidth, window.innerHeight);
			break;
		case 2:
			frames[0].changePosition(0,0,window.innerWidth/2, window.innerHeight);
			frames[1].changePosition(window.innerWidth/2,0,window.innerWidth/2, window.innerHeight);
			break;
		case 3:
			frames[0].changePosition(0,0,window.innerWidth/2, window.innerHeight/2);
			frames[1].changePosition(window.innerWidth/2,0,window.innerWidth/2, window.innerHeight/2);
			frames[2].changePosition(window.innerWidth/4,window.innerHeight/2,window.innerWidth/2, window.innerHeight/2);
			break;
		case 4:
			frames[0].changePosition(0,0,window.innerWidth/2, window.innerHeight/2);
			frames[1].changePosition(window.innerWidth/2,0,window.innerWidth/2, window.innerHeight/2);
			frames[2].changePosition(0,window.innerHeight/2,window.innerWidth/2, window.innerHeight/2);
			frames[3].changePosition(window.innerWidth/2,window.innerHeight/2,window.innerWidth/2, window.innerHeight/2);
			break;
		case 5:
			frames[0].changePosition(0,0,window.innerWidth/3, window.innerHeight/2);
			frames[1].changePosition(0,window.innerHeight/2,window.innerWidth/3, window.innerHeight/2);
			frames[2].changePosition(2*window.innerWidth/3,0,window.innerWidth/3, window.innerHeight/2);
			frames[3].changePosition(2*window.innerWidth/3,window.innerHeight/2,window.innerWidth/3, window.innerHeight/2);
			frames[4].changePosition(window.innerWidth/3,window.innerHeight/4,window.innerWidth/3, window.innerHeight/2);
			break;
		case 6:
			frames[0].changePosition(0,0,window.innerWidth/3, window.innerHeight/2);
			frames[1].changePosition(0,window.innerHeight/2,window.innerWidth/3, window.innerHeight/2);
			frames[2].changePosition(2*window.innerWidth/3,0,window.innerWidth/3, window.innerHeight/2);
			frames[3].changePosition(2*window.innerWidth/3,window.innerHeight/2,window.innerWidth/3, window.innerHeight/2);
			frames[4].changePosition(window.innerWidth/3,0,window.innerWidth/3, window.innerHeight/2);
			frames[5].changePosition(window.innerWidth/3,window.innerHeight/2,window.innerWidth/3, window.innerHeight/2);
			break;
	}
}