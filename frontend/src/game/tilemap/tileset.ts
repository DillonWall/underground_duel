import path from "path"
import fs from "fs"
import { Settings } from "../../settings/settings.js"
import { Vector2D } from "../../utils/math/vector2d.js"

export class Tileset {
	private _name: string
	private _image: HTMLImageElement
	private readonly _tileCountX
	private readonly _tileCountY

	get name(): string {
		return this._name
	}
	get image(): HTMLImageElement {
		return this._image
	}

	constructor(fileSrc: string) {
		this._name = path.basename(fileSrc)
		const tilesetJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
		const imgSrc = path.join(Settings.tilesetImagePath, this._name + ".png")

		this._image = new Image()
		this._image.src = imgSrc
		this._tileCountX = Math.floor(this._image.width / Settings.tileSize)
		this._tileCountY = Math.floor(this._image.height / Settings.tileSize)
	}

	public getSubVectorLocation(index: number): Vector2D {
		if (index < 0 || index >= this._tileCountX * this._tileCountY) {
			throw new Error("Index out of bounds")
		}
		return new Vector2D(
			Settings.tileSize * (index % this._tileCountX),
			Settings.tileSize * Math.floor(index / this._tileCountX)
		)
	}

	public getSubVectorSize(): Vector2D {
		return new Vector2D(Settings.tileSize, Settings.tileSize)
	}
}
