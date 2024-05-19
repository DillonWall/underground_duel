import { Vector2D } from "../../utils/math/vector2d.js"
import { PlayerKeyPressComponent } from "./components/player_keypress_component.js"
import { Settings } from "../../settings/settings.js"
import { Camera } from "../camera.js"
import { Character } from "./character.js"
import { SpriteSheet } from "./sprite/spritesheet.js"

export class Player extends Character {
	constructor(playerSpriteSheet: SpriteSheet, loc: Vector2D) {
		super(playerSpriteSheet, loc, Settings.player.moveSpeed, Settings.canvas.playerLayer, true)

		this.addComponent(new PlayerKeyPressComponent(this))
		Camera.setTarget(this.area_c)
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		Camera.update()
	}
}
