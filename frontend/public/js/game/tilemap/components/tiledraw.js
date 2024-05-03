import { Settings } from "../../../settings/settings.js";
import { CanvasLayer } from "../../../utils/canvas/canvas_layer.js";
import { Color } from "../../../utils/color/color.js";
export class TileDrawComponent {
    constructor(entity) {
        this.entity = entity;
    }
    awake() { }
    update(deltaTime) {
        this.draw();
        this.drawDebugInfo();
    }
    draw() {
        CanvasLayer.layers[0].fillRect(this.entity.loc, this.entity.size, new Color(0, 255, 0, 1));
    }
    drawDebugInfo() {
        if (!Settings.debug.enabled) {
            return;
        }
        CanvasLayer.layers[1].drawText(this.entity.index.toString(), this.entity.loc, new Color(255, 0, 0, 1));
    }
}
//# sourceMappingURL=tiledraw.js.map