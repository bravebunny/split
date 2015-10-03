import requestAnimationFrame from 'raf'
import loadAssets, * as assets from './assets'
import Keys from './keys'
import Frame from './frame'

export default class {
  constructor () {
    this.setEventHandlers = this.setEventHandlers.bind(this)
    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.keys = new Keys()
    this.time = 0
    this.frames = []

    this.setEventHandlers()

    loadAssets(this.init)
  }

  setEventHandlers () {
    window.addEventListener('keydown', this.keys.onKeyDown, false)
    window.addEventListener('keyup', this.keys.onKeyUp, false)
  }

  init () {
    this.frames.push(new Frame(this.frames.length))

    this.animate()
  }

  animate () {
    this.update()
    this.draw()

    requestAnimationFrame(this.animate)
  }

  update () {
    this.time += 1

    const { up, down, left, right } = this.keys.getState()

    this.frames.forEach((frame) => frame.update())
  }

  draw () {
    this.frames.forEach((frame) => frame.draw())
  }
}
