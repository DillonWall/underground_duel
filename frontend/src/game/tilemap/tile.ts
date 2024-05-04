// Tile extends Entity
// TODO: (see Tilemap)
// loc: Vector2D
// size: Vector2D
// index: Vector2D
// imageIndex: number

import { Entity } from "../../utils/ecs/entity.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { TileDrawComponent } from "./components/tiledraw.js"

export class Tile extends Entity {
	public loc: Vector2D
	public size: Vector2D
	public index: Vector2D
	public imageIndex: number
	public tilesetId: number

	constructor(loc: Vector2D, size: Vector2D, index: Vector2D, imageIndex: number, tilesetId: number) {
		super()

		this.loc = loc
		this.size = size
		this.index = index
		this.imageIndex = imageIndex
		this.tilesetId = tilesetId

		this.addComponent(new TileDrawComponent(this))
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)
	}
}
