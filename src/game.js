import Keys from './keys'
import requestAnimationFrame from 'raf'
import loadAssets, * as assets from './assets'

export default class {
  constructor () {
    this.setEventHandlers = this.setEventHandlers.bind(this)
    this.animate = this.animate.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.keys = new Keys()
    this.time = 0

    this.setEventHandlers()

    loadAssets(this.animate)
  }

  setEventHandlers () {
    window.addEventListener('keydown', this.keys.onKeyDown, false)
    window.addEventListener('keyup', this.keys.onKeyUp, false)
  }

  animate () {
    this.update()
    this.draw()

    requestAnimationFrame(this.animate)
  }

  update () {
    this.time += 1

    const { up, down, left, right } = this.keys.getState()
  }

  draw () {

  }
}
