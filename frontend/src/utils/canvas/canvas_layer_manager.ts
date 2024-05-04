import { Settings } from "../../settings/settings.js"
import { Vector2D } from "../math/vector2d.js"
import { Canvas } from "./canvas.js"

export class CanvasLayerManager {
	private static _layers: Canvas[]
	private static readonly _numLayers: number = Settings.canvas.numLayers

	private constructor() {
		/* make it unaccessible */
	}

	public static get layers(): Canvas[] {
		if (!this._layers) {
			this._layers = []

			for (let i = 0; i < this._numLayers; ++i) {
				this._layers.push(this.initCanvas({ zIndex: i.toString() }))
			}
		}

		return this._layers
	}

	private static initCanvas(style: Partial<CSSStyleDeclaration>): Canvas {
		const canvas = new Canvas(new Vector2D(Settings.canvas.canvasWidth, Settings.canvas.canvasHeight))
		canvas.awake()
		canvas.setStyle(style)

		return canvas
	}
}
