import { Sprite } from "./sprite/sprite.js"
import { AreaComponent } from "../../utils/shared_components/area_component.js"
import { MovementComponent } from "../../utils/shared_components/movement_component.js"
import { CharacterDrawComponent } from "./components/character_draw_component.js"
import { Vector2D } from "../../utils/math/vector2d.js"
import { SpriteSheet } from "./sprite/spritesheet.js"

enum CharacterAnimationList {
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

export class Character extends Sprite {
	public movement_c: MovementComponent
	public area_c: AreaComponent
	public draw_c: CharacterDrawComponent

	constructor(
		spriteSheet: SpriteSheet,
		loc: Vector2D,
		moveSpeed: number,
		layer: number,
		drawCenter: boolean = false
	) {
		super(spriteSheet)

		this.area_c = new AreaComponent(this, loc, spriteSheet.imageDivider.getSubVectorSize())
		this.movement_c = new MovementComponent(this, this.area_c, moveSpeed, this.setAnimationBasedOnDirection)
		this.addComponent(this.area_c)
		this.addComponent(this.movement_c)

		this.draw_c = new CharacterDrawComponent(this, layer, drawCenter)
		this.addDrawComponent(this.draw_c)
	}

	public setAnimationBasedOnDirection(prevDirection?: Vector2D): void {
		let dir = this.movement_c.direction
		if (Vector2D.isZero(dir)) {
			if (prevDirection) {
				dir = prevDirection
			} else {
				dir = new Vector2D(0, 1) // Default looking down
			}
		}
		if (this.movement_c.velocity > 0) {
			if (dir.y == 1) {
				this.setAnimation(CharacterAnimationList.MoveDown)
				this.draw_c.flip = false
			} else if (dir.y == -1) {
				this.setAnimation(CharacterAnimationList.MoveUp)
				this.draw_c.flip = false
			} else if (dir.x == 1) {
				this.setAnimation(CharacterAnimationList.MoveRight)
				this.draw_c.flip = false
			} else if (dir.x == -1) {
				this.setAnimation(CharacterAnimationList.MoveRight)
				this.draw_c.flip = true
			}
		} else {
			if (dir.y == 1) {
				this.setAnimation(CharacterAnimationList.IdleDown)
				this.draw_c.flip = false
			} else if (dir.y == -1) {
				this.setAnimation(CharacterAnimationList.IdleUp)
				this.draw_c.flip = false
			} else if (dir.x == 1) {
				this.setAnimation(CharacterAnimationList.IdleRight)
				this.draw_c.flip = false
			} else if (dir.x == -1) {
				this.setAnimation(CharacterAnimationList.IdleRight)
				this.draw_c.flip = true
			}
		}
	}

	public awake(): void {
		super.awake()

		this.setAnimation(CharacterAnimationList.IdleDown)
	}
}
