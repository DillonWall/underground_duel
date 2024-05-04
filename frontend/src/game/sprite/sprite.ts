import { Animation } from "./animation.js"

export class Sprite {
	spriteSheet: HTMLImageElement
	frameWidth: number
	frameHeight: number
	currentAnimation: string
	animations: Map<string, Animation> = new Map()

	constructor(imageSrc: string, spriteSheetInfoFile: string) {
		this.spriteSheet = new Image()
		this.spriteSheet.src = imageSrc

		// Parse the sprite sheet info file which is a custom json file or tiled file
	}
}
