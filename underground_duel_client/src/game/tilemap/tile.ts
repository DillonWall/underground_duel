import { TileModel } from "../../models/tilemap/tile_model.ts"
import { Entity } from "../../utils/ecs/entity.ts"
import { Vector2D } from "../../utils/math/vector2d.ts"
import { AreaComponent } from "../../utils/shared_components/area_component.ts"
import { TileDrawComponent } from "./components/tile_draw_component.ts"

export class Tile extends Entity {
	public area: AreaComponent
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

		this.area = new AreaComponent(this, loc, size)
		this.index = index
		this.layer = layer
		this.imageIndex = imageIndex
		this.tilesetName = tilesetName

		this.addUpdateComponent(this.area)
		this.addDrawComponent(new TileDrawComponent(this))
	}

	public static fromTileModel(tileModel: TileModel | null, layer: number): Tile | null {
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
}
