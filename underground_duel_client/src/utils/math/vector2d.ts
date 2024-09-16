import { lerp } from "./lerp.ts"

// Contains an X and a Y describing a vector. Used for points, indecies, velocity, etc
export class Vector2D {
	public x: number
	public y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	public static fromString(str: string): Vector2D {
		const parsed = str.replace(new RegExp(/\(|\)/, "g"), "").split(",")
		const x = Number(parsed[0])
		const y = Number(parsed[1])

		if (isNaN(x) || isNaN(y)) {
			throw new Error(`Cannot instantiate Vector2D from string ${str}`)
		}

		return new Vector2D(x, y)
	}

	public static toString(a: Vector2D): string {
		return `(${a.x},${a.y})`
	}

	public static lerp(start: Vector2D, end: Vector2D, t: number): Vector2D {
		return new Vector2D(lerp(start.x, end.x, t), lerp(start.y, end.y, t))
	}

	public static add(a: Vector2D, b: Vector2D): Vector2D {
		return new Vector2D(a.x + b.x, a.y + b.y)
	}

	public static subtract(a: Vector2D, b: Vector2D): Vector2D {
		return new Vector2D(a.x - b.x, a.y - b.y)
	}

	public static multiply(a: Vector2D, scale: number): Vector2D {
		return new Vector2D(a.x * scale, a.y * scale)
	}

	public static divide(a: Vector2D, denominator: number): Vector2D {
		return new Vector2D(a.x / denominator, a.y / denominator)
	}

	public static zero(): Vector2D {
		return new Vector2D(0, 0)
	}

	public static left(): Vector2D {
		return new Vector2D(-1, 0)
	}

	public static right(): Vector2D {
		return new Vector2D(1, 0)
	}

	public static up(): Vector2D {
		return new Vector2D(0, -1)
	}

	public static down(): Vector2D {
		return new Vector2D(0, 1)
	}

	public static isZero(a: Vector2D): boolean {
		return a.x == 0 && a.y == 0
	}

	public static round(a: Vector2D): Vector2D {
		return new Vector2D(Math.round(a.x), Math.round(a.y))
	}

	public static areEqual(a: Vector2D, b: Vector2D): boolean {
		return a.x == b.x && a.y == b.y
	}
}
