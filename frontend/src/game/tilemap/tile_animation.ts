import { Animation } from "../../utils/animation/animation.js"

export class TileAnimation extends Animation {
	private _frameImageIndecies: number[]

	constructor(name: string, imgSrc: string, delays: number[], frameTileIds: number[], loop: boolean = true) {
		super(name, imgSrc, delays, loop)

		this._frameImageIndecies = frameTileIds
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
