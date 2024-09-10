export const Settings = Object.freeze({
	debug: {
		enabled: false,
		showFps: true,
		showGrid: false,
	},
	video: {
		targetFps: 60,
		fullscreen: false,
		scale: 3,
	},
	canvas: {
		canvasWidth: 800,
		canvasHeight: 576,
		backgroundColor: "#000000",
		numLayers: 7,
		playerLayer: 3,
	},
	tile: {
		tileSize: 16,
	},
	controls: {
		left: ["KeyA", "ArrowLeft"],
		right: ["KeyD", "ArrowRight"],
		up: ["KeyW", "ArrowUp"],
		down: ["KeyS", "ArrowDown"],
		attack: ["KeyJ", "Space"],
	},
	gamepad: {
		attack: 0,
		block: 2,
	},
	player: {
		moveSpeed: 100,
	},
	hitbox: {
		collider: "",
		hit: "Hit",
	},
})
