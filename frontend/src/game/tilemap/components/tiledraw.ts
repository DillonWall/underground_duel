import { IComponent } from "../../../utils/ecs/component.js"
import { Entity } from "../../../utils/ecs/entity.js"

export class TileDrawComponent implements IComponent {
	public entity: Entity

	constructor(entity: Entity) {
		this.entity = entity
	}

	update(deltaTime: number): void {
		throw new Error("Method not implemented.")
	}
	awake(): void {
		throw new Error("Method not implemented.")
	}
}
