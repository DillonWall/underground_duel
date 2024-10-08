import { lerp } from "./lerp.ts"

// Contains an X and a Y describing a vector. Used for points, indecies, velocity, etc
export class Vector2D {
	public X: number
	public Y: number

	constructor(x: number, y: number) {
		this.X = x
		this.Y = y
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
		return `(${a.X},${a.Y})`
	}

	public static lerp(start: Vector2D, end: Vector2D, t: number): Vector2D {
		return new Vector2D(lerp(start.X, end.X, t), lerp(start.Y, end.Y, t))
	}

	public static add(a: Vector2D, b: Vector2D): Vector2D {
		return new Vector2D(a.X + b.X, a.Y + b.Y)
	}

	public static subtract(a: Vector2D, b: Vector2D): Vector2D {
		return new Vector2D(a.X - b.X, a.Y - b.Y)
	}

	public static multiply(a: Vector2D, scale: number): Vector2D {
		return new Vector2D(a.X * scale, a.Y * scale)
	}

	public static divide(a: Vector2D, denominator: number): Vector2D {
		return new Vector2D(a.X / denominator, a.Y / denominator)
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
		return a.X == 0 && a.Y == 0
	}

	public static round(a: Vector2D): Vector2D {
		return new Vector2D(Math.round(a.X), Math.round(a.Y))
	}

	public static areEqual(a: Vector2D, b: Vector2D): boolean {
		return a.X == b.X && a.Y == b.Y
	}

    public static magnitude(a: Vector2D): number {
        return Math.sqrt(a.X * a.X + a.Y * a.Y)
    }

    public static normalize(a: Vector2D): Vector2D {
        const mag = Vector2D.magnitude(a)
        if (mag == 1)
            return a
        return new Vector2D(a.X / mag, a.Y / mag)
    }
}
