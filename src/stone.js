import PIXI from 'pixi.js'
import { STONE_LEVEL, PLAYER_POSITION, JUMPING, SPEED } from './consts'
import game from './index'

export default class {
  constructor (stage, x, y, scale) {
    this.changeSize = this.changeSize.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.scale = scale

    this.x = x + 1000
    this.y = STONE_LEVEL

    const texture = PIXI.Texture.fromImage('stone.png')
    this.sprite = new PIXI.Sprite(texture)

    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5

    stage.addChild(this.sprite)
  }

  update (x, y, state) {
    this.x -= (SPEED * this.scale)
    this.y = STONE_LEVEL * this.scale

    if (!this.killed && this.x < PLAYER_POSITION && this.x > PLAYER_POSITION - 100 && state !== JUMPING) {
      this.killed = true
      game.destroyFrame(0)
    }
  }

  draw (stage, state) {
    if (this.x < 0) {
      this.destroy(stage)
    }

    if (this.destroyed) {
      return
    }

    this.sprite.position.x = this.x
    this.sprite.position.y = this.y

    this.sprite.scale.x = this.scale
    this.sprite.scale.y = this.scale
  }

  changeSize (scale) {
    this.scale = scale
  }

  destroy (stage) {
    this.destroyed = true
    stage.removeChild(this.sprite)
    // this.sprite.destroy()
  }
}
