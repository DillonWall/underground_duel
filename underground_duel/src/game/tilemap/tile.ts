// Tile extends Entity
// TODO: (see Tilemap)
// loc: Vector2D
// size: Vector2D
// index: Vector2D
// imageIndex: number

import { TileModel } from "../../models/tilemap/tile_model.js"
import { Entity } from "../../utils/ecs/entity.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { TileDrawComponent } from "./components/tiledraw.js"

export class Tile extends Entity {
	public loc: Vector2D
	public size: Vector2D
	public index: Vector2D
	public layer: number
	public imageIndex: number
	public tilesetName: string

	constructor(
		loc: Vector2D,
		size: Vector2D,
		index: Vector2D,
		layer: number,
		imageIndex: number,
		tilesetName: string
	) {
		super()

		this.loc = loc
		this.size = size
		this.index = index
		this.layer = layer
		this.imageIndex = imageIndex
		this.tilesetName = tilesetName
	}

	public static fromTileModel(tileModel: TileModel, layer: number): Tile {
		if (!tileModel) {
			return null
		}
		return new Tile(
			tileModel.loc,
			tileModel.size,
			tileModel.index,
			layer,
			tileModel.imageIndex,
			tileModel.tilesetName
		)
	}

	public awake(): void {
		super.awake()

		this.addComponent(new TileDrawComponent(this))
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)
	}
}
