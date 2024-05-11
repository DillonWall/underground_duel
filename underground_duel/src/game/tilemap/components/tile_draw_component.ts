import { Settings } from "../../../settings/settings.js"
import { CanvasLayerManager } from "../../../utils/canvas/canvas_layer_manager.js"
import { Color } from "../../../utils/color/color.js"
import { Vector2D } from "../../../utils/math/vector2d.js"
import { Camera } from "../../camera.js"
import { Tile } from "../tile.js"
import { TilesetManager } from "../tileset_manager.js"
import { DrawComponent } from "../../../utils/shared_components/draw_component.js"

export class TileDrawComponent extends DrawComponent {
	override entity: Tile

	constructor(entity: Tile) {
		super(entity)
	}

	protected override draw(): void {
		const tileset = TilesetManager.getTilesetByName(this.entity.tilesetName)
		const sLoc = tileset.getSubVectorLocation(this.entity.imageIndex)
		const sSize = tileset.getSubVectorSize()
		CanvasLayerManager.layers[this.entity.layer].drawImage(
			tileset.image,
			sLoc,
			sSize,
			Vector2D.subtract(this.entity.area.loc, Camera.location),
			this.entity.area.size
		)
	}

	protected override drawDebugInfo(): void {
		if (!Settings.debug.enabled) {
			return
		}

		CanvasLayerManager.layers[Settings.canvas.numLayers - 1].drawText(
			Vector2D.toString(this.entity.index),
			this.entity.area.loc,
			new Color(255, 0, 0, 1)
		)
	}
}
