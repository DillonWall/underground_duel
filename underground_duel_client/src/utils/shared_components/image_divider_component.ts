import { IComponent } from "../ecs/component.ts"
import { Entity } from "../ecs/entity.ts"
import { Vector2D } from "../math/vector2d.ts"

export class ImageDividerComponent implements IComponent {
	public entity: Entity
	private _subImageWidth: number
	private _subImageHeight: number
	private _subImageCountX: number
	private _subImageCountY: number

	constructor(
		entity: Entity,
		subImageWidth: number,
		subImageHeight: number,
		subImageCountX: number,
		subImageCountY: number
	) {
		this.entity = entity
		this._subImageWidth = subImageWidth
		this._subImageHeight = subImageHeight
		this._subImageCountX = subImageCountX
		this._subImageCountY = subImageCountY
	}

	public getSubVectorLocation(index: number): Vector2D {
		if (index < 0 || index >= this._subImageCountX * this._subImageCountY) {
			throw new Error("Index out of bounds, X:" + this._subImageCountX + " Y:" + this._subImageCountY)
		}

		return new Vector2D(
			this._subImageWidth * (index % this._subImageCountX),
			this._subImageHeight * Math.floor(index / this._subImageCountX)
		)
	}

	public getSubVectorSize(): Vector2D {
		return new Vector2D(this._subImageWidth, this._subImageHeight)
	}

	public awake(): void {}
	public sleep(): void {}
	public update(deltaTime: number): void {}
}
