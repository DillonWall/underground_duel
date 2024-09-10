import { AnimationModel } from "../animation/animation_model.js"
import { ColliderModel } from "./collider_model.js"

export class SpriteSheetModel {
	constructor(
		public imageSrc: string,
		public frameWidth: number,
		public frameHeight: number,
		public frameCountX: number,
		public frameCountY: number,
		public animations: Array<Array<string | AnimationModel>>,
		public collisions: Array<Array<number | ColliderModel>>
	) {}
}
