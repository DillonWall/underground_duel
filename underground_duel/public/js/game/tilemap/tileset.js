import { Settings } from "../../settings/settings.js";
import { Vector2D } from "../../utils/math/vector2d.js";
import { TileAnimation } from "./tile_animation.js";
import { Entity } from "../../utils/ecs/entity.js";
export class Tileset extends Entity {
    get name() {
        return this._name;
    }
    get image() {
        return this._image;
    }
    constructor(tilesetModel) {
        super();
        this._animations = new Map();
        this._name = tilesetModel.name;
        this._imageSrc = tilesetModel.imageSrc;
        this._tileCountX = tilesetModel.tileCountX;
        this._tileCountY = tilesetModel.tileCountY;
        tilesetModel.animations.forEach((entry) => {
            const index = entry[0];
            const animationModel = entry[1];
            this._animations.set(index, new TileAnimation(animationModel));
        });
    }
    loadImage() {
        this._image = new Image();
        this._image.src = this._imageSrc;
    }
    getSubVectorLocation(index) {
        if (index < 0 || index >= this._tileCountX * this._tileCountY) {
            throw new Error("Index out of bounds");
        }
        // For animated tiles:
        if (this._animations.has(index)) {
            index = this._animations.get(index).getCurrentFrameImageIndex();
        }
        return new Vector2D(Settings.tile.tileSize * (index % this._tileCountX), Settings.tile.tileSize * Math.floor(index / this._tileCountX));
    }
    getSubVectorSize() {
        return new Vector2D(Settings.tile.tileSize, Settings.tile.tileSize);
    }
    awake() {
        super.awake();
        this._animations.forEach((animation) => {
            animation.awake();
        });
    }
    update(deltaTime) {
        super.update(deltaTime);
        this._animations.forEach((animation) => {
            animation.update(deltaTime);
        });
    }
}
//# sourceMappingURL=tileset.js.map