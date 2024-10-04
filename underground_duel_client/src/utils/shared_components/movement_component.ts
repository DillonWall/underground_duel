import { IComponent } from "../ecs/component.ts"
import { Entity } from "../ecs/entity.ts"
import { Vector2D } from "../math/vector2d.ts"
import { AreaComponent } from "./area_component.ts"

export class MovementComponent implements IComponent {
	public entity: Entity
	public area: AreaComponent
	public prevDirection: Vector2D = Vector2D.zero()
	public direction: Vector2D = Vector2D.zero()
	public targetLoc: Vector2D = Vector2D.zero()
	public velocity: number = 0
	public moveSpeed: number
    public shouldLerp: boolean
	private setAnimationBasedOnDirection: (prevDirection: Vector2D) => void

	constructor(
		entity: Entity,
		area: AreaComponent,
		moveSpeed: number,
        shouldLerp: boolean,
		setAnimationBasedOnDirection: (prevDirection: Vector2D) => void
	) {
		this.entity = entity
		this.area = area
        this.targetLoc = area.loc
		this.moveSpeed = moveSpeed
        this.shouldLerp = shouldLerp
		this.setAnimationBasedOnDirection = setAnimationBasedOnDirection
	}

	public addDirection(direction: Vector2D): void {
		this.prevDirection = this.direction
		this.direction = Vector2D.add(this.direction, direction)
        this.updateMovement()
	}

	public removeDirection(direction: Vector2D): void {
		this.prevDirection = this.direction
		this.direction = Vector2D.subtract(this.direction, direction)
        this.updateMovement()
	}

    public setDirection(direction: Vector2D): void {
		this.prevDirection = this.direction
        this.direction = direction
        this.updateMovement()
    }

    private updateMovement(): void {
        this.clipDirection()
        if (Vector2D.areEqual(this.direction, this.prevDirection)) {
            return
        }
        this.setVelocityBasedOnDirection()
        this.setAnimationBasedOnDirection.call(this.entity, this.prevDirection)
    }

	private setVelocityBasedOnDirection(): void {
		if (Vector2D.isZero(this.direction)) {
			this.velocity = 0
		} else {
			this.velocity = this.moveSpeed
		}
	}

	private clipDirection(): void {
		if (this.direction.X > 1) {
			this.direction.X = 1
		}
		if (this.direction.X < -1) {
			this.direction.X = -1
		}
		if (this.direction.Y > 1) {
			this.direction.Y = 1
		}
		if (this.direction.Y < -1) {
			this.direction.Y = -1
		}
	}

	awake(): void {}
	sleep(): void {}
	update(deltaTime: number): void {
		this.targetLoc = Vector2D.round(
			Vector2D.add(this.targetLoc, Vector2D.multiply(this.direction, this.velocity * deltaTime))
		)
        if (this.shouldLerp) {
            const lerpAmt = (this.velocity == 0) ? 0.8 : 0.4
            this.area.loc = Vector2D.round(Vector2D.lerp(this.area.loc, this.targetLoc, lerpAmt))
        } else {
            this.area.loc = this.targetLoc
        }
	}
}
