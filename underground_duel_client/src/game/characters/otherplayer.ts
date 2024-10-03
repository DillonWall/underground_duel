import { Vector2D } from "../../utils/math/vector2d.ts"
import { Settings } from "../../settings/settings.ts"
import { Character } from "./character.ts"
import { SpriteSheet } from "./sprite/spritesheet.ts"

export class OtherPlayer extends Character {
	constructor(playerSpriteSheet: SpriteSheet, playerData: any) {
		super(playerSpriteSheet, new Vector2D(0,0), Settings.player.moveSpeed, Settings.canvas.playerLayer, false)
        this.updateData(playerData)
	}

    public updateData(playerData: any) {
        this.area_c.loc.X = playerData.Loc.X
        this.area_c.loc.Y = playerData.Loc.Y
        this.movement_c.updateMovement(new Vector2D(playerData.Dir.X, playerData.Dir.Y))
    }

	public update(deltaTime: number): void {
		super.update(deltaTime)
	}
}
