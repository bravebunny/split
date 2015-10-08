import PIXI from 'pixi.js'

export default class {
  constructor (stage, width, height) {
    this.changeSize = this.changeSize.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.originalHeight = 532

    this.x = 0
    this.scale = 1

    this.backgroundFar = PIXI.extras.TilingSprite.fromImage('background-far.png', width, height)
    this.backgroundMiddle = PIXI.extras.TilingSprite.fromImage('background-middle.png', width, height)
    this.backgroundNear = PIXI.extras.TilingSprite.fromImage('background-near.png', width, height)

    const initBackground = (background) => {
      background.position.x = 0
      background.position.y = 0
      background.tilePosition.x = 0
      background.tilePosition.y = 0
      stage.addChild(background)
    }

    initBackground(this.backgroundFar)
    initBackground(this.backgroundMiddle)
    initBackground(this.backgroundNear)
  }

  update (x) {
    this.x = -x
  }

  draw () {
    this.backgroundFar.tilePosition.x = this.x / 3
    this.backgroundMiddle.tilePosition.x = this.x / 2
    this.backgroundNear.tilePosition.x = this.x
  }

  changeSize (width, height) {
    this.scale = height / this.originalHeight

    const scaleBackground = (background) => {
      background.width = width
      background.height = height
      background.tileScale.x = this.scale
      background.tileScale.y = this.scale
    }

    scaleBackground(this.backgroundFar)
    scaleBackground(this.backgroundMiddle)
    scaleBackground(this.backgroundNear)

    return this.scale
  }
}
