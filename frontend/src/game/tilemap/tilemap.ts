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
	private _tiles: Tile[][]
	public readonly tileSize: Vector2D = new Vector2D(Settings.tilemap.tileSize, Settings.tilemap.tileSize)
	public get tiles() {
		return this._tiles
	}

	constructor() {
		super()
	}
}
