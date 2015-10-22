import PIXI from 'pixi.js'
import * as assets from './assets'
import { GROUND_LEVEL, PLAYER_POSITION, SPEED } from './consts'
import game from './index'

export default class {
  constructor (stage, x, y) {
    this.changeSize = this.changeSize.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.x = x + 2000
    this.y = GROUND_LEVEL

    this.scale = 1

    this.loverMovie = new PIXI.extras.MovieClip(assets.llamaLoverFrames)

    this.loverMovie.anchor.x = 0.5
    this.loverMovie.anchor.y = 0.5
    this.loverMovie.play()
    this.loverMovie.animationSpeed = 0.1
    stage.addChild(this.loverMovie)
  }

  update (x, y) {
    this.x -= (SPEED * this.scale)
    this.y = GROUND_LEVEL * this.scale

    if (!this.loved && this.x < PLAYER_POSITION) {
      this.loved = true
      game.createFrame()
    }
  }

  draw (stage, state) {
    if (this.x < 0) {
      this.destroy(stage)
    }

    if (this.destroyed) {
      return
    }

    this.loverMovie.position.x = this.x
    this.loverMovie.position.y = this.y

    this.loverMovie.scale.x = this.scale * 2
    this.loverMovie.scale.y = this.scale * 2
  }

  changeSize (scale) {
    this.scale = scale
  }

  destroy (stage) {
    this.destroyed = true
    stage.removeChild(this.loverMovie)
    // this.sprite.destroy()
  }
}
