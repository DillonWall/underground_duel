import path from "path"
import fs from "fs"
import { Settings } from "../../settings/settings.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { TileAnimation } from "./tile_animation.js"
import { Entity } from "../../utils/ecs/entity.js"

export class Tileset extends Entity {
	private _name: string
	private _image: HTMLImageElement
	private _animations: Map<number, TileAnimation> = new Map()
	private readonly _tileCountX
	private readonly _tileCountY

	get name(): string {
		return this._name
	}
	get image(): HTMLImageElement {
		return this._image
	}

	constructor(fileSrc: string) {
		super()

		this.parseTilesetFileSrc(fileSrc)
		this._tileCountX = Math.floor(this._image.width / Settings.tileSize)
		this._tileCountY = Math.floor(this._image.height / Settings.tileSize)
	}

	private parseTilesetFileSrc(fileSrc: string) {
		this._name = path.basename(fileSrc)
		const tilesetJson = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))
		const imgSrc = path.join(Settings.tilesetImagePath, this._name + ".png")

		this._image = new Image()
		this._image.src = imgSrc

		// TODO: setup animations from JSON
	}

	public getSubVectorLocation(index: number): Vector2D {
		if (index < 0 || index >= this._tileCountX * this._tileCountY) {
			throw new Error("Index out of bounds")
		}

		// For animated tiles:
		if (index in this._animations) {
			index = this._animations.get(index).getCurrentFrameImageIndex()
		}

		return new Vector2D(
			Settings.tileSize * (index % this._tileCountX),
			Settings.tileSize * Math.floor(index / this._tileCountX)
		)
	}

	public getSubVectorSize(): Vector2D {
		return new Vector2D(Settings.tileSize, Settings.tileSize)
	}

	public awake(): void {
		super.awake()

		this._animations.forEach((animation) => {
			animation.awake()
		})
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		this._animations.forEach((animation) => {
			animation.update(deltaTime)
		})
	}
}
