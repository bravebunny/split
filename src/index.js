import Game from './game'
import '../style/game.css'
import '../style/reset.css'

const game = new Game() // eslint-disable-line no-unused-vars

export default game

export const dispatch = game.reducer
