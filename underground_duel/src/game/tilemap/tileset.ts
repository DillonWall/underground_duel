import { Settings } from "../../settings/settings.js"
import { Entity } from "../../utils/ecs/entity.js"
import { TilesetModel } from "../../models/tilemap/tileset_model.js"
import { ImageComponent } from "../../utils/shared_components/image_component.js"
import { AnimationMapComponent } from "../../utils/shared_components/animation_map_component.js"
import { ImageDividerComponent } from "../../utils/shared_components/image_divider_component.js"

export class Tileset extends Entity {
	public name: string
	public image: ImageComponent
	public imageDivider: ImageDividerComponent
	public animationMap: AnimationMapComponent<number>

	constructor(tilesetModel: TilesetModel) {
		super()

		this.name = tilesetModel.name

		this.image = new ImageComponent(this, tilesetModel.imageSrc)
		this.imageDivider = new ImageDividerComponent(
			this,
			Settings.tile.tileSize,
			Settings.tile.tileSize,
			tilesetModel.tileCountX,
			tilesetModel.tileCountY
		)
		this.animationMap = new AnimationMapComponent<number>(this, tilesetModel.animations)
		this.addComponent(this.image)
		this.addComponent(this.imageDivider)
		this.addComponent(this.animationMap)
	}

	public awake(): void {
		super.awake()

		this.animationMap.awakeAllAnimations()
	}

	public sleep(): void {
		super.sleep()

		this.animationMap.sleepAllAnimations()
	}

	public update(deltaTime: number): void {
		super.update(deltaTime)

		this.animationMap.updateAllAnimations(deltaTime)
	}
}
