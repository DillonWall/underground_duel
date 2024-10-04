import { Vector2D } from "../../utils/math/vector2d.ts"
import { Settings } from "../../settings/settings.ts"
import { Character } from "./character.ts"
import { SpriteSheet } from "./sprite/spritesheet.ts"

export class OtherPlayer extends Character {
	constructor(playerSpriteSheet: SpriteSheet, playerData: any) {
		super(playerSpriteSheet, new Vector2D(0,0), Settings.player.moveSpeed, Settings.canvas.playerLayer, true, false)
        this.updateData(playerData)
	}

    public updateData(playerData: any) {
        this.movement_c.targetLoc.X = playerData.Loc.X
        this.movement_c.targetLoc.Y = playerData.Loc.Y
        this.movement_c.setDirection(new Vector2D(playerData.Dir.X, playerData.Dir.Y))
    }

	public update(deltaTime: number): void {
		super.update(deltaTime)
	}
}
