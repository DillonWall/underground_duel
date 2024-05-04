import { Settings } from "../../../settings/settings.js"
import { CanvasLayerManager } from "../../../utils/canvas/canvas_layer_manager.js"
import { Color } from "../../../utils/color/color.js"
import { IComponent } from "../../../utils/ecs/component.js"
import { Vector2D } from "../../../utils/math/vector2d.js"
import { Tile } from "../tile.js"
import { TilesetManager } from "../tileset_manager.js"

export class TileDrawComponent implements IComponent {
	entity: Tile

	constructor(entity: Tile) {
		this.entity = entity
	}

	awake(): void {}

	update(deltaTime: number): void {
		this.draw()
		this.drawDebugInfo()
	}

	private draw(): void {
		// CanvasLayerManager.layers[0].fillRect(
		// 	this.entity.loc,
		// 	this.entity.size,
		// 	new Color(Math.min(this.entity.loc.y, 255), Math.min(this.entity.loc.x, 255), 0, 1)
		// )

		const tileset = TilesetManager.getTilesetById(this.entity.tilesetId)
		const sLoc = tileset.getSubVectorLocation(this.entity.imageIndex)
		const sSize = tileset.getSubVectorSize()
		CanvasLayerManager.layers[0].drawImage(tileset.image, sLoc, sSize, this.entity.loc, this.entity.size)
	}

	private drawDebugInfo(): void {
		if (!Settings.debug.enabled) {
			return
		}

		CanvasLayerManager.layers[1].drawText(this.entity.index.toString(), this.entity.loc, new Color(255, 0, 0, 1))
	}
}
