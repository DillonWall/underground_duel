import { SpriteSheet } from "./spritesheet.ts"
import { Animation } from "../../../utils/animation/animation.ts"
import { AnimationMapComponent } from "../../../utils/shared_components/animation_map_component.ts"
import { IComponent } from "../../../utils/ecs/component.ts"

export class SpriteComponent implements IComponent {
    public spriteSheet: SpriteSheet
    public animationMap: AnimationMapComponent<string>
    public currentAnimationKey: string
    public get currentAnimation(): Animation | undefined {
        return this.animationMap.animations.get(this.currentAnimationKey)
    }

    constructor(spriteSheet: SpriteSheet) {
        this.spriteSheet = spriteSheet

        this.animationMap = new AnimationMapComponent<string>(spriteSheet.animations)

        this.currentAnimationKey = this.animationMap.animations.keys().next().value! // Default to the first animation
    }

    public setAnimation(animationKey: string, retainTiming: boolean = false): void {
        if (!this.currentAnimation) {
            throw new Error("Tried to set an animation before initializing")
        }

        const elapsedTime = this.currentAnimation.getElapsedTime()
        this.currentAnimation.sleep()
        this.currentAnimationKey = animationKey
        this.currentAnimation.awake()
        if (retainTiming) {
            this.currentAnimation.setElapsedTime(elapsedTime)
        }
    }

    public awake(): void {
        this.animationMap.awakeAnimation(this.currentAnimationKey)
    }

    public sleep(): void {
        this.animationMap.sleepAnimation(this.currentAnimationKey)
    }

    public update(deltaTime: number): void {
        this.animationMap.updateAnimation(this.currentAnimationKey, deltaTime)
    }
}
