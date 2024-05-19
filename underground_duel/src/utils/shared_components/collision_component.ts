import { IComponent } from "../ecs/component.js"
import { Entity } from "../ecs/entity.js"
import { AreaComponent } from "./area_component.js"
import { Polygon } from "sat"

export abstract class CollisionComponent implements IComponent {
	entity: Entity
	type: string
	entityArea: AreaComponent
	colliders: Polygon[]

	constructor(entity: Entity, type: string, entityArea: AreaComponent, colliders: Polygon[]) {
		this.entity = entity
		this.type = type
		this.entityArea = entityArea
		this.colliders = colliders
	}

	abstract onCollision(other: CollisionComponent): void
	abstract collidesWith(other: CollisionComponent): boolean
	protected getTranslatedColliders(): Polygon[] {
		// TODO: May want to have a way to check if the location has changed, and if not, then we don't need to update the colliders everytime (can store them in a variable and only update them if the location has changed)

		const translatedColliders: Polygon[] = []
		this.colliders.forEach((collider) => {
			translatedColliders.push(Polygon.translate(collider, this.entityArea.loc))
		})
		return translatedColliders
	}

	awake(): void {}
	sleep(): void {}
	update(deltaTime: number): void {}
}
