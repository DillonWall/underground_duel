import { AnimationModel } from "../animation/animation_model.ts"
import { ColliderModel } from "./collider_model.ts"

export class SpriteSheetModel {
	constructor(
		public name: string,
		public frameWidth: number,
		public frameHeight: number,
		public frameCountX: number,
		public frameCountY: number,
		public animations: Array<Array<string | AnimationModel>>,
		public collisions: Array<ColliderModel>
	) {}
}
