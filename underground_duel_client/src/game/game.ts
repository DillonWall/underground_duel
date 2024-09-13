import * as path from "../utils/path.ts"
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
        this.setupPlayer(playerSpriteSheetModel)
        this.setupWebSocket()
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

    private setupPlayer(playerSpriteSheetModel: SpriteSheetModel) {
        const player = new Player(new SpriteSheet(playerSpriteSheetModel), new Vector2D(100, 100))
        player.awake()
        this._entities.push(player)
    }

    private setupWebSocket() {
    //const socket = io("ws://localhost:3000")
    //	this._socket.on("message", (message: string) => {
    //		console.log("Message received from server:", message)
    //	})
    //
    //	this._socket.on("connected", () => {
    //		console.log("Reconnected to server")
    //		// this._stateMachina.restart()
    //		this._entities = []
    //	})
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
