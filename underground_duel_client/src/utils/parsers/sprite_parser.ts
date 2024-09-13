import { SpriteSheetModel } from "../../models/sprites/spritesheet_model.ts"
import { AnimationModel } from "../../models/animation/animation_model.ts"
import { ColliderModel } from "../../models/sprites/collider_model.ts"

export async function parseSpriteFile(fileName: string): Promise<SpriteSheetModel> {
    const spriteSheetJson = await import(`../../assets/spritesheets/${fileName}.json`)
    let animations = new Array<Array<string | AnimationModel>>()
    let collisions = new Array<ColliderModel>()

    if (Array.isArray(spriteSheetJson.tiles)) {
        for (const tile of spriteSheetJson.tiles) {
            if (tile.animation) {
                const types = tile.type.replace(/\s/g, "").split(",") //Remove whitespace and split on comma
                const spriteName = types[0]
                const loop = types.includes("loop")
                const delays = tile.animation.map((frame: any) => frame.duration / 1000)
                const framesImageIdxs = tile.animation.map((frame: any) => frame.tileid)
                animations.push(new Array(spriteName, new AnimationModel(delays, loop, framesImageIdxs)))
            }
            //if (tile.objectgroup) {
            //	let collisionsForThisTile = []
            //	for (const object of tile.objectgroup.objects) {
            //		// Just record the type, and reconstruct on the client side as such:
            //		// if (object.type === Settings.hitbox.collider) {
            //		// 	console.log(object)
            //		// }
            //		collisionsForThisTile.push([
            //			tile.id,
            //			new ColliderModel(object.x, object.y, object.width, object.height, object.type),
            //		])
            //	}
            //	collisions.push(collisionsForThisTile)
            //}
        }
    }

    return new SpriteSheetModel(
        fileName,
        spriteSheetJson.tilewidth,
        spriteSheetJson.tileheight,
        spriteSheetJson.imagewidth / spriteSheetJson.tilewidth,
        spriteSheetJson.imageheight / spriteSheetJson.tileheight,
        animations,
        collisions
    )
}
