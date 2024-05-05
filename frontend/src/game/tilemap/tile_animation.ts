import { Animation } from "../../utils/animation/animation.js"
import { IUpdate } from "../../utils/lifecycle/update.js"

export class TileAnimation extends Animation {
	// name: string
	// imgSrc: string
	// delays: number[]
	// loop: boolean
	// lengthFrames: number
	// currentFrame: number
	private _frameTileIds: number[]

	constructor(name: string, imgSrc: string, delays: number[], loop: boolean, frameTileIds: number[]) {
		super(name, imgSrc, delays, loop)

		this._frameTileIds = frameTileIds
	}

	public getFrameTileId(frameIndex: number): number {
		return this._frameTileIds[frameIndex]
	}

	public update()
}
