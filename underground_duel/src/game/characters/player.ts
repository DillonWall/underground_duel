import { SpriteModel } from "../../models/sprites/sprite_model.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { PlayerKeyPressComponent } from "./components/player_keypress_component.js"
import { Settings } from "../../settings/settings.js"
import { Camera } from "../camera.js"
import { Character } from "./character.js"

enum PlayerAnimationList {
	IdleDown = "Idle_Down",
	IdleRight = "Idle_Right",
	IdleUp = "Idle_Up",
	MoveDown = "Move_Down",
	MoveRight = "Move_Right",
	MoveUp = "Move_Up",
	AttackDown = "Attack_Down",
	AttackRight = "Attack_Right",
	AttackUp = "Attack_Up",
	Death = "Death",
}

const loopedAnimations = [
	PlayerAnimationList.IdleDown,
	PlayerAnimationList.IdleRight,
	PlayerAnimationList.IdleUp,
	PlayerAnimationList.MoveDown,
	PlayerAnimationList.MoveRight,
	PlayerAnimationList.MoveUp,
]

export class Player extends Character {
	constructor(playerSpriteModel: SpriteModel, loc: Vector2D) {
		super(playerSpriteModel, loc, loopedAnimations, Settings.player.moveSpeed, Settings.canvas.playerLayer, true)

		this.components.push(new PlayerKeyPressComponent(this))
		Camera.setTarget(this.area)
	}

	protected override setAnimationBasedOnDirection(prevDirection?: Vector2D): void {
		let dir = this._direction
		if (Vector2D.isZero(dir)) {
			if (prevDirection) {
				dir = prevDirection
			} else {
				dir = new Vector2D(0, 1) // Default looking down
			}
		}
		if (this._velocity > 0) {
			if (dir.y == 1) {
				this.setAnimation(PlayerAnimationList.MoveDown)
				this.flipAnimation = false
			} else if (dir.y == -1) {
				this.setAnimation(PlayerAnimationList.MoveUp)
				this.flipAnimation = false
			} else if (dir.x == 1) {
				this.setAnimation(PlayerAnimationList.MoveRight)
				this.flipAnimation = false
			} else if (dir.x == -1) {
				this.setAnimation(PlayerAnimationList.MoveRight)
				this.flipAnimation = true
			}
		} else {
			if (dir.y == 1) {
				this.setAnimation(PlayerAnimationList.IdleDown)
				this.flipAnimation = false
			} else if (dir.y == -1) {
				this.setAnimation(PlayerAnimationList.IdleUp)
				this.flipAnimation = false
			} else if (dir.x == 1) {
				this.setAnimation(PlayerAnimationList.IdleRight)
				this.flipAnimation = false
			} else if (dir.x == -1) {
				this.setAnimation(PlayerAnimationList.IdleRight)
				this.flipAnimation = true
			}
		}
	}

	public awake(): void {
		super.awake()

		this.setAnimation(PlayerAnimationList.IdleDown)
	}

	public sleep(): void {
		super.sleep()
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		Camera.update()
	}
}
