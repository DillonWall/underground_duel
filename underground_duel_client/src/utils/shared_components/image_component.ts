import { IComponent } from "../ecs/component.ts"
import { Entity } from "../ecs/entity.ts"

export class ImageComponent implements IComponent {
    public entity: Entity
    public loaded: boolean = false
    private _image: HTMLImageElement | undefined
    private _imageUrl: string

    public get image(): HTMLImageElement | null {
        return this.loaded ? this._image! : null
    }

    constructor(entity: Entity, imageUrl: string) {
        this.entity = entity
        this._imageUrl = imageUrl
        this.loadImage()
    }

    public async loadImage(): Promise<void> {
        await new Promise<void>((resolve) => {
            this._image = new Image()
            this._image.onload = () => {
                this.loaded = true
                resolve()
            }
            this._image.src = this._imageUrl
        })
	}

    public awake(): void {
        this.loadImage()
    }
    public sleep(): void { }
    // @ts-ignore: deltaTime is necessary in the signature for ECS system
    public update(deltaTime: number): void { }
}
