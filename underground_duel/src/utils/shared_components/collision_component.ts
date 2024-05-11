import { Polygon } from "collider2d"
import { IComponent } from "../ecs/component.js"
import { Entity } from "../ecs/entity.js"
import { Vector2D } from "../math/vector2d.js"
import { AreaComponent } from "./area_component.js"

export class CollisionComponent implements IComponent {
	entity: Entity | null
	type: string
	entityArea: AreaComponent
	colliders: Polygon[]

	constructor(entity: Entity, type: string, entityArea: AreaComponent, colliders: Polygon[]) {
		this.entity = entity
		this.type = type
		this.entityArea = entityArea
		this.colliders = colliders
	}

	awake(): void {}
	sleep(): void {}
	update(deltaTime: number): void {}
}
