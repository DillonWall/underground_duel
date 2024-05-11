import { SpriteAnimationModel } from "../../../models/sprites/sprite_animation_model.js"
import { Animation } from "../../../utils/animation/animation.js"

export class SpriteAnimation extends Animation {
	private _frameImageIndecies: number[]

	constructor(animationModel: SpriteAnimationModel) {
		super(animationModel.delays, animationModel.loop)

		this._frameImageIndecies = animationModel.frameImageIndecies
	}

	public getFrameImageIndex(frameIndex: number): number {
		return this._frameImageIndecies[frameIndex]
	}

	public getCurrentFrameImageIndex(): number {
		return this._frameImageIndecies[this.currentFrame]
	}
}
