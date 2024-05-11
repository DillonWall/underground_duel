import { Entity } from "../ecs/entity.js"
import { IComponent } from "../ecs/component.js"

export abstract class DrawComponent implements IComponent {
	entity: Entity
	private _sleeping: boolean

	constructor(entity: Entity) {
		this.entity = entity
	}

	awake(): void {
		this._sleeping = false
	}

	sleep(): void {
		this._sleeping = true
	}

	update(deltaTime: number): void {
		if (this._sleeping) {
			return
		}

		this.draw()
		this.drawDebugInfo()
	}

	protected abstract draw(): void

	protected abstract drawDebugInfo(): void
}
