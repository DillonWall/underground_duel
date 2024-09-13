import { Vector2D } from "../../utils/math/vector2d.ts"

export class TileModel {
	constructor(
		public loc: Vector2D,
		public size: Vector2D,
		public index: Vector2D,
		public imageIndex: number,
		public tilesetName: string
	) {}
}
