import PIXI from 'pixi.js'
import randomColor from 'randomcolor'
import { random } from 'lodash'
import Background from './background'
import Player from './player'
import Lover from './lover'
import Stone from './stone'

const startX = 100
const startY = 10

export default class {
  constructor () {
    this.changePosition = this.changePosition.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
    this.destroy = this.destroy.bind(this)

    this.renderer = PIXI.autoDetectRenderer(320, 240)
    this.renderer.backgroundColor = parseInt(randomColor({
      hue: 'blue'
    }).replace('#', ''), 16)

    this.stage = new PIXI.Container()
    this.scale = 1

    this.background = new Background(this, 320, 240)
    this.player = new Player(this, startX, startY)

    this.stonesInterval = random(100, 500)
    this.loversInterval = random(100, 500)

    this.entities = []
    this.entities.push(new Lover(this, startX, startY, this.scale))
    this.entities.push(new Stone(this, startX, startY, this.scale))

    this.renderer.view.style.position = 'absolute'
    this.renderer.view.style.top = '0px'
    this.renderer.view.style.left = '0px'
    this.renderer.view.style.border = '1px solid'

    document.body.appendChild(this.renderer.view)
  }

  update (x, y, state) {
    this.background.update(x)

    if (x % this.stonesInterval === 0) {
      this.entities.push(new Stone(this, startX, startY, this.scale))
    }

    if (x % this.loversInterval === 0) {
      this.entities.push(new Lover(this, startX, startY, this.scale))
    }

    this.player.update(x, y, state)
    this.entities.forEach(({ update }) => update(x, y, state))
  }

  draw (state) {
    this.background.draw()

    this.player.draw(state)
    this.entities.forEach(({ draw }) => draw())

    this.renderer.render(this.stage)
  }

  changePosition (x, y, width, height) {
    this.renderer.resize(width, height)
    this.renderer.view.style.top = `${y}px`
    this.renderer.view.style.left = `${x}px`

    this.scale = this.background.changeSize(width, height)
    this.player.changeSize(this.scale)
    this.entities.forEach(({ changeSize }) => changeSize(this.scale))
  }

  destroy () {
    document.body.removeChild(this.renderer.view)

    this.renderer.destroy()
  }
}
