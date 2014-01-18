/**************************************************
** GAME BACKGROUND CLASS
**************************************************/
var Background = function(stage, w, h) {
	var x = 0,
		moveAmount = 5,
		width = w,
		height = h,
		originalHeight = 532,
		texture,
		tilingSprite;

	var init = function(stage) {
		texture = PIXI.Texture.fromImage("assets/city.png");
		// create a tiling sprite..
		// requires a texture, width and height
		// to work in webGL the texture size must be a power of two
		tilingSprite = new PIXI.TilingSprite(texture, width, height)

		tilingSprite.position.x = 0;
		tilingSprite.position.y = 0;
		tilingSprite.tilePosition.x = 0;
		tilingSprite.tilePosition.y = 0;

		stage.addChild(tilingSprite);
	}(stage);

	var update = function(keys) {
		// Left key takes priority over right
		if (keys.left) {
			x += moveAmount;
		} else if (keys.right) {
			x -= moveAmount;
		};
	};

	var draw = function() {
		tilingSprite.tilePosition.x = x;
	};

	var changeSize = function(w, h) {
		var scale = h/originalHeight;

		tilingSprite.width = w;
		tilingSprite.height = h;

		tilingSprite.tileScale.x = scale;
		tilingSprite.tileScale.y = scale;
	}

	return {
		changeSize: changeSize,
		update: update,
		draw: draw
	}
};