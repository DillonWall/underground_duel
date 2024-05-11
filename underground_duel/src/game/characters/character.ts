import { SpriteModel } from "../../models/sprites/sprite_model.js"
import { Sprite } from "./sprite/sprite.js"
import { AreaComponent } from "../../utils/shared_components/area_component.js"
import { CharacterDrawComponent } from "./components/character_draw_component.js"
import { Vector2D } from "../../utils/math/vector2d.js"

export abstract class Character extends Sprite {
	protected _direction: Vector2D = Vector2D.zero()
	protected _velocity: number = 0
	protected _moveSpeed: number
	public area: AreaComponent
	public layer: number
	public flipAnimation: boolean = false
	public drawCenter: boolean

	constructor(
		spriteModel: SpriteModel,
		loc: Vector2D,
		loopedAnimations: string[],
		moveSpeed: number,
		layer: number,
		drawCenter: boolean = false
	) {
		super(spriteModel.imageSrc, spriteModel.frameWidth, spriteModel.frameHeight, spriteModel.animations)

		this._moveSpeed = moveSpeed
		this.layer = layer
		this.drawCenter = drawCenter
		this.area = new AreaComponent(this, loc, new Vector2D(spriteModel.frameWidth, spriteModel.frameHeight))
		this.components.push(this.area)
		this.components.push(new CharacterDrawComponent(this))

		// setup animations that should loop
		this.animations.forEach((animation, animationName) => {
			if (
				loopedAnimations.some((x) => {
					return x === animationName
				})
			) {
				animation.loop = true
			}
		})
	}

	protected setAnimation(animation: string): void {
		this.currentAnimation = animation
	}

	public addDirection(direction: Vector2D): void {
		this._direction = Vector2D.add(this._direction, direction)

		this.validateDirection()
		this.setVelocityBasedOnDirection()
		this.setAnimationBasedOnDirection()
	}

	public removeDirection(direction: Vector2D): void {
		const prevDirection = this._direction
		this._direction = Vector2D.subtract(this._direction, direction)

		this.validateDirection()
		this.setVelocityBasedOnDirection()
		this.setAnimationBasedOnDirection(prevDirection)
	}

	private setVelocityBasedOnDirection(): void {
		if (Vector2D.isZero(this._direction)) {
			this._velocity = 0
		} else {
			this._velocity = this._moveSpeed
		}
	}

	private validateDirection(): void {
		if (this._direction.x > 1) {
			this._direction.x = 1
		}
		if (this._direction.x < -1) {
			this._direction.x = -1
		}
		if (this._direction.y > 1) {
			this._direction.y = 1
		}
		if (this._direction.y < -1) {
			this._direction.y = -1
		}
	}

	protected abstract setAnimationBasedOnDirection(prevDirection?: Vector2D): void

	public update(deltaTime: number): void {
		super.update(deltaTime)

		this.area.loc = Vector2D.add(this.area.loc, Vector2D.multiply(this._direction, this._velocity * deltaTime))
	}
}
