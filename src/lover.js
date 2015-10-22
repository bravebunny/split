import PIXI from 'pixi.js'
import * as assets from './assets'
import { GROUND_LEVEL, PLAYER_POSITION, SPEED, CREATE_FRAME } from './consts'
import { dispatch } from './index'

export default class {
  constructor (parent, x, y, scale) {
    this.parent = parent

    this.changeSize = this.changeSize.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.scale = scale

    this.x = x + 2000
    this.y = GROUND_LEVEL

    this.loverMovie = new PIXI.extras.MovieClip(assets.llamaLoverFrames)

    this.loverMovie.anchor.x = 0.5
    this.loverMovie.anchor.y = 0.5
    this.loverMovie.play()
    this.loverMovie.animationSpeed = 0.1
    this.parent.stage.addChild(this.loverMovie)
  }

  update (x, y) {
    this.x -= (SPEED * this.scale)
    this.y = GROUND_LEVEL * this.scale

    if (!this.loved && this.x < PLAYER_POSITION) {
      this.loved = true
      dispatch({ type: CREATE_FRAME })
    }

    if (this.x < 0 && !this.destroyed) {
      this.destroy()
    }
  }

  draw () {
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

  destroy () {
    this.destroyed = true
    this.parent.stage.removeChild(this.loverMovie)
    // this.sprite.destroy()
  }
}
