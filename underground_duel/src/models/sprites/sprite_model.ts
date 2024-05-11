import { SpriteAnimationModel } from "./sprite_animation_model.js"

export class SpriteModel {
	constructor(
		public imageSrc: string,
		public frameWidth: number,
		public frameHeight: number,
		public animations: Array<Array<string | SpriteAnimationModel>>
	) {}
}
