import { Entity } from "../utils/ecs/entity.ts"
import { Tilemap } from "./tilemap/tilemap.ts"
import { TilemapModel } from "../models/tilemap/tilemap_model.ts"
import { TilemapManager } from "./tilemap/tilemap_manager.ts"
import { Tileset } from "./tilemap/tileset.ts"
import { TilesetManager } from "./tilemap/tileset_manager.ts"
import { CanvasLayerManager } from "../utils/canvas/canvas_layer_manager.ts"
import { SpriteSheet } from "./characters/sprite/spritesheet.ts"
import { SpriteSheetModel } from "../models/sprites/spritesheet_model.ts"
import { Player } from "./characters/player.ts"
import { Vector2D } from "../utils/math/vector2d.ts"
import { parseTilemapFile } from "../utils/parsers/tilemap_parser.ts"
import { parseSpriteFile } from "../utils/parsers/sprite_parser.ts"

export class Game extends Entity {
    private _lastTimestamp = 0
    private _entities: Entity[] = []
    private _webSocket: WebSocket | null = null

    public get entities(): Entity[] {
        return this._entities
    }

    constructor() {
        super()
    }

    public async init() {
        let [tilemapModel, playerSpriteSheetModel]: [TilemapModel, SpriteSheetModel] =
            await Promise.all([
                parseTilemapFile("TestingTerrains"),
                parseSpriteFile("player")
            ])

        this.setupTiles(tilemapModel)
        this.setupWebSocket()
        this.setupPlayer(playerSpriteSheetModel)
    }

    private setupTiles(tilemapModel: TilemapModel) {
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
    }

    private setupWebSocket() {
        this._webSocket = new WebSocket("ws://localhost:8080/ws")
        if (this._webSocket == null)
            throw Error("Could not create WebSocket")

    	this._webSocket.onopen = () => {
    		console.log("Opening socket! Sending a message to server...")
            this._webSocket!.send(JSON.stringify({MsgType:"Hi server!"}))
    	}

        this._webSocket.onmessage = (event) => {
            console.log("Received message: ", event.data)
        }

    	this._webSocket.onclose = (event) => {
    		console.log("Closing socket, event: ", event)
    	}

        this._webSocket.onerror = (event) => {
            console.log("Socket error: ", event)
        }
    }

    private setupPlayer(playerSpriteSheetModel: SpriteSheetModel) {
        if (this._webSocket == null) {
            throw Error("WebSocket must be setup before setting up player")
        }
        const player = new Player(new SpriteSheet(playerSpriteSheetModel), new Vector2D(100, 100), this._webSocket)
        player.awake()
        this._entities.push(player)
    }

    public awake(): void {
        super.awake()

        // awake all children
        for (const entity of this._entities) {
            entity.awake()
        }

        // Make sure Update starts after all entities are awaken
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now()

            // start update loop
            this.update()
        })
    }

    public update(): void {
        CanvasLayerManager.clearAllCanvases()

        // FPS calculations
        const now = Date.now()
        const deltaTime = (now - this._lastTimestamp) / 1000 // In seconds
        //const fps = 1 / deltaTime
        // console.log(`FPS: ${fps.toFixed(2)}`)
        this._lastTimestamp = now

        // update all components
        super.update(deltaTime)

        // update all children
        for (const entity of this._entities) {
            entity.update(deltaTime)
        }

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
