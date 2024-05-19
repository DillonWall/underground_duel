import { Entity } from "../ecs/entity.js"
import { IComponent } from "../ecs/component.js"
import { IDraw } from "../lifecycle/draw.js"
import { Settings } from "../../settings/settings.js"

export abstract class DrawComponent implements IComponent, IDraw {
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

	public draw(): void {
		if (Settings.debug.enabled) {
			this.drawDebugInfo()
		}
	}
	public abstract drawDebugInfo(): void
}
