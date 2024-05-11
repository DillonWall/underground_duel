import path from "path"
import fs from "fs"
import { TilesetModel } from "../models/tilemap/tileset_model.js"
import { TileAnimationModel } from "../models/tilemap/tile_animation_model.js"
import { Settings } from "../settings/settings.js"
import { ServerSettings } from "../settings/server_settings.js"

export async function parseTilesetFile(fileSrc: string): Promise<TilesetModel> {
	const name = path.basename(fileSrc, ".tsj")
	const tilesetJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
	const imageSrc = path.join(ServerSettings.tilesetImagePath, name + ".png")
	const tileCountX = Math.floor(tilesetJson.imagewidth / Settings.tile.tileSize)
	const tileCountY = Math.floor(tilesetJson.imageheight / Settings.tile.tileSize)
	let animations = new Array<Array<number | TileAnimationModel>>()

	if (Array.isArray(tilesetJson.tiles)) {
		for (const tile of tilesetJson.tiles) {
			if (tile.animation) {
				let delays = tile.animation.map((frame) => frame.duration / 1000)
				let framesImageIdxs = tile.animation.map((frame) => frame.tileid)
				animations.push(new Array(tile.id, new TileAnimationModel(delays, true, framesImageIdxs)))
			}
		}
	}

	return new TilesetModel(name, imageSrc, animations, tileCountX, tileCountY)
}
