import { Settings } from "../../../settings/settings.ts"
import { CanvasLayerManager } from "../../../utils/canvas/canvas_layer_manager.ts"
import { Vector2D } from "../../../utils/math/vector2d.ts"
import { Color } from "../../../utils/color/color.ts"
import { Camera } from "../../camera.ts"
import { DrawComponent } from "../../../utils/shared_components/draw_component.ts"
import { SpriteComponent } from "../sprite/sprite_component.ts"
import { AreaComponent } from "../../../utils/shared_components/area_component.ts"

export class CharacterDrawComponent extends DrawComponent {
    public sprite_c: SpriteComponent
    public area_c: AreaComponent
	public flip: boolean = false
	public layer: number
	public drawCenter: boolean

	constructor(spriteComponent: SpriteComponent, areaComponent: AreaComponent, layer: number, drawCenter: boolean) {
		super()
        this.sprite_c = spriteComponent
        this.area_c = areaComponent
		this.layer = layer
		this.drawCenter = drawCenter
	}

	public draw(): void {
		super.draw()

		if (!this.sprite_c.spriteSheet.image.loaded) {
			if (Settings.debug.enabled) {
				console.warn("SpriteSheet image not loaded yet.")
			}
			return
		}

		try {
            if (this.sprite_c.currentAnimation == undefined)
                return
			const sLoc = this.sprite_c.spriteSheet.imageDivider.getSubVectorLocation(
				this.sprite_c.currentAnimation.getCurrentFrameImageIndex()
			)
			const sSize = this.sprite_c.spriteSheet.imageDivider.getSubVectorSize()
			if (this.drawCenter) {
				CanvasLayerManager.layers[this.layer].drawImageCenter(
					this.sprite_c.spriteSheet.image.image,
					sLoc,
					sSize,
					this.area_c.size,
					this.flip
				)
			} else {
				CanvasLayerManager.layers[this.layer].drawImage(
					this.sprite_c.spriteSheet.image.image,
					sLoc,
					sSize,
					Vector2D.subtract(this.area_c.loc, Camera.location),
					this.area_c.size,
					this.flip
				)
			}
		} catch (e) {
			console.log(e)
		}
	}

	public drawDebugInfo(): void {
		CanvasLayerManager.layers[Settings.canvas.numLayers - 1].drawText(
			Vector2D.toString(this.area_c.loc),
			new Vector2D(20, 40),
			new Color(255, 0, 0, 1)
		)
	}
}
