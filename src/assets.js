import PIXI from 'pixi.js'
import '../assets/llama.png'
import '../assets/llama.json'

const assetsToLoad = [ 'llama.json' ]

export let llamaLeftFrames = []
export let llamaRightFrames = []
export let llamaJumpFrames = []
export let llamaSlideFrames = []
export let llamaSpitFrames = []
export let llamaLoverFrames = []

const loader = new PIXI.loaders.Loader()

loader.add('llama.json')

loader.load((loader, resources) => {
  console.log('loaded assets', arguments)
  
  llamaLeftFrames = resources.llamaLeftFrames
  llamaRightFrames = resources.llamaRightFrames
  llamaJumpFrames = resources.llamaJumpFrames
  llamaSlideFrames = resources.llamaSlideFrames
  llamaSpitFrames = resources.llamaSpitFrames
  llamaLoverFrames = resources.llamaLoverFrames
})
