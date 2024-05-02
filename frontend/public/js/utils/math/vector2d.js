import { lerp } from "./lerp.js";
// Contains an X and a Y describing a vector. Used for points, indecies, velocity, etc
export class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromString(str) {
        const parsed = str.replace(new RegExp(/\(|\)/, "g"), "").split(",");
        const x = Number(parsed[0]);
        const y = Number(parsed[1]);
        if (isNaN(x) || isNaN(y)) {
            throw new Error(`Cannot instantiate Vector2D from string ${str}`);
        }
        return new Vector2D(x, y);
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
    static lerp(start, end, t) {
        return new Vector2D(lerp(start.x, end.x, t), lerp(start.y, end.y, t));
    }
    static add(a, b) {
        return new Vector2D(a.x + b.x, a.y + b.y);
    }
    static subtract(a, b) {
        return new Vector2D(a.x - b.x, a.y - b.y);
    }
}
//# sourceMappingURL=vector2d.js.map