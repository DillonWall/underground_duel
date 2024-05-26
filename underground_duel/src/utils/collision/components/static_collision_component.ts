import { Entity } from "../../ecs/entity"
import { AreaComponent } from "../../shared_components/area_component"
import { CollisionComponent } from "./collision_component"
import { Polygon } from "sat"

export class StaticCollisionComponent extends CollisionComponent {
	constructor(entity: Entity, type: string, entityArea: AreaComponent, colliders: Polygon[]) {
		super(entity, type, entityArea, colliders)
	}

	onCollision(other: CollisionComponent): void {
		// Do nothing
	}
}
