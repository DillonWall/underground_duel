import { ColliderModel } from "../sprites/collider_model.ts"
import { AnimationModel } from "../animation/animation_model.ts"

export class TilesetModel {
	constructor(
		public name: string,
		public tileCountX: number,
		public tileCountY: number,
		public animations: Array<Array<number | AnimationModel>>,
		public collisions: Array<ColliderModel>
	) {}
}
