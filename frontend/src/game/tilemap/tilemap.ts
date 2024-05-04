// Tilemap extends Entity
// 2d array of tiles (maintains the tiles such as the game maintains its entities)
// TODO:
//  - research best practices of implementing a tilemap
// Look into Phaser library
// We will generate the tilemaps dynamically (not images)

import path from "path"
import fs from "fs"

import { Settings } from "../../settings/settings.js"
import { Entity } from "../../utils/ecs/entity.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { Tile } from "./tile.js"
import { TilesetManager } from "./tileset_manager.js"

export class Tilemap extends Entity {
	private _name: string
	private _tileLayers: Tile[][][] = []

	public get name() {
		return this._name
	}

	constructor(fileSrc: string) {
		super()

		this.parseTilemapFile(fileSrc)
	}

	private parseTilemapFile(fileSrc: string): void {
		this._name = path.basename(fileSrc)
		const tilemapJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
		const layers = tilemapJson.layers

		// Initialize all tilesets
		for (let i = 0; i < tilemapJson.tilesets.length; i++) {
			const tileset = tilemapJson.tilesets[i]
			const tilesetPath = path.join(Settings.tilesetPath, path.basename(tileset.source) + ".tsj")
			TilesetManager.loadTileset(tilesetPath)
		}

		// Initialize all tiles in the tilemap
		for (let layer = 0; layer < layers.length; layer++) {
			let layer: Tile[][] = []
			for (let y = 0; y < tilemapJson.height; y++) {
				let row: Tile[] = []
				for (let x = 0; x < tilemapJson.width; x++) {
					const tilesetId = 0 // Which tileset this is from
					const imageIndex = 0 // Index of image of tile in the tileset

					row.push(
						new Tile(
							new Vector2D(x * Settings.tileSize, y * Settings.tileSize),
							new Vector2D(Settings.tileSize, Settings.tileSize),
							new Vector2D(x, y),
							imageIndex,
							tilesetId
						)
					)
				}
				layer.push(row)
			}
			this._tileLayers.push(layer)
		}
	}

	public awake(): void {
		super.awake()
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		for (let i = 0; i < this._tileLayers.length; i++) {
			for (let j = 0; j < this._tileLayers[i].length; j++) {
				for (let k = 0; k < this._tileLayers[i][j].length; k++) {
					this._tileLayers[i][j][k].update(deltaTime)
				}
			}
		}
	}

	public getTile(layer: number, loc: Vector2D): Tile {
		return this._tileLayers[layer][loc.y][loc.x]
	}

	public getTiles(layer: number): Tile[][] {
		return this._tileLayers[layer]
	}
}
