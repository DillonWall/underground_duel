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

		// Initialize all tilesets and extract the names and their starting GID
		const tilesetNames: string[] = []
		const tilesetGIDs: number[] = []
		for (let i = 0; i < tilemapJson.tilesets.length; i++) {
			const tileset = tilemapJson.tilesets[i]
			const tilesetName = path.basename(tileset.source)
			const tilesetPath = path.join(Settings.tilesetPath, tilesetName + ".tsj")

			TilesetManager.loadTileset(tilesetPath)

			tilesetNames.push(tilesetName)
			tilesetGIDs.push(tileset.firstgid)
		}

		// Initialize all layers of tiles in the tilemap
		for (let l = 0; l < layers.length; l++) {
			let layer: Tile[][] = []
			for (let y = 0; y < tilemapJson.height; y++) {
				let row: Tile[] = []
				for (let x = 0; x < tilemapJson.width; x++) {
					// Note: We need to shift based on GID
					let gid = layers[l].data[y * tilemapJson.width + x]
					if (gid <= 0) {
						continue
					}
					let tilesetName = ""
					let imageIndex = gid
					for (let i = tilesetGIDs.length - 1; i >= 0; i--) {
						if (imageIndex >= tilesetGIDs[i]) {
							tilesetName = tilesetNames[i]
							imageIndex -= tilesetGIDs[i]
							break
						}
					}
					if (tilesetName === "") {
						throw new Error(`Tileset not found for tile with GID ${gid} when parsing tilemap ${this._name}`)
					}

					row.push(
						new Tile(
							new Vector2D(x * Settings.tileSize, y * Settings.tileSize),
							new Vector2D(Settings.tileSize, Settings.tileSize),
							new Vector2D(x, y),
							imageIndex,
							tilesetName
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
