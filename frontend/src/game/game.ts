import path from "path"
import { Settings } from "../settings/settings.js"
import { Entity } from "../utils/ecs/entity.js"
import { TilemapManager } from "./tilemap/tilemap_manager.js"

export class Game extends Entity {
	private _lastTimestamp = 0
	private _entities: Entity[] = []
	// private readonly _stateMachina = new GameStateMachina(this)

	public get entities(): Entity[] {
		return this._entities
	}

	constructor() {
		super()

		TilemapManager.loadTilemap(path.join(Settings.tilemapPath, "TestingTerrains.tmj"))
		TilemapManager.setCurrentTilemapByName("TestingTerrains")
		this._entities.push(TilemapManager.getCurrentTilemap())
	}

	public awake(): void {
		// this.addComponent(new GameInputComponent())
		// this.addComponent(new StartGameUI(document.body))

		console.log("Awake")

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
		// FPS calculations
		const now = Date.now()
		const deltaTime = (now - this._lastTimestamp) / 1000 // In seconds
		const fps = 1 / deltaTime
		this._lastTimestamp = now

		// update all components
		super.update(deltaTime)

		// update all children
		for (const entity of this._entities) {
			entity.update(deltaTime)
		}

		// this._stateMachina.update(deltaTime)

		// Invoke on next frame
		window.requestAnimationFrame(() => this.update())
	}
}
