import { Entity } from "../ecs/entity.js"

export abstract class Animation extends Entity {
	protected delays: number[]
	public loop: boolean
	protected resetOnAwake: boolean

	// Calculated properties
	protected lengthFrames: number
	protected lengthTime: number
	protected elapsedTime: number
	protected currentFrame: number
	protected playing: boolean

	constructor(delays: number[], loop: boolean, resetOnAwake: boolean = true) {
		super()

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
		super.awake()

		if (this.resetOnAwake) {
			this.elapsedTime = 0
			this.currentFrame = 0
		}
		this.playing = true
	}

	public sleep(): void {
		super.sleep()

		this.playing = false
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

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
		for (let i = 0; i < this.delays.length; i++) {
			totalTime += this.delays[i]
			if (totalTime >= this.elapsedTime) {
				return i
			}
		}
		return this.lengthFrames - 1
	}
}
