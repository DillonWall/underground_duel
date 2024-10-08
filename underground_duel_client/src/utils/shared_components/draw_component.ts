import { IComponent } from "../ecs/component.ts"
import { IDraw } from "../lifecycle/draw.ts"
import { Settings } from "../../settings/settings.ts"

export abstract class DrawComponent implements IComponent, IDraw {
	private _sleeping: boolean = false

	constructor() {
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
