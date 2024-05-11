import { TileAnimationModel } from "../../models/tilemap/tile_animation_model.js"
import { Animation } from "../../utils/animation/animation.js"

export class TileAnimation extends Animation {
	private _frameImageIndecies: number[]

	constructor(tileAnimationModel: TileAnimationModel) {
		super(tileAnimationModel.delays, tileAnimationModel.loop)

		this._frameImageIndecies = tileAnimationModel.frameImageIndecies
	}

	public getFrameImageIndex(frameIndex: number): number {
		return this._frameImageIndecies[frameIndex]
	}

	public getCurrentFrameImageIndex(): number {
		return this._frameImageIndecies[this.currentFrame]
	}
}
