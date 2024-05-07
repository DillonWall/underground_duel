// Tilemap extends Entity
// 2d array of tiles (maintains the tiles such as the game maintains its entities)
// TODO:
//  - research best practices of implementing a tilemap
// Look into Phaser library
// We will generate the tilemaps dynamically (not images)

import { TilemapModel } from "../../models/tilemap/tilemap_model.js"
import { Entity } from "../../utils/ecs/entity.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { Tile } from "./tile.js"

export class Tilemap extends Entity {
	private _name: string
	private _tileLayers: Tile[][][] = []

	public get name() {
		return this._name
	}

	constructor(tilemapModel: TilemapModel) {
		super()

		this._name = tilemapModel.name
		this._tileLayers = []
		for (let i = 0; i < tilemapModel.tileLayers.length; i++) {
			let tileLayer = []
			for (let j = 0; j < tilemapModel.tileLayers[i].length; j++) {
				let tileLayerRow = []
				for (let k = 0; k < tilemapModel.tileLayers[i][j].length; k++) {
					tileLayerRow.push(Tile.fromTileModel(tilemapModel.tileLayers[i][j][k], i))
				}
				tileLayer.push(tileLayerRow)
			}
			this._tileLayers.push(tileLayer)
		}
	}

	public awake(): void {
		super.awake()

		for (let i = 0; i < this._tileLayers.length; i++) {
			for (let j = 0; j < this._tileLayers[i].length; j++) {
				for (let k = 0; k < this._tileLayers[i][j].length; k++) {
					this._tileLayers[i][j][k]?.awake()
				}
			}
		}
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		for (let i = 0; i < this._tileLayers.length; i++) {
			for (let j = 0; j < this._tileLayers[i].length; j++) {
				for (let k = 0; k < this._tileLayers[i][j].length; k++) {
					this._tileLayers[i][j][k]?.update(deltaTime)
				}
			}
		}
	}

	public getTile(layer: number, loc: Vector2D): Tile {
		return this._tileLayers[layer][loc.y][loc.x]
	}

	public getTiles(layer: number): Tile[][] {
		return this._tileLayers[layer]
	}
}
