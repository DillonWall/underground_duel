import { Entity } from "../ecs/entity.ts"
import { IComponent } from "../ecs/component.ts"
import { IDraw } from "../lifecycle/draw.ts"
import { Settings } from "../../settings/settings.ts"

export abstract class DrawComponent implements IComponent, IDraw {
	entity: Entity
	private _sleeping: boolean = false

	constructor(entity: Entity) {
		this.entity = entity
	}

	awake(): void {
		this._sleeping = false
	}

	sleep(): void {
		this._sleeping = true
	}

    // @ts-ignore: deltaTime is necessary in the signature for ECS system
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
