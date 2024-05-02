// Ctor readonly size Vector2D
import { Color } from "../color/color.js";
import { Vector2D } from "../math/vector2d.js";
export class Canvas {
    get element() {
        return this._elm;
    }
    get context() {
        return this._ctx;
    }
    constructor(size) {
        this.size = size;
    }
    awake() {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", `${this.size.x}px`);
        canvas.setAttribute("height", `${this.size.y}px`);
        canvas.setAttribute("tabindex", "0");
        document.body.appendChild(canvas);
        this._elm = canvas;
        const ctx = this._elm.getContext("2d");
        if (!ctx) {
            throw new Error("Context identifier is not supported");
        }
        this._ctx = ctx;
    }
    setStyle(style) {
        for (const key in style) {
            if (!Object.hasOwnProperty.call(style, key)) {
                continue;
            }
            if (!style[key]) {
                continue;
            }
            this._elm.style[key] = style[key];
        }
    }
    clearRect(start, size) {
        this._ctx.clearRect(start.x, start.y, size.x, size.y);
    }
    clearScreen() {
        this._ctx.clearRect(0, 0, this.size.x, this.size.y);
    }
    calcLocalPointFrom(globalPoint) {
        const canvasRect = this._elm.getBoundingClientRect();
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const offset = {
            top: canvasRect.top + scrollTop,
            left: canvasRect.left + scrollLeft,
        };
        const x = globalPoint.x - offset.left;
        const y = globalPoint.y - offset.top;
        if (x < 0 || y < 0) {
            return null;
        }
        if (x > offset.left + canvasRect.width || y > offset.top + canvasRect.height) {
            return null;
        }
        return new Vector2D(x, y);
    }
    drawText(text, position, color = new Color(255, 255, 255, 1), fontSize = 14, font = "Arial") {
        this._ctx.font = `${fontSize}px ${font}`;
        this._ctx.fillStyle = color.toString();
        this._ctx.fillText(text, position.x, position.y);
    }
}
//# sourceMappingURL=canvas.js.map