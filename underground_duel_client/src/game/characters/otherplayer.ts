import { Vector2D } from "../../utils/math/vector2d.ts"
import { Settings } from "../../settings/settings.ts"
import { Character } from "./character.ts"
import { SpriteSheet } from "./sprite/spritesheet.ts"

export class PlayerData {
    Loc: Vector2D

    constructor(loc: Vector2D){
        this.Loc = loc
    }
}

export class OtherPlayer extends Character {
	constructor(playerSpriteSheet: SpriteSheet, playerData: PlayerData) {
		super(playerSpriteSheet, new Vector2D(playerData.Loc.X, playerData.Loc.Y), Settings.player.moveSpeed, Settings.canvas.playerLayer, true)
	}

    public updateData(playerData: PlayerData) {
        this.area_c.loc.X = playerData.Loc.X
        this.area_c.loc.Y = playerData.Loc.Y
    }

	public update(deltaTime: number): void {
		super.update(deltaTime)
	}
}
