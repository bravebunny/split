import PIXI from 'pixi.js'
import { GROUND_LEVEL, PLAYER_POSITION, JUMPING } from './consts'
import game from './index'

export default class {
  constructor (stage, x, y) {
    this.changeSize = this.changeSize.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.x = x + 1000
    this.y = GROUND_LEVEL

    this.scale = 1

    const texture = PIXI.Texture.fromImage('stone.png')
    this.sprite = new PIXI.Sprite(texture)

    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5

    stage.addChild(this.sprite)
  }

  update (x, y, state) {
    this.x -= 5
    this.y = GROUND_LEVEL * this.scale

    if (!this.killed && this.x < PLAYER_POSITION && this.x > PLAYER_POSITION - 100 && state !== JUMPING) {
      this.killed = true
      game.destroyFrame(0)
    }
  }

  draw (stage, state) {
    this.sprite.position.x = this.x
    this.sprite.position.y = this.y

    this.sprite.scale.x = this.scale
    this.sprite.scale.y = this.scale
  }

  changeSize (scale) {
    this.scale = scale
  }
}
