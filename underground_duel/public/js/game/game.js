import { Entity } from "../utils/ecs/entity.js";
import { TilemapManager } from "./tilemap/tilemap_manager.js";
import { Tilemap } from "./tilemap/tilemap.js";
import { Tileset } from "./tilemap/tileset.js";
import { TilesetManager } from "./tilemap/tileset_manager.js";
import { CanvasLayerManager } from "../utils/canvas/canvas_layer_manager.js";
export class Game extends Entity {
    // private readonly _stateMachina = new GameStateMachina(this)
    get entities() {
        return this._entities;
    }
    constructor(socket) {
        super();
        this._lastTimestamp = 0;
        this._entities = [];
        this._socket = socket;
        this.setupWebSocket();
        // TilemapManager.loadTilemap(path.join(Settings.tilemapPath, "TestingTerrains.tmj"))
        // TilemapManager.setCurrentTilemapByName("TestingTerrains")
        // this._entities.push(TilemapManager.getCurrentTilemap())
    }
    setupWebSocket() {
        this._socket.on("message", (message) => {
            console.log("Message received from server:", message);
        });
        this._socket.on("map", (tilemapModel) => {
            console.log("Map received from server:", tilemapModel.name);
            // Setup tilesets
            for (const tilesetModel of tilemapModel.tilesets) {
                const tileset = new Tileset(tilesetModel);
                tileset.loadImage();
                TilesetManager.loadTileset(tileset);
                this._entities.push(tileset);
                tileset.awake();
            }
            // Setup tilemap
            const tilemap = new Tilemap(tilemapModel);
            TilemapManager.loadTilemap(tilemap);
            TilemapManager.setCurrentTilemapByName(tilemap.name);
            this._entities.push(tilemap);
            tilemap.awake();
        });
    }
    awake() {
        // this.addComponent(new GameInputComponent())
        // this.addComponent(new StartGameUI(document.body))
        super.awake();
        // awake all children
        for (const entity of this._entities) {
            entity.awake();
        }
        // this.InitStateMachina()
        // Make sure Update starts after all entities are awaken
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now();
            // start update loop
            this.update();
        });
    }
    // public InitStateMachina(): void {
    // 	const stateStart = new GameStateStart(this._stateMachina)
    // 	const stateTeamA = new GameStateTeamA(this._stateMachina)
    // 	const stateTeamB = new GameStateTeamB(this._stateMachina)
    // 	const stateOver = new GameStateOver(this._stateMachina)
    // 	this._stateMachina.SetStates([stateStart, stateTeamA, stateTeamB, stateOver], stateStart)
    // 	this._stateMachina.Start()
    // }
    update() {
        CanvasLayerManager.clearAllCanvases();
        // FPS calculations
        const now = Date.now();
        const deltaTime = (now - this._lastTimestamp) / 1000; // In seconds
        const fps = 1 / deltaTime;
        // console.log(`FPS: ${fps.toFixed(2)}`)
        this._lastTimestamp = now;
        // update all components
        super.update(deltaTime);
        // update all children
        for (const entity of this._entities) {
            entity.update(deltaTime);
        }
        // this._stateMachina.update(deltaTime)
        // Invoke on next frame
        window.requestAnimationFrame(() => this.update());
    }
}
//# sourceMappingURL=game.js.map