import { Entity } from "../../../utils/ecs/entity.ts"
import { SpriteSheet } from "./spritesheet.ts"
import { Animation } from "../../../utils/animation/animation.ts"
import { AnimationMapComponent } from "../../../utils/shared_components/animation_map_component.ts"

export class Sprite extends Entity {
	public spriteSheet: SpriteSheet
	public animationMap: AnimationMapComponent<string>
	public get currentAnimation(): Animation | undefined {
		return this.animationMap.animations.get(this._currentAnimationKey)
	}

	private _currentAnimationKey: string

	constructor(spriteSheet: SpriteSheet) {
		super()

		this.spriteSheet = spriteSheet

		this.animationMap = new AnimationMapComponent<string>(this, spriteSheet.animations)
		this.addComponent(this.animationMap)

		this._currentAnimationKey = this.animationMap.animations.keys().next().value! // Default to the first animation
	}

	public setAnimation(animationKey: string): void {
		this.currentAnimation?.sleep()
		this._currentAnimationKey = animationKey
		this.currentAnimation?.awake()
	}

	public awake(): void {
		super.awake()

		this.animationMap.awakeAnimation(this._currentAnimationKey)
	}

	public sleep(): void {
		super.sleep()

		this.animationMap.sleepAnimation(this._currentAnimationKey)
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		this.animationMap.updateAnimation(this._currentAnimationKey, deltaTime)
	}
}
