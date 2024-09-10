import { Tileset } from "./tileset.js"

export class TilesetManager {
	private static _tilesets: Map<string, Tileset> = new Map() // maps tileset name to the imported tileset for quick access

	private constructor() {
		/* make it unaccessible */
	}

	public static loadTileset(tileset: Tileset): void {
		this._tilesets.set(tileset.name, tileset)
	}

	public static getTilesetByName(tilesetName: string): Tileset {
		return this._tilesets.get(tilesetName)
	}

	public static removeTileset(tilesetName: string): void {
		this._tilesets.delete(tilesetName)
	}
}
