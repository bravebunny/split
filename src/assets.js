import PIXI from 'pixi.js'
import '../assets/llama.png'
import '../assets/llama.json'
import '../assets/background.png'
import '../assets/stone.png'

const assetsToLoad = [ 'llama.json' ]

export let llamaLeftFrames = []
export let llamaRightFrames = []
export let llamaJumpFrames = []
export let llamaSlideFrames = []
export let llamaSpitFrames = []
export let llamaLoverFrames = []

export let stone

const loader = new PIXI.loaders.Loader()

loader.add('llama.json')
loader.add('background.png')
loader.add('stone.png')

export default function (callback) {
  loader.load(function (loader, resources) {
    console.log('loaded assets', arguments)

    // create a texture from an image path
    for (var i = 1; i < 4; i++) {
      llamaLeftFrames.push(PIXI.Texture.fromFrame(`llamaLeft${i}.png`))
      llamaRightFrames.push(PIXI.Texture.fromFrame(`llamaRight${i}.png`))
    }
    for (var i = 1; i < 3; i++) {
      llamaJumpFrames.push(PIXI.Texture.fromFrame(`llamaJump${i}.png`))
    }
    for (var i = 1; i < 13; i++) {
      llamaSlideFrames.push(PIXI.Texture.fromFrame(`llamaSlide${i}.png`))
    }
    for (var i = 1; i < 5; i++) {
      llamaSpitFrames.push(PIXI.Texture.fromFrame(`llamaSpit${i}.png`))
    }
    for (var i = 1; i < 5; i++) {
      llamaLoverFrames.push(PIXI.Texture.fromFrame(`llamaLover${i}.png`))
    }
  })

  stone = PIXI.Sprite.fromImage('stone.png');

  callback()
}
