import { IComponent } from "../ecs/component.ts"
import { AnimationModel } from "../../models/animation/animation_model.ts"
import { Animation } from "../animation/animation.ts"

export class AnimationMapComponent<KeyType> implements IComponent {
	public animations: Map<KeyType, Animation> = new Map()

	constructor(animations: Array<Array<KeyType | AnimationModel>>) {
		animations.forEach((entry) => {
			const animationName = entry[0] as KeyType
			const animationModel = entry[1] as AnimationModel
			this.animations.set(animationName, new Animation(animationModel))
		})
	}

	public awakeAllAnimations(): void {
		this.animations.forEach((animation) => {
			animation.awake()
		})
	}

	public sleepAllAnimations(): void {
		this.animations.forEach((animation) => {
			animation.sleep()
		})
	}

	public updateAllAnimations(deltaTime: number): void {
		this.animations.forEach((animation) => {
			animation.update(deltaTime)
		})
	}

	public awakeAnimation(animationKey: KeyType): void {
		const animation = this.animations.get(animationKey)
		if (animation) {
			animation.awake()
		}
	}

	public sleepAnimation(animationKey: KeyType): void {
		const animation = this.animations.get(animationKey)
		if (animation) {
			animation.sleep()
		}
	}

	public updateAnimation(animationKey: KeyType, deltaTime: number): void {
		const animation = this.animations.get(animationKey)
		if (animation) {
			animation.update(deltaTime)
		}
	}

	awake(): void {}
	sleep(): void {}
    // @ts-ignore: deltaTime is necessary in the signature for ECS system
	update(deltaTime: number): void {}
}
