import { Settings } from "../../../settings/settings.ts"
import { CanvasLayerManager } from "../../../utils/canvas/canvas_layer_manager.ts"
import { Color } from "../../../utils/color/color.ts"
import { Vector2D } from "../../../utils/math/vector2d.ts"
import { Camera } from "../../camera.ts"
import { Tile } from "../tile.ts"
import { TilesetManager } from "../tileset_manager.ts"
import { DrawComponent } from "../../../utils/shared_components/draw_component.ts"
import { Tileset } from "../tileset.ts"

export class TileDrawComponent extends DrawComponent {
	override entity: Tile

	constructor(entity: Tile) {
		super(entity)
        this.entity = entity
	}

	private getImageIndexBasedOnAnimation(tileset: Tileset, index: number): number {
		// For animated tiles:
		const animationOfIndex = tileset.animationMap.animations.get(index)
		if (animationOfIndex) {
			return animationOfIndex.getCurrentFrameImageIndex()
		}
		return index
	}

	public draw(): void {
		super.draw()

		const tileset = TilesetManager.getTilesetByName(this.entity.tilesetName)
        if (tileset == undefined)
            throw Error(`Could not get tileset by name ${this.entity.tilesetName}`)
		if (!tileset.image.loaded) {
			if (Settings.debug.enabled) {
				console.warn("Tileset image not loaded yet.")
			}
			return
		}

		const index = this.getImageIndexBasedOnAnimation(tileset, this.entity.imageIndex)
		const sLoc = tileset.imageDivider.getSubVectorLocation(index)
		const sSize = tileset.imageDivider.getSubVectorSize()
		CanvasLayerManager.layers[this.entity.layer].drawImage(
			tileset.image.image,
			sLoc,
			sSize,
			Vector2D.subtract(this.entity.area.loc, Camera.location),
			this.entity.area.size
		)
	}

	public drawDebugInfo(): void {
		CanvasLayerManager.layers[Settings.canvas.numLayers - 1].drawText(
			Vector2D.toString(this.entity.index),
			Vector2D.add(Vector2D.subtract(this.entity.area.loc, Camera.location), new Vector2D(0, 4)),
			new Color(255, 0, 0, 1)
		)
	}
}
