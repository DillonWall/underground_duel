export class TilemapManager {
    constructor() {
        /* make it unaccessible */
    }
    static loadTilemap(tilemap) {
        this._tilemaps.set(tilemap.name, tilemap);
    }
    static unloadTilemapByName(tilemapName) {
        this._tilemaps.delete(tilemapName);
    }
    static getCurrentTilemap() {
        return this._tilemaps.get(this._currentTilemapName);
    }
    static getCurrentTilemapName() {
        return this._currentTilemapName;
    }
    static getTilemapByName(tilemapName) {
        return this._tilemaps.get(tilemapName);
    }
    static setCurrentTilemapByName(tilemapName) {
        this._currentTilemapName = tilemapName;
    }
}
TilemapManager._tilemaps = new Map(); // maps tilemap name to the imported tilemap for quick access
//# sourceMappingURL=tilemap_manager.js.map