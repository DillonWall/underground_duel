import { IComponent } from "../ecs/component.ts"
import { Entity } from "../ecs/entity.ts"
import { Vector2D } from "../math/vector2d.ts"

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
		return Vector2D.areEqual(this.loc, other.loc) && Vector2D.areEqual(this.size, other.size)
	}

	awake(): void {}
	sleep(): void {}
    // @ts-ignore: deltaTime is necessary in the signature for ECS system
	update(deltaTime: number): void {}
}
