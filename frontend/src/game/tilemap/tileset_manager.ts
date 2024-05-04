import { Tileset } from "./tileset.js"

export class TilesetManager {
	private static _tilesets: Map<number, Tileset> = new Map() // maps tileset id to the imported tileset for quick access

	private constructor() {
		/* make it unaccessible */
	}

	public static loadTileset(tilesetFileSrc: string): void {
		const tileset = new Tileset(tilesetFileSrc)
		this._tilesets.set(tileset.id, tileset)
	}

	public static getTilesetById(tilesetId: number): Tileset {
		return this._tilesets.get(tilesetId)
	}

	public static removeTileset(tilesetId: number): void {
		this._tilesets.delete(tilesetId)
	}
}
