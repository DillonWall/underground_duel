// Tilemap extends Entity
// 2d array of tiles (maintains the tiles such as the game maintains its entities)
// TODO:
//  - research best practices of implementing a tilemap
// Look into Phaser library
// We will generate the tilemaps dynamically (not images)

import { Settings } from "../../settings/settings.js"
import { Entity } from "../../utils/ecs/entity.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { Tile } from "./tile.js"

export class Tilemap extends Entity {
	private _tiles: Tile[][] = []
	public readonly tileSize: Vector2D = new Vector2D(Settings.tilemap.tileSize, Settings.tilemap.tileSize)
	public get tiles() {
		return this._tiles
	}

	constructor() {
		super()

		const numTilesX = 20
		const numTilesY = 20
		for (let i = 0; i < numTilesX; i++) {
			for (let i = 0; i < numTilesY; i++) {
				this._tiles.push([])
			}
		}
		this._tiles.push([new Tile(new Vector2D(0, 0), this.tileSize, new Vector2D(0, 0), 0, 0)])
	}

	public awake(): void {
		super.awake()
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		for (let i = 0; i < this._tiles.length; i++) {
			for (let j = 0; j < this._tiles[i].length; j++) {
				this._tiles[i][j].update(deltaTime)
			}
		}
	}
}
