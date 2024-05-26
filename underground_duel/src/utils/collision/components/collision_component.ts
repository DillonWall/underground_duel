import { IComponent } from "../../ecs/component.js"
import { Entity } from "../../ecs/entity.js"
import { Vector2D } from "../../math/vector2d.js"
import { AreaComponent } from "../../shared_components/area_component.js"
import { Polygon, Vector, testPolygonPolygon, Response } from "sat"

export abstract class CollisionComponent implements IComponent {
	public entity: Entity
	public type: string
	public entityArea: AreaComponent
	public colliders: Polygon[]
	private _entityOriginalSize: Vector2D
	private _adjustedColliders: Polygon[]
	private _previousEntityArea: AreaComponent | null = null
	// TODO: add draw component

	constructor(
		entity: Entity,
		type: string,
		entityArea: AreaComponent,
		entityOriginalSize: Vector2D,
		colliders: Polygon[]
	) {
		this.entity = entity
		this.type = type
		this.entityArea = entityArea
		this._entityOriginalSize
		this.colliders = colliders
	}

	public abstract onCollision(other: CollisionComponent): void

	public collidesWith(other: CollisionComponent): Response | null {
		// TODO: Actually we should only have 1 polygon per collision component
		this.getTranslatedColliders().forEach((collider) => {
			let response: Response | null = new Response()
			if (
				other
					.getTranslatedColliders()
					.some((otherCollider) => testPolygonPolygon(collider, otherCollider, response))
			) {
				return response
			}
		})
	}

	private scalePolygon(polygon: Polygon, x: number, y: number): Polygon {
		if (x === 1 && y === 1) {
			return polygon
		}
		let newPoints: Vector[] = []
		for (const point of polygon.points) {
			newPoints.push(new Vector(point.x * x, point.y * y))
		}
		return polygon.setPoints(newPoints)
	}

	public getTranslatedColliders(): Polygon[] {
		// Check if the location has changed, and if not, then we don't need to update the colliders everytime (stored in _translatedColliders)
		if (this._previousEntityArea == null || !this._previousEntityArea.equals(this.entityArea)) {
			// Clone entityArea to previousEntityArea
			this._previousEntityArea = Object.create(
				Object.getPrototypeOf(this.entityArea),
				Object.getOwnPropertyDescriptors(this.entityArea)
			)
			// Get the new translated colliders
			this._adjustedColliders = []
			this.colliders.forEach((collider) => {
				let adjustedCollider: Polygon = this.scalePolygon(
					collider,
					this.entityArea.size.x / this._entityOriginalSize.x,
					this.entityArea.size.y / this._entityOriginalSize.y
				)
				adjustedCollider = adjustedCollider.translate(this.entityArea.loc.x, this.entityArea.loc.y)
				this._adjustedColliders.push(adjustedCollider)
			})
		}
		return this._adjustedColliders
	}

	awake(): void {}
	sleep(): void {}
	update(deltaTime: number): void {}
}
