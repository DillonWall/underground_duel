import { SpriteComponent } from "./sprite/sprite_component.ts"
import { AreaComponent } from "../../utils/shared_components/area_component.ts"
import { MovementComponent } from "../../utils/shared_components/movement_component.ts"
import { CharacterDrawComponent } from "./components/character_draw_component.ts"
import { Vector2D } from "../../utils/math/vector2d.ts"
import { SpriteSheet } from "./sprite/spritesheet.ts"
import { Entity } from "../../utils/ecs/entity.ts"

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

export class Character extends Entity {
	public movement_c: MovementComponent
	public pixelPerfectArea_c: AreaComponent
    public sprite_c: SpriteComponent
	public draw_c: CharacterDrawComponent

	constructor(
		spriteSheet: SpriteSheet,
		loc: Vector2D,
		moveSpeed: number,
		layer: number,
        shouldLerp: boolean = false,
		drawCenter: boolean = false,
	) {
		super()

        this.sprite_c = new SpriteComponent(spriteSheet)
        this.sprite_c.setAnimation(CharacterAnimationList.IdleDown)
		this.pixelPerfectArea_c = new AreaComponent(loc, spriteSheet.imageDivider.getSubVectorSize())
		this.movement_c = new MovementComponent(this, this.pixelPerfectArea_c, moveSpeed, shouldLerp, this.setAnimationBasedOnDirection)
		this.addUpdateComponent(this.pixelPerfectArea_c)
		this.addUpdateComponent(this.sprite_c)
		this.addUpdateComponent(this.movement_c)

		this.draw_c = new CharacterDrawComponent(this.sprite_c, this.pixelPerfectArea_c, layer, drawCenter)
		this.addDrawComponent(this.draw_c)
	}

	public setAnimationBasedOnDirection(prevDirection: Vector2D): void {
		let dir = this.movement_c.direction
		if (Vector2D.isZero(dir)) {
            dir = prevDirection
		}
		if (this.movement_c.velocity > 0) {
			if (dir.Y == 1) {
				this.sprite_c.setAnimation(CharacterAnimationList.MoveDown)
				this.draw_c.flip = false
			} else if (dir.Y == -1) {
				this.sprite_c.setAnimation(CharacterAnimationList.MoveUp)
				this.draw_c.flip = false
			} else if (dir.X == 1) {
				this.sprite_c.setAnimation(CharacterAnimationList.MoveRight)
				this.draw_c.flip = false
			} else if (dir.X == -1) {
				this.sprite_c.setAnimation(CharacterAnimationList.MoveRight)
				this.draw_c.flip = true
			}
		} else {
			if (dir.Y == 1 || (dir.X == 0 && dir.Y == 0)) {
				this.sprite_c.setAnimation(CharacterAnimationList.IdleDown)
				this.draw_c.flip = false
			} else if (dir.Y == -1) {
				this.sprite_c.setAnimation(CharacterAnimationList.IdleUp)
				this.draw_c.flip = false
			} else if (dir.X == 1) {
				this.sprite_c.setAnimation(CharacterAnimationList.IdleRight)
				this.draw_c.flip = false
			} else if (dir.X == -1) {
				this.sprite_c.setAnimation(CharacterAnimationList.IdleRight)
				this.draw_c.flip = true
			}
		}
	}

	public awake(): void {
		super.awake()
	}
}
