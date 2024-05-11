import path from "path"
import fs from "fs"
import { parseTilesetFile } from "./tileset_parser.js"
import { Vector2D } from "../utils/math/vector2d.js"
import { TilesetModel } from "../models/tilemap/tileset_model.js"
import { TileModel } from "../models/tilemap/tile_model.js"
import { TilemapModel } from "../models/tilemap/tilemap_model.js"
import { ServerSettings } from "../settings/server_settings.js"
import { Settings } from "../settings/settings.js"

export async function parseTilemapFile(fileSrc: string): Promise<TilemapModel> {
	const tempShiftY = -150
	const tempShiftX = -50

	let tilesets: TilesetModel[] = []
	const name = path.basename(fileSrc, ".tmj")
	let tileLayers: TileModel[][][] = []

	const tilemapJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
	const layers = tilemapJson.layers

	// Initialize all tilesets and extract the names and their starting GID
	const tilesetNames: string[] = []
	const tilesetGIDs: number[] = []
	for (let i = 0; i < tilemapJson.tilesets.length; i++) {
		const tileset = tilemapJson.tilesets[i]
		const tilesetName = path.basename(tileset.source, ".tsx")
		const tilesetPath = path.join(ServerSettings.tilesetPath, tilesetName + ".tsj")
		tilesets.push(await parseTilesetFile(tilesetPath))
		tilesetNames.push(tilesetName)
		tilesetGIDs.push(tileset.firstgid)
	}

	// Initialize all layers of tiles in the tilemap
	for (let l = 0; l < layers.length; l++) {
		let layer: TileModel[][] = []
		for (let y = 0; y < tilemapJson.height; y++) {
			let row: TileModel[] = []
			for (let x = 0; x < tilemapJson.width; x++) {
				// Note: We need to shift based on GID
				let gid = layers[l].data[y * tilemapJson.width + x]
				if (gid <= 0) {
					row.push(null)
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
					new TileModel(
						new Vector2D(x * Settings.tile.tileSize + tempShiftX, y * Settings.tile.tileSize + tempShiftY),
						new Vector2D(Settings.tile.tileSize, Settings.tile.tileSize),
						new Vector2D(x, y),
						imageIndex,
						tilesetName
					)
				)
			}
			layer.push(row)
		}
		tileLayers.push(layer)
	}

	return new TilemapModel(name, tilesets, tileLayers)
}
