// Tile extends Entity
// TODO: (see Tilemap)
// loc: Vector2D
// size: Vector2D
// index: Vector2D
// imageIndex: number
import { Entity } from "../../utils/ecs/entity.js";
import { TileDrawComponent } from "./components/tiledraw.js";
export class Tile extends Entity {
    constructor(loc, size, index, imageIndex, tilesetIndex) {
        super();
        this.loc = loc;
        this.size = size;
        this.index = index;
        this.imageIndex = imageIndex;
        this.tilesetIndex = tilesetIndex;
        this.addComponent(new TileDrawComponent(this));
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
//# sourceMappingURL=tile.js.map