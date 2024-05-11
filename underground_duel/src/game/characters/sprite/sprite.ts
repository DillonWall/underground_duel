import { SpriteAnimationModel } from "../../../models/sprites/sprite_animation_model.js"
import { Entity } from "../../../utils/ecs/entity.js"
import { Vector2D } from "../../../utils/math/vector2d.js"
import { SpriteAnimation as SpriteAnimation } from "./sprite_animation.js"

export class Sprite extends Entity {
	private _spriteSheet: HTMLImageElement
	private _imageSrc: string
	private _frameWidth: number
	private _frameHeight: number
	private _frameCountX: number
	private _frameCountY: number
	private _loaded: boolean = false
	protected animations: Map<string, SpriteAnimation> = new Map()
	protected currentAnimation: string

	public get spriteSheet(): HTMLImageElement {
		return this._spriteSheet
	}

	constructor(
		imageSrc: string,
		frameWidth: number,
		frameHeight: number,
		animationModels: Array<Array<string | SpriteAnimationModel>>
	) {
		super()

		this._imageSrc = imageSrc
		this._frameWidth = frameWidth
		this._frameHeight = frameHeight
		animationModels.forEach((entry) => {
			const animationName = entry[0] as string
			const animationModel = entry[1] as SpriteAnimationModel
			this.animations.set(animationName, new SpriteAnimation(animationModel))
		})

		this.loadImage()
	}

	public async loadImage(): Promise<void> {
		const imageLoadPromise = new Promise((resolve) => {
			this._spriteSheet = new Image()
			this._spriteSheet.onload = resolve
			this._spriteSheet.src = this._imageSrc
			this._loaded = true
		})

		await imageLoadPromise
		this._frameCountX = this._spriteSheet.width / this._frameWidth
		this._frameCountY = this._spriteSheet.height / this._frameHeight
	}

	public getCurrentSubVectorLocation(): Vector2D {
		return this.getSubVectorLocation(this.animations.get(this.currentAnimation).getCurrentFrameImageIndex())
	}

	private getSubVectorLocation(index: number): Vector2D {
		if (index < 0 || index >= this._frameCountX * this._frameCountY) {
			throw new Error("Index out of bounds, X:" + this._frameCountX + " Y:" + this._frameCountY)
		}

		return new Vector2D(
			this._frameWidth * (index % this._frameCountX),
			this._frameHeight * Math.floor(index / this._frameCountX)
		)
	}

	public getSubVectorSize(): Vector2D {
		return new Vector2D(this._frameWidth, this._frameHeight)
	}

	public awake(): void {
		super.awake()

		this.animations.forEach((animation) => {
			animation.awake()
		})
	}

	public sleep(): void {
		super.sleep()

		this.animations.forEach((animation) => {
			animation.sleep()
		})
	}

	public update(deltaTime: number): void {
		if (!this._loaded) {
			return
		}

		super.update(deltaTime)

		this.animations.forEach((animation) => {
			animation.update(deltaTime)
		})
	}
}
