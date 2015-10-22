import PIXI from 'pixi.js'
import * as assets from './assets'
import {
  FORWARD, JUMPING, SLIDDING, SPITTING,
  GROWTH_SPEED, PLAYER_POSITION
} from './consts'

export default class {
  constructor (parent, x, y) {
    this.parent = parent

    this.changeSize = this.changeSize.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.x = x
    this.y = y

    this.age = 0.5
    this.scale = 1

    const initMovie = (movie) => {
      movie.anchor.x = 0.5
      movie.anchor.y = 0.5
      movie.play()
      movie.animationSpeed = 0.1
      this.parent.stage.addChild(movie)
    }

    this.leftMovie = new PIXI.extras.MovieClip(assets.llamaLeftFrames)
    this.rightMovie = new PIXI.extras.MovieClip(assets.llamaRightFrames)
    this.jumpMovie = new PIXI.extras.MovieClip(assets.llamaJumpFrames)
    this.spitMovie = new PIXI.extras.MovieClip(assets.llamaSpitFrames)
    this.slideMovie = new PIXI.extras.MovieClip(assets.llamaSlideFrames)

    initMovie(this.leftMovie)
    initMovie(this.rightMovie)
    initMovie(this.jumpMovie)
    initMovie(this.spitMovie)
    initMovie(this.slideMovie)
  }

  update (x, y) {
    this.x = PLAYER_POSITION * this.scale
    this.y = (y + (1 - this.age) * 64) * this.scale
    if (this.age < 1) {
      this.age += GROWTH_SPEED
    }
  }

  draw (state) {
    let movie

    this.rightMovie.position.y = -1000
    this.leftMovie.position.y = -1000
    this.jumpMovie.position.y = -1000
    this.spitMovie.position.y = -1000
    this.slideMovie.position.y = -1000

    switch (state) {
      case FORWARD:
        movie = this.rightMovie
        break
      case JUMPING:
        movie = this.jumpMovie
        break
      case SLIDDING:
        movie = this.slideMovie
        break
      case SPITTING:
        movie = this.spitMovie
        break
    }

    movie.position.x = this.x
    movie.position.y = this.y

    movie.scale.x = this.scale * 2 * this.age
    movie.scale.y = this.scale * 2 * this.age
  }

  changeSize (scale) {
    this.scale = scale
  }
}
