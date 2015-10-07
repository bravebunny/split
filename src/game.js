import requestAnimationFrame from 'raf'
import loadAssets from './assets'
import Keys from './keys'
import Frame from './frame'

const PROTECTION_TIME = 100

export default class {
  constructor () {
    this.setEventHandlers = this.setEventHandlers.bind(this)
    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)

    this.updateFramesPosition = this.updateFramesPosition.bind(this)
    this.createFrame = this.createFrame.bind(this)
    this.destroyFrame = this.destroyFrame.bind(this)

    this.canCreateFrame = true
    this.canDestroyFrame = true

    this.keys = new Keys()
    this.time = 0
    this.frames = []

    this.x = 0

    this.setEventHandlers()

    loadAssets(this.init)
  }

  setEventHandlers () {
    window.addEventListener('keydown', this.keys.onKeyDown, false)
    window.addEventListener('keyup', this.keys.onKeyUp, false)

    window.addEventListener('resize', this.updateFramesPosition, false)
  }

  init () {
    this.frames.push(new Frame(this.frames.length))
    this.updateFramesPosition()

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

    if (right) {
      this.x += 5
    }

    if (left) {
      this.x -= 5
    }

    if (up) {
      this.createFrame()
    }

    if (down) {
      this.destroyFrame(0)
    }

    this.frames.forEach((frame) => frame.update(this.x, this.y, this.time))
  }

  draw () {
    this.frames.forEach((frame) => frame.draw())
  }

  updateFramesPosition () {
    switch (this.frames.length) {
      case 1:
        this.frames[0].changePosition(0, 0, window.innerWidth, window.innerHeight)
        break
      case 2:
        this.frames[0].changePosition(0, 0, window.innerWidth / 2, window.innerHeight)
        this.frames[1].changePosition(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight)
        break
      case 3:
        this.frames[0].changePosition(0, 0, window.innerWidth / 2, window.innerHeight / 2)
        this.frames[1].changePosition(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2)
        this.frames[2].changePosition(window.innerWidth / 4, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2)
        break
      case 4:
        this.frames[0].changePosition(0, 0, window.innerWidth / 2, window.innerHeight / 2)
        this.frames[1].changePosition(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight / 2)
        this.frames[2].changePosition(0, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2)
        this.frames[3].changePosition(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2)
        break
      case 5:
        this.frames[0].changePosition(0, 0, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[1].changePosition(0, window.innerHeight / 2, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[2].changePosition(2 * window.innerWidth / 3, 0, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[3].changePosition(2 * window.innerWidth / 3, window.innerHeight / 2, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[4].changePosition(window.innerWidth / 3, window.innerHeight / 4, window.innerWidth / 3, window.innerHeight / 2)
        break
      case 6:
        this.frames[0].changePosition(0, 0, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[1].changePosition(0, window.innerHeight / 2, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[2].changePosition(2 * window.innerWidth / 3, 0, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[3].changePosition(2 * window.innerWidth / 3, window.innerHeight / 2, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[4].changePosition(window.innerWidth / 3, 0, window.innerWidth / 3, window.innerHeight / 2)
        this.frames[5].changePosition(window.innerWidth / 3, window.innerHeight / 2, window.innerWidth / 3, window.innerHeight / 2)
        break
    }
  }

  createFrame () {
    if (this.canCreateFrame && this.frames.length < 6) {
      this.frames.push(new Frame(this.frames.length))
      this.updateFramesPosition()
      this.canCreateFrame = false

      setTimeout(() => { this.canCreateFrame = true }, PROTECTION_TIME)
    }
  }

  destroyFrame (index) {
    if (this.canDestroyFrame && this.frames.length > 0) {
      this.frames[index].destroy()
      this.frames.splice(index, 1)
      this.updateFramesPosition()
      this.canDestroyFrame = false

      setTimeout(() => { this.canDestroyFrame = true }, PROTECTION_TIME)
    }
  }

}
