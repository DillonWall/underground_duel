import { Settings } from "../../settings/settings.ts"
import { Entity } from "../../utils/ecs/entity.ts"
import { TilesetModel } from "../../models/tilemap/tileset_model.ts"
import { ImageComponent } from "../../utils/shared_components/image_component.ts"
import { AnimationMapComponent } from "../../utils/shared_components/animation_map_component.ts"
import { ImageDividerComponent } from "../../utils/shared_components/image_divider_component.ts"

export class Tileset extends Entity {
	public name: string
	public image: ImageComponent
	public imageDivider: ImageDividerComponent
	public animationMap: AnimationMapComponent<number>

	constructor(tilesetModel: TilesetModel) {
		super()

		this.name = tilesetModel.name

        const imgUrl: string = new URL(`../../assets/tilesets/images/${tilesetModel.name}.png`, import.meta.url).href
		this.image = new ImageComponent(this, imgUrl)
		this.imageDivider = new ImageDividerComponent(
			this,
			Settings.tile.tileSize,
			Settings.tile.tileSize,
			tilesetModel.tileCountX,
			tilesetModel.tileCountY
		)
		this.animationMap = new AnimationMapComponent<number>(this, tilesetModel.animations)
		this.addUpdateComponent(this.image)
		this.addUpdateComponent(this.imageDivider)
		this.addUpdateComponent(this.animationMap)
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
