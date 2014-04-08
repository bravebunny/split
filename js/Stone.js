/**************************************************
** GAME STONE CLASS
**************************************************/
var Stone = function(stage,sX, startY, theme) {
  var startX = sX+1000,
    x = 0,
    y = 0,
    theme = theme,
    texture,
    sprite,
    killed = false,
    scale = 1;

  var init = function(stage) {
    texture = PIXI.Texture.fromImage("assets/stone.png");
		// create a new Sprite using the texture
		sprite = new PIXI.Sprite(texture);

		// center the sprites anchor point
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0;

		stage.addChild(sprite);
  }(stage);

  var update = function(newX, newY, parentId) {
    x = (100-(realX-startX)*scale);
    //x /= scale;
    y = newY*scale;

    if(killed == false && x < 100) {
      killed=true;
      killFrame(parentId);
    }
  };

  var draw = function(time, direction) {
    sprite.position.x = x;
    sprite.position.y = y;

    sprite.scale.x = scale;
    sprite.scale.y = scale;
  };

  var changeSize = function(newScale) {
    scale = newScale;
  };

  return {
    update: update,
    draw: draw,
    changeSize : changeSize
  }
};
