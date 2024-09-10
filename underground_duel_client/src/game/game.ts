import { Socket } from "socket.io"
import { Entity } from "../utils/ecs/entity.js"
import { TilemapManager } from "./tilemap/tilemap_manager.js"
import { Tilemap } from "./tilemap/tilemap.js"
import { Tileset } from "./tilemap/tileset.js"
import { TilesetManager } from "./tilemap/tileset_manager.js"
import { TilemapModel } from "../models/tilemap/tilemap_model.js"
import { CanvasLayerManager } from "../utils/canvas/canvas_layer_manager.js"
import { SpriteSheetModel } from "../models/sprites/spritesheet_model.js"
import { Player } from "./characters/player.js"
import { Vector2D } from "../utils/math/vector2d.js"
import { SpriteSheet } from "./characters/sprite/spritesheet.js"

export class Game extends Entity {
	private _lastTimestamp = 0
	private _entities: Entity[] = []
	private _socket: Socket
	// private readonly _stateMachina = new GameStateMachina(this)

	public get entities(): Entity[] {
		return this._entities
	}

	constructor(socket: Socket) {
		super()

		this._socket = socket
		this.setupWebSocket()

		// TilemapManager.loadTilemap(path.join(Settings.tilemapPath, "TestingTerrains.tmj"))
		// TilemapManager.setCurrentTilemapByName("TestingTerrains")
		// this._entities.push(TilemapManager.getCurrentTilemap())
		// this.addComponent(new StartGameUI(document.body))
	}

	private setupWebSocket() {
		this._socket.on("message", (message: string) => {
			console.log("Message received from server:", message)
		})

		this._socket.on("connected", () => {
			console.log("Reconnected to server")
			// this._stateMachina.restart()
			this._entities = []
		})

		this._socket.on("map", (tilemapModel: TilemapModel) => {
			console.log("Map received from server:", tilemapModel.name)

			// Setup tilesets
			for (const tilesetModel of tilemapModel.tilesets) {
				const tileset = new Tileset(tilesetModel)
				TilesetManager.loadTileset(tileset)
				tileset.awake()
				this._entities.push(tileset)
			}

			// Setup tilemap
			const tilemap = new Tilemap(tilemapModel)
			TilemapManager.loadTilemap(tilemap)
			TilemapManager.setCurrentTilemapByName(tilemap.name)
			tilemap.awake()
			this._entities.push(tilemap)
		})

		this._socket.on("player", (playerSpriteModel: SpriteSheetModel) => {
			console.log("Player received from server:", playerSpriteModel)

			const player = new Player(new SpriteSheet(playerSpriteModel), new Vector2D(100, 100))
			player.awake()
			this._entities.push(player)
		})
	}

	public awake(): void {
		super.awake()

		// awake all children
		for (const entity of this._entities) {
			entity.awake()
		}

		// this.InitStateMachina()

		// Make sure Update starts after all entities are awaken
		window.requestAnimationFrame(() => {
			// set initial timestamp
			this._lastTimestamp = Date.now()

			// start update loop
			this.update()
		})
	}

	// public InitStateMachina(): void {
	// 	const stateStart = new GameStateStart(this._stateMachina)
	// 	const stateTeamA = new GameStateTeamA(this._stateMachina)
	// 	const stateTeamB = new GameStateTeamB(this._stateMachina)
	// 	const stateOver = new GameStateOver(this._stateMachina)

	// 	this._stateMachina.SetStates([stateStart, stateTeamA, stateTeamB, stateOver], stateStart)
	// 	this._stateMachina.Start()
	// }

	public update(): void {
		CanvasLayerManager.clearAllCanvases()

		// FPS calculations
		const now = Date.now()
		const deltaTime = (now - this._lastTimestamp) / 1000 // In seconds
		const fps = 1 / deltaTime
		// console.log(`FPS: ${fps.toFixed(2)}`)
		this._lastTimestamp = now

		// update all components
		super.update(deltaTime)

		// update all children
		for (const entity of this._entities) {
			entity.update(deltaTime)
		}

		// this._stateMachina.update(deltaTime)

		// draw after everything is updated
		this.draw()

		// // Test Lag
		// new Promise((resolve) => setTimeout(resolve, 50)).then(() => {
		// 	window.requestAnimationFrame(() => this.update())
		// })
		window.requestAnimationFrame(() => this.update())
	}

	public draw(): void {
		// update all children
		for (const entity of this._entities) {
			entity.draw()
		}
	}
}
