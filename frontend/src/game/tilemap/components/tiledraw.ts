import { Settings } from "../../../settings/settings.js"
import { CanvasLayer } from "../../../utils/canvas/canvas_layer.js"
import { Color } from "../../../utils/color/color.js"
import { IComponent } from "../../../utils/ecs/component.js"
import { Tile } from "../tile.js"

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
		CanvasLayer.layers[0].fillRect(this.entity.loc, this.entity.size, new Color(0, 255, 0, 1))
	}

	private drawDebugInfo(): void {
		if (!Settings.debug.enabled) {
			return
		}

		CanvasLayer.layers[1].drawText(this.entity.index.toString(), this.entity.loc, new Color(255, 0, 0, 1))
	}
}
