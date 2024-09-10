import { Game } from "./game/game.js"

// @ts-ignore: io is imported via html, no need to require an import
const socket = io("ws://localhost:3000")

socket.on("connect", () => {})

new Game(socket).awake()
