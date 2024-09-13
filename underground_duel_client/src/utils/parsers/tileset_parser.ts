import { TilesetModel } from "../../models/tilemap/tileset_model.ts"
import { AnimationModel } from "../../models/animation/animation_model.ts"
import { Settings } from "../../settings/settings.ts"
import { ColliderModel } from "../../models/sprites/collider_model.ts"

export async function parseTilesetFile(fileName: string): Promise<TilesetModel> {
	const tilesetJson = await import(`../../assets/tilesets/${fileName}.json`)
	const tileCountX = Math.floor(tilesetJson.imagewidth / Settings.tile.tileSize)
	const tileCountY = Math.floor(tilesetJson.imageheight / Settings.tile.tileSize)
	let animations = new Array<Array<number | AnimationModel>>()
	let collisions = new Array<ColliderModel>()

	if (Array.isArray(tilesetJson.tiles)) {
		for (const tile of tilesetJson.tiles) {
			if (tile.animation) {
				let delays = tile.animation.map((frame: any) => frame.duration / 1000)
				let framesImageIdxs = tile.animation.map((frame: any) => frame.tileid)
				animations.push(new Array(tile.id, new AnimationModel(delays, true, framesImageIdxs)))
			}
			//if (tile.objectgroup) {
			//	let collisionsForThisTile: Array<number | ColliderModel> = []
			//	for (const object of tile.objectgroup.objects) {
			//		// Just record the type, and reconstruct on the client side as such:
			//		// if (object.type === Settings.hitbox.collider) {
			//		// 	console.log(object)
			//		// }
			//		collisionsForThisTile.push([
			//			Number(tile.id),
			//			new ColliderModel(object.x, object.y, object.width, object.height, object.type),
			//		])
			//	}
			//	collisions.push(collisionsForThisTile)
			//}
		}
	}

	return new TilesetModel(fileName, tileCountX, tileCountY, animations, collisions)
}
