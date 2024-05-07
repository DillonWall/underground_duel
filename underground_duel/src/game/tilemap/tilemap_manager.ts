import { Tilemap } from "./tilemap.js"

export class TilemapManager {
	private static _tilemaps: Map<string, Tilemap> = new Map() // maps tilemap name to the imported tilemap for quick access
	private static _currentTilemapName: string // the name of the current tilemap

	private constructor() {
		/* make it unaccessible */
	}

	public static loadTilemap(tilemap: Tilemap): void {
		this._tilemaps.set(tilemap.name, tilemap)
	}

	public static unloadTilemapByName(tilemapName: string): void {
		this._tilemaps.delete(tilemapName)
	}

	public static getCurrentTilemap(): Tilemap {
		return this._tilemaps.get(this._currentTilemapName)
	}

	public static getCurrentTilemapName(): string {
		return this._currentTilemapName
	}

	public static getTilemapByName(tilemapName: string): Tilemap {
		return this._tilemaps.get(tilemapName)
	}

	public static setCurrentTilemapByName(tilemapName: string): void {
		this._currentTilemapName = tilemapName
	}
}
