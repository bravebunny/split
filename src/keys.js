export default class {
  constructor () {
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)

    this.state = {
      space: false,
      left: false,
      up: false,
      right: false,
      down: false
    }
  }

  onKeyDown (e) {
    const c = e.keyCode

    switch (c) {
      case 32: // Spacebar
        this.state.space = true
        break
      case 37: // Left
        this.state.left = true
        break
      case 38: // Up
        this.state.up = true
        break
      case 39: // Right
        this.state.right = true // Will take priority over the left key
        break
      case 40: // Down
        this.state.down = true
        break
    }
  }

  onKeyUp (e) {
    const c = e.keyCode

    switch (c) {
      case 32: // Spacebar
        this.state.space = false
        break
      case 37: // Left
        this.state.left = false
        break
      case 38: // Up
        this.state.up = false
        break
      case 39: // Right
        this.state.right = false
        break
      case 40: // Down
        this.state.down = false
        break
    }
  }

  getState () {
    return this.state
  }
}
