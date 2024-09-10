import { IComponent } from "../ecs/component.js"
import { Entity } from "../ecs/entity.js"
import { Vector2D } from "../math/vector2d.js"

export class AreaComponent implements IComponent {
	entity: Entity | null
	loc: Vector2D
	size: Vector2D

	constructor(entity: Entity, loc?: Vector2D, size?: Vector2D) {
		this.entity = entity
		this.loc = loc ?? new Vector2D(0, 0)
		this.size = size ?? new Vector2D(0, 0)
	}

	public equals(other: AreaComponent): boolean {
		return Vector2D.equals(this.loc, other.loc) && Vector2D.equals(this.size, other.size)
	}

	awake(): void {}
	sleep(): void {}
	update(deltaTime: number): void {}
}
