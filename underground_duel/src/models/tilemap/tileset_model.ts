import { ColliderModel } from "../sprites/collider_model.js"
import { AnimationModel } from "../animation/animation_model.js"

export class TilesetModel {
	constructor(
		public name: string,
		public imageSrc: string,
		public tileCountX: number,
		public tileCountY: number,
		public animations: Array<Array<number | AnimationModel>>,
		public collisions: Array<Array<number | ColliderModel>>
	) {}
}
