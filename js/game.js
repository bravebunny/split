/**************************************************
** GAME VARIABLES
**************************************************/
var loader,
	frames,			// Frames
	keys,			// Keyboard input
	x,
	y,
	time = 0,
	moveAmount = 5,
	groundLevel = 330,
	direction = "right",
	localPlayer,	// Local player
	canCreateFrame = true;

var jumpTime = 500,
		jumpTicks = 500,
		jumpSpeed = 20,
		jumpAcceleration = 0.8,
		baseY = groundLevel;

var spitTicks = 500,
		spitTime = 60;

var slideTicks = 500,
		slideTime = 120;

var llamaLeftFrames = [],
		llamaRightFrames = [],
		llamaSpitFrames = [],
		llamaJumpFrames = [],
		llamaSlideFrames = [],
		llamaLoverFrames = [];


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Initialise keyboard controls
	keys = new Keys();

	// Initialise frames array
	frames = [];

	x = 0, y = groundLevel;

	// Start listening for events
	setEventHandlers();

	// create an array of assets to load
	var assetsToLoader = [ "llama.json"];

	// create a new loader
	loader = new PIXI.AssetLoader(assetsToLoader);

	// use callback
	loader.onComplete = onAssetsLoaded;

	//begin load
	loader.load();

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

function onAssetsLoaded()
{
	// create a texture from an image path
	for (var i = 1; i < 4; i++) {
		llamaLeftFrames.push(PIXI.Texture.fromFrame("llamaLeft" + i + ".png"));
		llamaRightFrames.push(PIXI.Texture.fromFrame("llamaRight" + i + ".png"));
	};
	for (var i = 1; i < 3; i++) {
		llamaJumpFrames.push(PIXI.Texture.fromFrame("llamaJump" + i + ".png"));
	};
	for (var i = 1; i < 13; i++) {
		llamaSlideFrames.push(PIXI.Texture.fromFrame("llamaSlide" + i + ".png"));
	};
	for (var i = 1; i < 5; i++) {
		llamaSpitFrames.push(PIXI.Texture.fromFrame("llamaSpit" + i + ".png"));
	};
	for (var i = 1; i < 5; i++) {
		llamaLoverFrames.push(PIXI.Texture.fromFrame("llamaLover" + i + ".png"));
	};


	// Push the first frame
	frames.push(new Frame("frame" + frames.length));
	updateFramesPosition();

	animate();
}


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
	updatePosition();

	for(var i=0; i<frames.length; i++) {
		frames[i].update(x,y,time);
	}

	if (jumpTicks < jumpTime){
		if (y <= baseY){
  		y = (baseY - (jumpSpeed * jumpTicks) + (0.5 * jumpAcceleration * jumpTicks * jumpTicks))
		}
		else{
  		y = baseY
  		jumpTicks = jumpTime;
		}
	}

	jumpTicks++;
	spitTicks++;
	slideTicks++;

	time += 1;
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	for(var i=0; i<frames.length; i++) {
		frames[i].draw(time, direction);
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


/**************************************************
** UPDATE POSITION
**************************************************/
function updatePosition() {
	// Up key takes priority over down
	if (keys.up && jumpTicks >= jumpTime){
			jumpTicks = 0
			baseY = y;
	} else if (keys.down && slideTicks >= slideTime) {
		slideTicks = 0;
	} else if (keys.right && spitTicks >= spitTime) {
		spitTicks = 0;
	};

	// Left key takes priority over right
	/*
	if (keys.left) {
		x -= moveAmount;
		direction = "left";
	} else if (keys.right) {
		x += moveAmount;
		direction = "right";
	};*/

	//if (spitTicks >= spitTime) {
		x += moveAmount;
	//};

	direction = "right";
}

function newFrame() {
	if(canCreateFrame) {
		frames.push(new Frame("frame" + frames.length));
		setTimeout(function() {canCreateFrame = true}, 2000);
	}
	updateFramesPosition();
}
