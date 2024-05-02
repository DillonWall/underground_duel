import { Settings } from "../../settings/settings.js";
import { Vector2D } from "../math/vector2d.js";
import { Canvas } from "./canvas.js";
export class CanvasLayer {
    constructor() {
        /* make it unaccessible */
    }
    static get layers() {
        if (!this._layers) {
            this._layers = [];
            for (let i = 0; i < this._numLayers; ++i) {
                this._layers.push(this.initCanvas({ zIndex: i.toString() }));
            }
        }
        return this._layers;
    }
    static initCanvas(style) {
        const canvas = new Canvas(new Vector2D(Settings.canvas.canvasWidth, Settings.canvas.canvasHeight));
        canvas.awake();
        canvas.setStyle(style);
        return canvas;
    }
}
CanvasLayer._numLayers = Settings.canvas.numLayers;
//# sourceMappingURL=canvas_layer.js.map