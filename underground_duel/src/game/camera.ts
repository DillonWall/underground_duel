import { Settings } from "../settings/settings.js"
import { Vector2D } from "../utils/math/vector2d.js"
import { AreaComponent } from "../utils/shared_components/area_component.js"

export class Camera {
	private static _location: Vector2D
	private static _target: AreaComponent

	public static get location(): Vector2D {
		if (!this._location) {
			this.setLocationFromTarget()
		}
		return this._location
	}

	private constructor() {
		// Dont allow it to be instantiated
	}

	public static setTarget(areaComponent: AreaComponent) {
		this._target = areaComponent
	}

	private static setLocationFromTarget() {
		const x = this._target.loc.x - Settings.canvas.canvasWidth / Settings.video.scale
		const y = this._target.loc.y - Settings.canvas.canvasHeight / Settings.video.scale
		this._location = new Vector2D(x, y)
	}

	public static update(): void {
		this.setLocationFromTarget()
	}
}
