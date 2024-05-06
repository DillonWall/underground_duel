import { Entity } from "../ecs/entity.js"

export abstract class Animation extends Entity {
	protected name: string
	protected imgSrc: string
	protected delays: number[]
	protected lengthFrames: number
	protected lengthTime: number
	protected elapsedTime: number
	protected currentFrame: number
	protected loop: boolean
	protected playing: boolean
	protected resetOnAwake: boolean

	constructor(name: string, imgSrc: string, delays: number[], loop: boolean, resetOnAwake: boolean = true) {
		super()

		this.name = name
		this.imgSrc = imgSrc
		this.delays = delays
		this.lengthFrames = delays.length
		this.lengthTime = this.delays.reduce((total, delay) => total + delay, 0)
		this.elapsedTime = 0
		this.currentFrame = 0
		this.loop = loop
		this.playing = false
		this.resetOnAwake = resetOnAwake
	}

	public awake(): void {
		if (this.resetOnAwake) {
			this.elapsedTime = 0
			this.currentFrame = 0
		}
		this.playing = true
	}

	public update(deltaTime: number): void {
		if (!this.playing || this.lengthFrames === 0) {
			return
		}
		this.elapsedTime += deltaTime
		if (this.elapsedTime >= this.lengthTime) {
			if (this.loop) {
				this.elapsedTime = this.elapsedTime % this.lengthTime
			} else {
				this.elapsedTime = this.lengthTime
				this.playing = false
			}
		}
		this.currentFrame = this.findCurrentFrameIndex()
	}

	private findCurrentFrameIndex(): number {
		let totalTime = 0
		for (const delay of this.delays) {
			totalTime += delay
			if (totalTime >= this.elapsedTime) {
				return this.delays.indexOf(delay)
			}
		}
		return this.lengthFrames - 1
	}
}
