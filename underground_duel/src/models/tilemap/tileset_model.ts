import { TileAnimationModel } from "./tile_animation_model.js"

export class TilesetModel {
	constructor(
		public name: string,
		public imageSrc: string,
		public animations: Array<Array<number | TileAnimationModel>>,
		public tileCountX: number,
		public tileCountY: number
	) {}
}
