import PIXI from 'pixi.js'
import { STONE_LEVEL, PLAYER_POSITION, JUMPING, SPEED, DESTROY_FRAME } from './consts'
import { dispatch } from './index'

export default class {
  constructor (parent, x, y, scale) {
    this.parent = parent

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

    this.parent.stage.addChild(this.sprite)
  }

  update (x, y, state) {
    this.x -= (SPEED * this.scale)
    this.y = STONE_LEVEL * this.scale

    if (!this.killed && this.x < PLAYER_POSITION && this.x > PLAYER_POSITION - 100 && state !== JUMPING) {
      this.killed = true
      dispatch({ type: DESTROY_FRAME, frame: this.parent })
    }

    if (this.x < 0 && !this.destroyed) {
      this.destroy()
    }
  }

  draw () {
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

  destroy () {
    this.destroyed = true
    this.parent.stage.removeChild(this.sprite)
    // this.sprite.destroy()
  }
}
