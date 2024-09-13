import { Vector2D } from "../../utils/math/vector2d.ts"
import { PlayerKeyPressComponent } from "./components/player_keypress_component.ts"
import { Settings } from "../../settings/settings.ts"
import { Camera } from "../camera.ts"
import { Character } from "./character.ts"
import { SpriteSheet } from "./sprite/spritesheet.ts"

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
