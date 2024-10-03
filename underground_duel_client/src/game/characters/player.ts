import { Vector2D } from "../../utils/math/vector2d.ts"
import { PlayerKeyPressComponent } from "./components/player_keypress_component.ts"
import { Settings } from "../../settings/settings.ts"
import { Camera } from "../camera.ts"
import { Character } from "./character.ts"
import { SpriteSheet } from "./sprite/spritesheet.ts"

export class Player extends Character {
    private _webSocket: WebSocket

	constructor(playerSpriteSheet: SpriteSheet, loc: Vector2D, webSocket: WebSocket) {
		super(playerSpriteSheet, loc, Settings.player.moveSpeed, Settings.canvas.playerLayer, false)

        this._webSocket = webSocket
		this.addComponent(new PlayerKeyPressComponent(this))
		Camera.setTarget(this.area_c)
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

        if (!Vector2D.areEqual(this.movement_c.direction, this.movement_c.prevDirection)) {
            const moveData = {
                MsgType: "move",
                Loc: {
                    X: this.area_c.loc.X,
                    Y: this.area_c.loc.Y,
                },
                Dir: {
                    X: this.movement_c.direction.X,
                    Y: this.movement_c.direction.Y,
                }
            }
            this._webSocket.send(JSON.stringify(moveData))
        }

		Camera.update()
	}
}
