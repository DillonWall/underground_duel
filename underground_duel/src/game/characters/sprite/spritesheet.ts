import { Entity } from "../../../utils/ecs/entity.js"
import { ImageComponent } from "../../../utils/shared_components/image_component.js"
import { ImageDividerComponent } from "../../../utils/shared_components/image_divider_component.js"
import { SpriteSheetModel } from "../../../models/sprites/spritesheet_model.js"
import { AnimationModel } from "../../../models/animation/animation_model.js"

export class SpriteSheet extends Entity {
	public image: ImageComponent
	public imageDivider: ImageDividerComponent
	public animations: Array<Array<string | AnimationModel>>

	constructor(spriteSheetModel: SpriteSheetModel) {
		super()

		this.animations = spriteSheetModel.animations

		this.image = new ImageComponent(this, spriteSheetModel.imageSrc)
		this.imageDivider = new ImageDividerComponent(
			this,
			spriteSheetModel.frameWidth,
			spriteSheetModel.frameHeight,
			spriteSheetModel.frameCountX,
			spriteSheetModel.frameCountY
		)
		this.addComponent(this.image)
		this.addComponent(this.imageDivider)
	}
}
