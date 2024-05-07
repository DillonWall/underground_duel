// Tile extends Entity
// TODO: (see Tilemap)
// loc: Vector2D
// size: Vector2D
// index: Vector2D
// imageIndex: number
import { Entity } from "../../utils/ecs/entity.js";
import { TileDrawComponent } from "./components/tiledraw.js";
export class Tile extends Entity {
    constructor(loc, size, index, layer, imageIndex, tilesetName) {
        super();
        this.loc = loc;
        this.size = size;
        this.index = index;
        this.layer = layer;
        this.imageIndex = imageIndex;
        this.tilesetName = tilesetName;
    }
    static fromTileModel(tileModel, layer) {
        if (!tileModel) {
            return null;
        }
        return new Tile(tileModel.loc, tileModel.size, tileModel.index, layer, tileModel.imageIndex, tileModel.tilesetName);
    }
    awake() {
        super.awake();
        this.addComponent(new TileDrawComponent(this));
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
//# sourceMappingURL=tile.js.map