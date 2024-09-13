import { Game } from "./game/game.ts"

let game = new Game()

await game.init()
game.awake()
