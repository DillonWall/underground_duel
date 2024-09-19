import * as path from "../path.ts"
import { parseTilesetFile } from "./tileset_parser.ts"
import { Vector2D } from "../../utils/math/vector2d.ts"
import { TilesetModel } from "../../models/tilemap/tileset_model.ts"
import { TileModel } from "../../models/tilemap/tile_model.ts"
import { TilemapModel } from "../../models/tilemap/tilemap_model.ts"
import { Settings } from "../../settings/settings.ts"

export async function parseTilemapFile(fileName: string): Promise<TilemapModel> {
	let tilesets: TilesetModel[] = []
	let tileLayers: (TileModel | null)[][][] = []

	const tilemapJson = await import(`../../assets/tilemaps/${fileName}.json`)
	const layers = tilemapJson.layers

	// Initialize all tilesets and extract the names and their starting GID
	const tilesetNames: string[] = []
	const tilesetGIDs: number[] = []
	for (let i = 0; i < tilemapJson.tilesets.length; i++) {
		const tileset = tilemapJson.tilesets[i]
		const tilesetName = path.basename(tileset.source, ".tsx")
		tilesets.push(await parseTilesetFile(tilesetName))
		tilesetNames.push(tilesetName)
		tilesetGIDs.push(tileset.firstgid)
	}

	// Initialize all layers of tiles in the tilemap
	for (let l = 0; l < layers.length; l++) {
		let layer: (TileModel | null)[][] = []
		for (let y = 0; y < tilemapJson.height; y++) {
			let row: (TileModel | null)[] = []
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
					throw new Error(`Tileset not found for tile with GID ${gid} when parsing tilemap file: ${fileName}`)
				}
				row.push(
					new TileModel(
						new Vector2D(x * Settings.tile.tileSize, y * Settings.tile.tileSize),
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

	return new TilemapModel(fileName, tilesets, tileLayers)
}
