import { TileModel } from "./tile_model.js"
import { TilesetModel } from "./tileset_model.js"

export class TilemapModel {
	constructor(public name: string, public tilesets: TilesetModel[], public tileLayers: TileModel[][][]) {}
}
