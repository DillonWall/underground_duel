import { IComponent } from "../ecs/component.js"
import { Entity } from "../ecs/entity.js"

export class ImageComponent implements IComponent {
	public entity: Entity
	public loaded: boolean = false
	private _image: HTMLImageElement
	private _imageSrc: string

	public get image(): HTMLImageElement | null {
		return this.loaded ? this._image : null
	}

	constructor(entity: Entity, imageSrc: string) {
		this.entity = entity
		this._imageSrc = imageSrc
		this.loadImage()
	}

	public async loadImage(): Promise<void> {
		await new Promise<void>((resolve) => {
			this._image = new Image()
			this._image.onload = () => {
				this.loaded = true
				resolve()
			}
			this._image.src = this._imageSrc
		})
	}

	public awake(): void {
		this.loadImage()
	}
	public sleep(): void {}
	public update(deltaTime: number): void {}
}
