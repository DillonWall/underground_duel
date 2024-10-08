import { Entity } from "../../../utils/ecs/entity.ts"
import { ImageComponent } from "../../../utils/shared_components/image_component.ts"
import { ImageDividerComponent } from "../../../utils/shared_components/image_divider_component.ts"
import { SpriteSheetModel } from "../../../models/sprites/spritesheet_model.ts"
import { AnimationModel } from "../../../models/animation/animation_model.ts"

export class SpriteSheet extends Entity {
	public image: ImageComponent
	public imageDivider: ImageDividerComponent
	public animations: Array<Array<string | AnimationModel>>

	constructor(spriteSheetModel: SpriteSheetModel) {
		super()

		this.animations = spriteSheetModel.animations

        const imgUrl: string = new URL(`../../../assets/spritesheets/images/${spriteSheetModel.name}.png`, import.meta.url).href
		this.image = new ImageComponent(imgUrl)
		this.imageDivider = new ImageDividerComponent(
			spriteSheetModel.frameWidth,
			spriteSheetModel.frameHeight,
			spriteSheetModel.frameCountX,
			spriteSheetModel.frameCountY
		)
		this.addUpdateComponent(this.image)
		this.addUpdateComponent(this.imageDivider)
	}
}
