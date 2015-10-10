import PIXI from 'pixi.js'
import Background from './background'
import Player from './player'
import Lover from './lover'
import Stone from './stone'

export default class {
  constructor () {
    this.changePosition = this.changePosition.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
    this.destroy = this.destroy.bind(this)

    this.renderer = PIXI.autoDetectRenderer(320, 240)

    this.stage = new PIXI.Container()

    const startX = 100
    const startY = 10

    this.background = new Background(this.stage, 320, 240)
    this.player = new Player(this.stage, startX, startY)
    this.lover = new Lover(this.stage, startX, startY)
    this.stone = new Stone(this.stage, startX, startY)

    this.renderer.view.style.position = 'absolute'
    this.renderer.view.style.top = '0px'
    this.renderer.view.style.left = '0px'
    this.renderer.view.style.border = '1px solid'

    document.body.appendChild(this.renderer.view)
  }

  update (x, y, state) {
    this.background.update(x)

    this.player.update(x, y, state)
    this.lover.update(x, y, state)
    this.stone.update(x, y, state)
  }

  draw (state) {
    this.background.draw()

    this.player.draw(this.stage, state)
    this.lover.draw(this.stage)
    this.stone.draw(this.stage)

    this.renderer.render(this.stage)
  }

  changePosition (x, y, width, height) {
    this.renderer.resize(width, height)
    this.renderer.view.style.top = `${y}px`
    this.renderer.view.style.left = `${x}px`

    const scale = this.background.changeSize(width, height)
    this.player.changeSize(scale)
    this.lover.changeSize(scale)
    this.stone.changeSize(scale)
  }

  destroy () {
    document.body.removeChild(this.renderer.view)

    this.renderer.destroy()
  }
}
