import { IComponent } from "../ecs/component.ts"
import { Entity } from "../ecs/entity.ts"
import { Vector2D } from "../math/vector2d.ts"
import { AreaComponent } from "./area_component.ts"

export class MovementComponent implements IComponent {
	public entity: Entity
	public area: AreaComponent
	public prevDirection: Vector2D = Vector2D.zero()
	public direction: Vector2D = Vector2D.zero()
	public velocity: number = 0
	public moveSpeed: number
	private setAnimationBasedOnDirection: (prevDirection?: Vector2D) => void

	constructor(
		entity: Entity,
		area: AreaComponent,
		moveSpeed: number,
		setAnimationBasedOnDirection: (prevDirection?: Vector2D) => void
	) {
		this.entity = entity
		this.area = area
		this.moveSpeed = moveSpeed
		this.setAnimationBasedOnDirection = setAnimationBasedOnDirection
	}

	public addDirection(direction: Vector2D): void {
		this.prevDirection = this.direction
		this.direction = Vector2D.add(this.direction, direction)

		this.validateDirection()
		this.setVelocityBasedOnDirection()
		this.setAnimationBasedOnDirection.call(this.entity)
	}

	public removeDirection(direction: Vector2D): void {
		this.prevDirection = this.direction
		this.direction = Vector2D.subtract(this.direction, direction)

		this.validateDirection()
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

	private validateDirection(): void {
		if (this.direction.x > 1) {
			this.direction.x = 1
		}
		if (this.direction.x < -1) {
			this.direction.x = -1
		}
		if (this.direction.y > 1) {
			this.direction.y = 1
		}
		if (this.direction.y < -1) {
			this.direction.y = -1
		}
	}

	awake(): void {}
	sleep(): void {}
	update(deltaTime: number): void {
		this.area.loc = Vector2D.round(
			Vector2D.add(this.area.loc, Vector2D.multiply(this.direction, this.velocity * deltaTime))
		)
	}
}
