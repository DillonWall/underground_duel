export const Settings = Object.freeze({
	debug: {
		enabled: false,
		showFps: true,
		showGrid: false,
	},
	video: {
		targetFps: 60,
		fullscreen: false,
	},
	canvas: {
		canvasWidth: 800,
		canvasHeight: 576,
		backgroundColor: "#000000",
		numLayers: 5,
	},
	tileSize: 16,
	tilemapPath: "/public/assets/tilemaps/",
	tilesetPath: "/public/assets/tilesets/",
	tilesetImagePath: "/public/assets/tilesets/images/",
})
