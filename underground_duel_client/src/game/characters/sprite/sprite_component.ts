import { Entity } from "../../../utils/ecs/entity.ts"
import { SpriteSheet } from "./spritesheet.ts"
import { Animation } from "../../../utils/animation/animation.ts"
import { AnimationMapComponent } from "../../../utils/shared_components/animation_map_component.ts"
import { IComponent } from "../../../utils/ecs/component.ts"

export class SpriteComponent implements IComponent {
    public entity: Entity | null
    public spriteSheet: SpriteSheet
	public animationMap: AnimationMapComponent<string>
	public get currentAnimation(): Animation | undefined {
		return this.animationMap.animations.get(this._currentAnimationKey)
	}

	private _currentAnimationKey: string

	constructor(entity: Entity, spriteSheet: SpriteSheet) {
        this.entity = entity
        this.spriteSheet = spriteSheet

		this.animationMap = new AnimationMapComponent<string>(entity, spriteSheet.animations)

		this._currentAnimationKey = this.animationMap.animations.keys().next().value! // Default to the first animation
	}

	public setAnimation(animationKey: string): void {
		this.currentAnimation?.sleep()
		this._currentAnimationKey = animationKey
		this.currentAnimation?.awake()
	}

	public awake(): void {
		this.animationMap.awakeAnimation(this._currentAnimationKey)
	}

	public sleep(): void {
		this.animationMap.sleepAnimation(this._currentAnimationKey)
	}

	public update(deltaTime: number): void {
		this.animationMap.updateAnimation(this._currentAnimationKey, deltaTime)
	}
}
