export class TilesetManager {
    constructor() {
        /* make it unaccessible */
    }
    static loadTileset(tileset) {
        this._tilesets.set(tileset.name, tileset);
    }
    static getTilesetByName(tilesetName) {
        return this._tilesets.get(tilesetName);
    }
    static removeTileset(tilesetName) {
        this._tilesets.delete(tilesetName);
    }
}
TilesetManager._tilesets = new Map(); // maps tileset name to the imported tileset for quick access
//# sourceMappingURL=tileset_manager.js.map