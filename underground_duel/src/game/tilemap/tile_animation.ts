import TileAnimationModel from "../../models/tilemap/tile_animation_model.js"
import { Animation } from "../../utils/animation/animation.js"

export class TileAnimation extends Animation {
	private _frameImageIndecies: number[]

	constructor(tileAnimationModel: TileAnimationModel) {
		super(
			tileAnimationModel.name,
			tileAnimationModel.imageSrc,
			tileAnimationModel.delays,
			tileAnimationModel.loop,
			tileAnimationModel.resetOnAwake
		)

		this._frameImageIndecies = tileAnimationModel.frameImageIndecies
	}

	public getFrameImageIndex(frameIndex: number): number {
		return this._frameImageIndecies[frameIndex]
	}

	public getCurrentFrameImageIndex(): number {
		return this._frameImageIndecies[this.currentFrame]
	}

	public awake(): void {
		super.awake()
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)
	}
}
