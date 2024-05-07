import path from "path"
import appRoot from "app-root-path"

export const ServerSettings = Object.freeze({
	tilemapPath: path.join(appRoot.path, "public/assets/tilemaps/"),
	tilesetPath: path.join(appRoot.path, "public/assets/tilesets/"),
})
