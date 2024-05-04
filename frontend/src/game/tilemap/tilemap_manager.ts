import { Tilemap } from "./tilemap.js"

export class TilemapManager {
	private static _tilemaps: Map<number, Tilemap> = new Map() // maps tilemap id to the imported tilemap for quick access
	private static _currentTilemapId: number // the id of the current tilemap

	private constructor() {
		/* make it unaccessible */
	}

	public static loadTilemap(tilemapFileSrc: string): void {
		const tilemap = new Tilemap(tilemapFileSrc)
		this._tilemaps.set(tilemap.id, tilemap)
	}

	public static getCurrentTilemap(): Tilemap {
		return this._tilemaps.get(this._currentTilemapId)
	}

	public static getTilemapById(tilemapId: number): Tilemap {
		return this._tilemaps.get(tilemapId)
	}

	public static getCurrentTilemapId(): number {
		return this._currentTilemapId
	}

	public static setCurrentTilemapById(tilemapId: number): void {
		this._currentTilemapId = tilemapId
	}

	public static removeTilemapById(tilemapId: number): void {
		this._tilemaps.delete(tilemapId)
	}
}
