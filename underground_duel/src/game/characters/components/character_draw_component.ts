import { Settings } from "../../../settings/settings.js"
import { CanvasLayerManager } from "../../../utils/canvas/canvas_layer_manager.js"
import { Vector2D } from "../../../utils/math/vector2d.js"
import { Color } from "../../../utils/color/color.js"
import { Character } from "../character.js"
import { Camera } from "../../camera.js"
import { DrawComponent } from "../../../utils/shared_components/draw_component.js"

export class CharacterDrawComponent extends DrawComponent {
	override entity: Character

	constructor(entity: Character) {
		super(entity)
	}

	protected override draw(): void {
		try {
			const sLoc = this.entity.getCurrentSubVectorLocation()
			const sSize = this.entity.getSubVectorSize()
			if (this.entity.drawCenter) {
				CanvasLayerManager.layers[this.entity.layer].drawImageCenter(
					this.entity.spriteSheet,
					sLoc,
					sSize,
					this.entity.area.size,
					this.entity.flipAnimation
				)
			} else {
				const sLoc = this.entity.getCurrentSubVectorLocation()
				const sSize = this.entity.getSubVectorSize()
				CanvasLayerManager.layers[this.entity.layer].drawImage(
					this.entity.spriteSheet,
					sLoc,
					sSize,
					Vector2D.subtract(this.entity.area.loc, Camera.location),
					this.entity.area.size,
					this.entity.flipAnimation
				)
			}
		} catch (e) {
			console.log(e)
		}
	}

	protected override drawDebugInfo(): void {
		if (!Settings.debug.enabled) {
			return
		}

		CanvasLayerManager.layers[Settings.canvas.numLayers - 1].drawText(
			Vector2D.toString(this.entity.area.loc),
			new Vector2D(20, 40),
			new Color(255, 0, 0, 1)
		)
	}
}
