import path from "path"
import fs from "fs"
import { TilesetModel } from "../models/tilemap/tileset_model.js"
import { AnimationModel } from "../models/animation/animation_model.js"
import { Settings } from "../settings/settings.js"
import { ServerSettings } from "../settings/server_settings.js"
import { ColliderModel } from "../models/sprites/collider_model.js"

export async function parseTilesetFile(fileSrc: string): Promise<TilesetModel> {
	const name = path.basename(fileSrc, ".tsj")
	const tilesetJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
	const imageSrc = path.join(ServerSettings.tilesetImagePath, name + ".png")
	const tileCountX = Math.floor(tilesetJson.imagewidth / Settings.tile.tileSize)
	const tileCountY = Math.floor(tilesetJson.imageheight / Settings.tile.tileSize)
	let animations = new Array<Array<number | AnimationModel>>()
	let collisions = new Array<Array<number | ColliderModel>>()

	if (Array.isArray(tilesetJson.tiles)) {
		for (const tile of tilesetJson.tiles) {
			if (tile.animation) {
				let delays = tile.animation.map((frame) => frame.duration / 1000)
				let framesImageIdxs = tile.animation.map((frame) => frame.tileid)
				animations.push(new Array(tile.id, new AnimationModel(delays, true, framesImageIdxs)))
			}
			if (tile.objectgroup) {
				let collisionsForThisTile = []
				for (const object of tile.objectgroup.objects) {
					// Just record the type, and reconstruct on the client side as such:
					// if (object.type === ServerSettings.hitbox.collider) {
					// 	console.log(object)
					// }
					collisionsForThisTile.push([
						tile.id,
						new ColliderModel(object.x, object.y, object.width, object.height, object.type),
					])
				}
				collisions.push(collisionsForThisTile)
			}
		}
	}

	return new TilesetModel(name, imageSrc, tileCountX, tileCountY, animations, collisions)
}
