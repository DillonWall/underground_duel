import { Settings } from "../settings/settings.ts"
import { Vector2D } from "../utils/math/vector2d.ts"
import { AreaComponent } from "../utils/shared_components/area_component.ts"

export class Camera {
	private static _location: Vector2D
	private static _target: AreaComponent

	public static get location(): Vector2D {
		if (!this._location) {
			this.setLocationFromTarget()
		}
		return Vector2D.round(this._location)
	}

	private constructor() {
		// Dont allow it to be instantiated
	}

	public static setTarget(areaComponent: AreaComponent) {
		this._target = areaComponent
	}

	private static setLocationFromTarget() {
        const halfScreenWidth = Settings.canvas.canvasWidth / (2 * Settings.video.scale)
        const halfScreenHeight = Settings.canvas.canvasHeight / (2 * Settings.video.scale)
        const halfTargetWidth = this._target.size.X / 2
        const halfTargetHeight = this._target.size.Y / 2
		const x = this._target.loc.X + halfTargetWidth - halfScreenWidth
		const y = this._target.loc.Y + halfTargetHeight - halfScreenHeight
		this._location = new Vector2D(x, y)
	}

	public static update(): void {
		this.setLocationFromTarget()
	}
}
