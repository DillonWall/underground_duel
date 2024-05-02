// Ctor readonly size Vector2D

import { Color } from "../color/color.js"
import { IAwake } from "../lifecycle/awake.js"
import { Vector2D } from "../math/vector2d.js"

export class Canvas implements IAwake {
	private _elm: HTMLCanvasElement
	private _ctx: CanvasRenderingContext2D

	public readonly size: Vector2D
	public get element(): HTMLCanvasElement {
		return this._elm
	}
	public get context(): CanvasRenderingContext2D {
		return this._ctx
	}

	constructor(size: Vector2D) {
		this.size = size
	}

	public awake(): void {
		const canvas = document.createElement("canvas")
		canvas.setAttribute("width", `${this.size.x}px`)
		canvas.setAttribute("height", `${this.size.y}px`)
		canvas.setAttribute("tabindex", "0")

		document.body.appendChild(canvas)
		this._elm = canvas

		const ctx = this._elm.getContext("2d")
		if (!ctx) {
			throw new Error("Context identifier is not supported")
		}

		this._ctx = ctx
	}

	public setStyle(style: Partial<CSSStyleDeclaration>): void {
		for (const key in style) {
			if (!Object.hasOwnProperty.call(style, key)) {
				continue
			}

			if (!style[key]) {
				continue
			}

			this._elm.style[key] = style[key] as string
		}
	}

	public clearRect(start: Vector2D, size: Vector2D): void {
		this._ctx.clearRect(start.x, start.y, size.x, size.y)
	}

	public clearScreen(): void {
		this._ctx.clearRect(0, 0, this.size.x, this.size.y)
	}

	public calcLocalPointFrom(globalPoint: Vector2D): Vector2D | null {
		const canvasRect = this._elm.getBoundingClientRect()
		const scrollLeft = window.scrollX || document.documentElement.scrollLeft
		const scrollTop = window.scrollY || document.documentElement.scrollTop

		const offset = {
			top: canvasRect.top + scrollTop,
			left: canvasRect.left + scrollLeft,
		}

		const x = globalPoint.x - offset.left
		const y = globalPoint.y - offset.top

		if (x < 0 || y < 0) {
			return null
		}

		if (x > offset.left + canvasRect.width || y > offset.top + canvasRect.height) {
			return null
		}

		return new Vector2D(x, y)
	}

	public drawText(
		text: string,
		position: Vector2D,
		color: Color = new Color(255, 255, 255, 1),
		fontSize = 14,
		font = "Arial"
	): void {
		this._ctx.font = `${fontSize}px ${font}`
		this._ctx.fillStyle = color.toString()
		this._ctx.fillText(text, position.x, position.y)
	}
}
