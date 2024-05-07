import { Settings } from "../../../settings/settings.js";
import { CanvasLayerManager } from "../../../utils/canvas/canvas_layer_manager.js";
import { Color } from "../../../utils/color/color.js";
import { Vector2D } from "../../../utils/math/vector2d.js";
import { TilesetManager } from "../tileset_manager.js";
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
        const tileset = TilesetManager.getTilesetByName(this.entity.tilesetName);
        const sLoc = tileset.getSubVectorLocation(this.entity.imageIndex);
        const sSize = tileset.getSubVectorSize();
        CanvasLayerManager.layers[this.entity.layer].drawImage(tileset.image, sLoc, sSize, this.entity.loc, this.entity.size);
    }
    drawDebugInfo() {
        if (!Settings.debug.enabled) {
            return;
        }
        CanvasLayerManager.layers[1].drawText(Vector2D.toString(this.entity.index), this.entity.loc, new Color(255, 0, 0, 1));
    }
}
//# sourceMappingURL=tiledraw.js.map