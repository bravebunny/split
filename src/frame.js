import PIXI from 'pixi.js'
import * as assets from './assets'
import Background from './background'

export default class {
  constructor () {
    this.changePosition = this.changePosition.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
    this.destroy = this.destroy.bind(this)

    this.renderer = PIXI.autoDetectRenderer(320, 240)

    this.stage = new PIXI.Container()

    this.background = new Background(this.stage, 320, 240)

    this.renderer.view.style.position = 'absolute'
    this.renderer.view.style.top = '0px'
    this.renderer.view.style.left = '0px'
    this.renderer.view.style.border = '1px solid'

    document.body.appendChild(this.renderer.view)
  }

  update (x, y) {
    this.background.update(x)
  }

  draw () {
    this.background.draw()

    this.stage.addChild(assets.stone)

    this.renderer.render(this.stage)
  }

  changePosition (x, y, width, height) {
    this.renderer.resize(width, height)
    this.renderer.view.style.top = `${y}px`
    this.renderer.view.style.left = `${x}px`

    const scale = this.background.changeSize(width, height)
    console.log('new scale', scale)
  }

  destroy () {
    this.renderer.destroy()
  }
}
