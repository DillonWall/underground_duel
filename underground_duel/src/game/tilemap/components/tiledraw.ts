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
		const tileset = TilesetManager.getTilesetByName(this.entity.tilesetName)
		const sLoc = tileset.getSubVectorLocation(this.entity.imageIndex)
		const sSize = tileset.getSubVectorSize()
		CanvasLayerManager.layers[this.entity.layer].drawImage(
			tileset.image,
			sLoc,
			sSize,
			this.entity.loc,
			this.entity.size
		)
	}

	private drawDebugInfo(): void {
		if (!Settings.debug.enabled) {
			return
		}

		CanvasLayerManager.layers[1].drawText(
			Vector2D.toString(this.entity.index),
			this.entity.loc,
			new Color(255, 0, 0, 1)
		)
	}
}
