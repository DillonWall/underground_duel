import { Settings } from "../../../settings/settings.ts"
import { CanvasLayerManager } from "../../../utils/canvas/canvas_layer_manager.ts"
import { Vector2D } from "../../../utils/math/vector2d.ts"
import { Color } from "../../../utils/color/color.ts"
import { Character } from "../character.ts"
import { Camera } from "../../camera.ts"
import { DrawComponent } from "../../../utils/shared_components/draw_component.ts"

export class CharacterDrawComponent extends DrawComponent {
	override entity: Character
	public flip: boolean = false
	public layer: number
	public drawCenter: boolean

	constructor(entity: Character, layer: number, drawCenter: boolean) {
		super(entity)

		this.layer = layer
		this.drawCenter = drawCenter
	}

	public draw(): void {
		super.draw()

		if (!this.entity.spriteSheet.image.loaded) {
			if (Settings.debug.enabled) {
				console.warn("SpriteSheet image not loaded yet.")
			}
			return
		}

		try {
			const sLoc = this.entity.spriteSheet.imageDivider.getSubVectorLocation(
				this.entity.currentAnimation.getCurrentFrameImageIndex()
			)
			const sSize = this.entity.spriteSheet.imageDivider.getSubVectorSize()
			if (this.drawCenter) {
				CanvasLayerManager.layers[this.layer].drawImageCenter(
					this.entity.spriteSheet.image.image,
					sLoc,
					sSize,
					this.entity.area_c.size,
					this.flip
				)
			} else {
				CanvasLayerManager.layers[this.layer].drawImage(
					this.entity.spriteSheet.image.image,
					sLoc,
					sSize,
					Vector2D.subtract(this.entity.area_c.loc, Camera.location),
					this.entity.area_c.size,
					this.flip
				)
			}
		} catch (e) {
			console.log(e)
		}
	}

	public drawDebugInfo(): void {
		CanvasLayerManager.layers[Settings.canvas.numLayers - 1].drawText(
			Vector2D.toString(this.entity.area_c.loc),
			new Vector2D(20, 40),
			new Color(255, 0, 0, 1)
		)
	}
}
