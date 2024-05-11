import path from "path"
import fs from "fs"
import { ServerSettings } from "../settings/server_settings.js"
import { SpriteModel } from "../models/sprites/sprite_model.js"
import { SpriteAnimationModel } from "../models/sprites/sprite_animation_model.js"

export async function parseSpriteFile(fileSrc: string): Promise<SpriteModel> {
	const name = path.basename(fileSrc, ".tsj")
	const spriteSheetJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
	const imageSrc = path.join(ServerSettings.spriteSheetImagePath, name + ".png")
	let animations = new Array<Array<string | SpriteAnimationModel>>()

	if (Array.isArray(spriteSheetJson.tiles)) {
		for (const tile of spriteSheetJson.tiles) {
			if (tile.animation) {
				const spriteName = tile.type
				const delays = tile.animation.map((frame) => frame.duration / 1000)
				const framesImageIdxs = tile.animation.map((frame) => frame.tileid)
				animations.push(new Array(spriteName, new SpriteAnimationModel(delays, false, framesImageIdxs)))
			}
		}
	}

	return new SpriteModel(imageSrc, spriteSheetJson.tilewidth, spriteSheetJson.tileheight, animations)
}
