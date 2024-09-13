import { TileModel } from "./tile_model.ts"
import { TilesetModel } from "./tileset_model.ts"

export class TilemapModel {
	constructor(public name: string, public tilesets: TilesetModel[], public tileLayers: (TileModel | null)[][][]) {}
}
