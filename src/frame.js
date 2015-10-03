import PIXI from 'pixi.js'
import * as assets from './assets'

export default class {
  constructor (id) {
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
    this.destroy = this.destroy.bind(this)

    this.renderer = PIXI.autoDetectRenderer(320, 240);

    this.stage = new PIXI.Container();

    this.renderer.view.style.position = 'absolute';
    this.renderer.view.style.top = '0px';
    this.renderer.view.style.left = '0px';
    this.renderer.view.style.border = '1px solid';

    document.body.appendChild(this.renderer.view);
  }

  update () {

  }

  draw () {
    this.stage.addChild(assets.stone);

    this.renderer.render(this.stage);
  }

  destroy () {
    document.body.removeChild(this.renderer.view);
  }
}
