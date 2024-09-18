// Ctor readonly size Vector2D

import { Settings } from "../../settings/settings.ts"
import { Color } from "../color/color.ts"
import { IAwake } from "../lifecycle/awake.ts"
import { Vector2D } from "../math/vector2d.ts"

export class Canvas implements IAwake {
	private _elm: HTMLCanvasElement | undefined
	private _ctx: CanvasRenderingContext2D | null = null

	public readonly size: Vector2D
	public get element(): HTMLCanvasElement {
		return this._elm!
	}
	public get context(): CanvasRenderingContext2D {
		return this._ctx!
	}

	constructor(size: Vector2D) {
		this.size = size
	}

	public awake(): void {
		const canvas = document.createElement("canvas")
		canvas.setAttribute("width", `${this.size.X}px`)
		canvas.setAttribute("height", `${this.size.Y}px`)
		canvas.setAttribute("tabindex", "0")

		document.body.appendChild(canvas)
		this._elm = canvas

		const ctx = this._elm.getContext("2d")
		if (!ctx) {
			throw new Error("Context identifier is not supported")
		}

		ctx.imageSmoothingEnabled = false
		this._ctx = ctx

		this.setStyle({
			imageRendering: "pixelated",
			// imageRendering: "crisp-edges",
		})
	}

	public sleep(): void {
		this._elm!.remove()
		this._ctx = null
	}

	public setStyle(style: Partial<CSSStyleDeclaration>): void {
		for (const key in style) {
			if (!Object.hasOwnProperty.call(style, key)) {
				continue
			}

			if (!style[key]) {
				continue
			}

			this._elm!.style[key] = style[key] as string
		}
	}

	public fillRect(start: Vector2D, size: Vector2D, color: Color): void {
		this._ctx!.beginPath()
		this._ctx!.fillStyle = color.toString()
		this._ctx!.rect(start.X, start.Y, size.X, size.Y)
		this._ctx!.fill()
	}

	public clearRect(start: Vector2D, size: Vector2D): void {
		this._ctx!.clearRect(start.X, start.Y, size.X, size.Y)
	}

	public clearScreen(): void {
		this._ctx!.clearRect(0, 0, this.size.X, this.size.Y)
	}

	public calcLocalPointFrom(globalPoint: Vector2D): Vector2D | null {
		const canvasRect = this._elm!.getBoundingClientRect()
		const scrollLeft = window.scrollX || document.documentElement.scrollLeft
		const scrollTop = window.scrollY || document.documentElement.scrollTop

		const offset = {
			top: canvasRect.top + scrollTop,
			left: canvasRect.left + scrollLeft,
		}

		const x = globalPoint.X - offset.left
		const y = globalPoint.Y - offset.top

		if (x < 0 || y < 0) {
			return null
		}

		if (x > offset.left + canvasRect.width || y > offset.top + canvasRect.height) {
			return null
		}

		return Vector2D.divide(new Vector2D(x, y), Settings.video.scale)
	}

	public drawText(
		text: string,
		position: Vector2D,
		color: Color = new Color(255, 255, 255, 1),
		fontSize = 12,
		font = "Arial"
	): void {
		position = Vector2D.multiply(position, Settings.video.scale)
		this._ctx!.font = `${fontSize}px ${font}`
		this._ctx!.fillStyle = color.toString()
		this._ctx!.fillText(text, position.X, position.Y)
	}

	public drawImage(
		image: HTMLImageElement | null,
		sLoc: Vector2D,
		sSize: Vector2D,
		dLoc: Vector2D,
		dSize: Vector2D,
		flip: boolean = false
	): void {
        if (image == null)
            return
		dLoc = Vector2D.multiply(dLoc, Settings.video.scale)
		dSize = Vector2D.multiply(dSize, Settings.video.scale)
		if (flip) {
			this._ctx!.scale(-1, 1)
			this._ctx!.drawImage(image, sLoc.X, sLoc.Y, sSize.X, sSize.Y, -dLoc.X - dSize.X, dLoc.Y, dSize.X, dSize.Y)
			this._ctx!.setTransform(1, 0, 0, 1, 0, 0)
		} else {
			this._ctx!.drawImage(image, sLoc.X, sLoc.Y, sSize.X, sSize.Y, dLoc.X, dLoc.Y, dSize.X, dSize.Y)
		}
	}

	public drawImageCenter(
		image: HTMLImageElement | null,
		sLoc: Vector2D,
		sSize: Vector2D,
		dSize: Vector2D,
		flip: boolean = false
	): void {
        if (!image)
            return

		dSize = Vector2D.multiply(dSize, Settings.video.scale)
		const dLoc = new Vector2D(
			Settings.canvas.canvasWidth / 2 - dSize.X / 2,
			Settings.canvas.canvasHeight / 2 - dSize.Y / 2
		)
		if (flip) {
			this._ctx!.scale(-1, 1)
			this._ctx!.drawImage(image, sLoc.X, sLoc.Y, sSize.X, sSize.Y, -dLoc.X - dSize.X, dLoc.Y, dSize.X, dSize.Y)
			this._ctx!.setTransform(1, 0, 0, 1, 0, 0)
		} else {
			this._ctx!.drawImage(image, sLoc.X, sLoc.Y, sSize.X, sSize.Y, dLoc.X, dLoc.Y, dSize.X, dSize.Y)
		}
	}
}
