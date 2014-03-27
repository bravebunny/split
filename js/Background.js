/**************************************************
** GAME BACKGROUND CLASS
**************************************************/
var Background = function(stage, w, h, theme) {
	var x = 0,
		moveAmount = 5,
		width = w,
		height = h,
		originalHeight = 532,
		texture,
		tilingSprite,
		theme = theme;

	var init = function(stage) {
		//texture = PIXI.Texture.fromImage("assets/background" + theme + ".png");
		texture = PIXI.Texture.fromImage("assets/peru.jpg");
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

	var update = function(newX, newY) {
		x = newX;
		y = newY;
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

		return scale;
	}

	return {
		changeSize: changeSize,
		update: update,
		draw: draw
	}
};
