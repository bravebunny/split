import requestAnimationFrame from 'raf'
import loadAssets from './assets'
import Keys from './keys'
import Frame from './frame'

import {
  PROTECTION_TIME, GROUND_LEVEL, SPEED,
  JUMP_TIME, JUMP_SPEED, JUMP_ACCELERATION,
  SPIT_TIME, SLIDE_TIME,
  FORWARD, JUMPING, SLIDDING, SPITTING
} from './consts'

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

    this.state = FORWARD

    this.x = 0
    this.y = GROUND_LEVEL

    this.jumpTicks = JUMP_TIME
    this.spitTicks = SPIT_TIME
    this.slideTicks = SLIDE_TIME

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

    this.setEventHandlers()

    this.animate()
  }

  animate () {
    this.update()
    this.draw()

    requestAnimationFrame(this.animate)
  }

  update () {
    this.time += 1

    const { up, down, right, left, space } = this.keys.getState()

    if (up && this.jumpTicks >= JUMP_TIME) {
      this.state = JUMPING
      this.jumpTicks = 0
      this.baseY = this.y
    } else if (down && this.slideTicks >= SLIDE_TIME) {
      this.state = SLIDDING
      this.slideTicks = 0
    } else if (right && this.spitTicks >= SPIT_TIME) {
      this.state = SPITTING
      this.spitTicks = 0
    }

    if (this.jumpTicks >= JUMP_TIME && this.slideTicks >= SLIDE_TIME && this.spitTicks >= SPIT_TIME) {
      this.state = FORWARD
    }

    this.x += SPEED

    if (this.jumpTicks < JUMP_TIME) {
      if (this.y <= this.baseY) {
        this.y = (this.baseY - (JUMP_SPEED * this.jumpTicks) + (0.5 * JUMP_ACCELERATION * this.jumpTicks * this.jumpTicks))
      } else {
        this.y = this.baseY
        this.jumpTicks = JUMP_TIME
      }
    }

    this.jumpTicks++
    this.spitTicks++
    this.slideTicks++

    if (space) {
      this.createFrame()
    }

    if (left) {
      this.destroyFrame(0)
    }

    this.frames.forEach((frame) => frame.update(this.x, this.y, this.state))
  }

  draw () {
    this.frames.forEach((frame) => frame.draw(this.state))
  }

  updateFramesPosition () {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    switch (this.frames.length) {
      case 1:
        this.frames[0].changePosition(0, 0, windowWidth, windowHeight)
        break
      case 2:
        this.frames[0].changePosition(0, 0, windowWidth / 2, windowHeight)
        this.frames[1].changePosition(windowWidth / 2, 0, windowWidth / 2, windowHeight)
        break
      case 3:
        this.frames[0].changePosition(0, 0, windowWidth / 2, windowHeight / 2)
        this.frames[1].changePosition(windowWidth / 2, 0, windowWidth / 2, windowHeight / 2)
        this.frames[2].changePosition(windowWidth / 4, windowHeight / 2, windowWidth / 2, windowHeight / 2)
        break
      case 4:
        this.frames[0].changePosition(0, 0, windowWidth / 2, windowHeight / 2)
        this.frames[1].changePosition(windowWidth / 2, 0, windowWidth / 2, windowHeight / 2)
        this.frames[2].changePosition(0, windowHeight / 2, windowWidth / 2, windowHeight / 2)
        this.frames[3].changePosition(windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2)
        break
      case 5:
        this.frames[0].changePosition(0, 0, windowWidth / 3, windowHeight / 2)
        this.frames[1].changePosition(0, windowHeight / 2, windowWidth / 3, windowHeight / 2)
        this.frames[2].changePosition(2 * windowWidth / 3, 0, windowWidth / 3, windowHeight / 2)
        this.frames[3].changePosition(2 * windowWidth / 3, windowHeight / 2, windowWidth / 3, windowHeight / 2)
        this.frames[4].changePosition(windowWidth / 3, windowHeight / 4, windowWidth / 3, windowHeight / 2)
        break
      case 6:
        this.frames[0].changePosition(0, 0, windowWidth / 3, windowHeight / 2)
        this.frames[1].changePosition(0, windowHeight / 2, windowWidth / 3, windowHeight / 2)
        this.frames[2].changePosition(2 * windowWidth / 3, 0, windowWidth / 3, windowHeight / 2)
        this.frames[3].changePosition(2 * windowWidth / 3, windowHeight / 2, windowWidth / 3, windowHeight / 2)
        this.frames[4].changePosition(windowWidth / 3, 0, windowWidth / 3, windowHeight / 2)
        this.frames[5].changePosition(windowWidth / 3, windowHeight / 2, windowWidth / 3, windowHeight / 2)
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
