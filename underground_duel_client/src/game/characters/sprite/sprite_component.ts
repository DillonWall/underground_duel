import { SpriteSheet } from "./spritesheet.ts"
import { Animation } from "../../../utils/animation/animation.ts"
import { AnimationMapComponent } from "../../../utils/shared_components/animation_map_component.ts"
import { IComponent } from "../../../utils/ecs/component.ts"

export class SpriteComponent implements IComponent {
    public spriteSheet: SpriteSheet
	public animationMap: AnimationMapComponent<string>
	public get currentAnimation(): Animation | undefined {
		return this.animationMap.animations.get(this._currentAnimationKey)
	}

	private _currentAnimationKey: string

	constructor(spriteSheet: SpriteSheet) {
        this.spriteSheet = spriteSheet

		this.animationMap = new AnimationMapComponent<string>(spriteSheet.animations)

		this._currentAnimationKey = this.animationMap.animations.keys().next().value! // Default to the first animation
	}

	public setAnimation(animationKey: string): void {
        if (!this.currentAnimation) {
            throw new Error("Tried to set an animation before initializing")
        }

        const elapsedTime = this.currentAnimation.getElapsedTime()
		this.currentAnimation.sleep()
		this._currentAnimationKey = animationKey
		this.currentAnimation.awake()
        this.currentAnimation.setElapsedTime(elapsedTime)
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
