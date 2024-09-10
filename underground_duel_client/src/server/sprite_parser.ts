import path from "path"
import fs from "fs"
import { ServerSettings } from "../settings/server_settings.js"
import { SpriteSheetModel } from "../models/sprites/spritesheet_model.js"
import { AnimationModel } from "../models/animation/animation_model.js"
import { ColliderModel } from "../models/sprites/collider_model.js"

export async function parseSpriteFile(fileSrc: string): Promise<SpriteSheetModel> {
	const name = path.basename(fileSrc, ".tsj")
	const spriteSheetJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
	const imageSrc = path.join(ServerSettings.spriteSheetImagePath, name + ".png")
	let animations = new Array<Array<string | AnimationModel>>()
	let collisions = new Array<Array<number | ColliderModel>>()

	if (Array.isArray(spriteSheetJson.tiles)) {
		for (const tile of spriteSheetJson.tiles) {
			if (tile.animation) {
				const types = tile.type.replace(/\s/g, "").split(",") //Remove whitespace and split on comma
				const spriteName = types[0]
				const loop = types.includes("loop")
				const delays = tile.animation.map((frame) => frame.duration / 1000)
				const framesImageIdxs = tile.animation.map((frame) => frame.tileid)
				animations.push(new Array(spriteName, new AnimationModel(delays, loop, framesImageIdxs)))
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

	return new SpriteSheetModel(
		imageSrc,
		spriteSheetJson.tilewidth,
		spriteSheetJson.tileheight,
		spriteSheetJson.imagewidth / spriteSheetJson.tilewidth,
		spriteSheetJson.imageheight / spriteSheetJson.tileheight,
		animations,
		collisions
	)
}
