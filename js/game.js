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

	frames = [];
	frames.push(new Frame("sim"));
	frames.push(new Frame("nao"));

	frames[0].changePosition(0,0,window.innerWidth/2, window.innerHeight);
	frames[1].changePosition(window.innerWidth/2,0,window.innerWidth/2, window.innerHeight);

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
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
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
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	for(var i=0; i<frames.length; i++) {
		frames[i].draw();
	}
};