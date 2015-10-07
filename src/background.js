import PIXI from 'pixi.js'

export default class {
  constructor (stage, width, height) {
    this.changeSize = this.changeSize.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.tilingSprite = PIXI.extras.TilingSprite.fromImage('background.png', width, height)

    this.tilingSprite.position.x = 0
    this.tilingSprite.position.y = 0
    this.tilingSprite.tilePosition.x = 0
    this.tilingSprite.tilePosition.y = 0

    this.originalHeight = 532

    this.x = 0
    this.scale = 1

    stage.addChild(this.tilingSprite)
  }

  update (x) {
    this.x = -x
  }

  draw () {
    this.tilingSprite.tilePosition.x = this.x
  }

  changeSize (width, height) {
    this.scale = height / this.originalHeight

    this.tilingSprite.width = width
    this.tilingSprite.height = height

    this.tilingSprite.tileScale.x = this.scale
    this.tilingSprite.tileScale.y = this.scale

    return this.scale
  }
}
