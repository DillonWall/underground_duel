import { Settings } from "../../settings/settings.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { TileAnimation } from "./tile_animation.js"
import { Entity } from "../../utils/ecs/entity.js"
import { TilesetModel } from "../../models/tilemap/tileset_model.js"
import { TileAnimationModel } from "../../models/tilemap/tile_animation_model.js"

export class Tileset extends Entity {
	private _name: string
	private _image: HTMLImageElement
	private _imageSrc: string
	private _animations: Map<number, TileAnimation> = new Map()
	private _tileCountX: number
	private _tileCountY: number
	private _loaded: boolean = false

	get name(): string {
		return this._name
	}
	get image(): HTMLImageElement {
		return this._image
	}

	constructor(tilesetModel: TilesetModel) {
		super()

		this._name = tilesetModel.name
		this._imageSrc = tilesetModel.imageSrc
		this._tileCountX = tilesetModel.tileCountX
		this._tileCountY = tilesetModel.tileCountY
		tilesetModel.animations.forEach((entry) => {
			const index = entry[0] as number
			const animationModel = entry[1] as TileAnimationModel
			this._animations.set(index, new TileAnimation(animationModel))
		})

		this.loadImage()
	}

	public async loadImage(): Promise<void> {
		this._image = new Image()
		this._image.src = this._imageSrc

		const imageLoadPromise = new Promise((resolve) => {
			this._image = new Image()
			this._image.onload = resolve
			this._image.src = this._imageSrc
			this._loaded = true
		})

		await imageLoadPromise
	}

	public getSubVectorLocation(index: number): Vector2D {
		if (index < 0 || index >= this._tileCountX * this._tileCountY) {
			throw new Error("Index out of bounds")
		}

		// For animated tiles:
		if (this._animations.has(index)) {
			index = this._animations.get(index).getCurrentFrameImageIndex()
		}

		return new Vector2D(
			Settings.tile.tileSize * (index % this._tileCountX),
			Settings.tile.tileSize * Math.floor(index / this._tileCountX)
		)
	}

	public getSubVectorSize(): Vector2D {
		return new Vector2D(Settings.tile.tileSize, Settings.tile.tileSize)
	}

	public awake(): void {
		super.awake()

		this._animations.forEach((animation) => {
			animation.awake()
		})
	}

	public sleep(): void {
		super.sleep()

		this._animations.forEach((animation) => {
			animation.sleep()
		})
	}

	public update(deltaTime: number): void {
		if (!this._loaded) {
			return
		}

		super.update(deltaTime)

		this._animations.forEach((animation) => {
			animation.update(deltaTime)
		})
	}
}
