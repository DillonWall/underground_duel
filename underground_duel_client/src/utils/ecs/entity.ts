import { IAwake } from "../lifecycle/awake.ts"
import { IDraw } from "../lifecycle/draw.ts"
import { IUpdate } from "../lifecycle/update.ts"
import { DrawComponent } from "../shared_components/draw_component.ts"
import { IComponent } from "./component.ts"

type AbstractComponent<T> = Function & { prototype: T }
type Type<T> = AbstractComponent<T> | { new (...args: unknown[]): T }

export abstract class Entity implements IUpdate, IAwake, IDraw {
	protected components: IComponent[] = []
	protected drawComponents: DrawComponent[] = []

	constructor() {}

	public awake(): void {
		this.components.forEach((component) => {
			component.awake()
		})
	}

	public sleep(): void {
		this.components.forEach((component) => {
			component.sleep()
		})
	}

	public update(deltaTime: number): void {
		this.components.forEach((component) => {
			component.update(deltaTime)
		})
	}

	public draw(): void {
		this.drawComponents.forEach((component) => {
			component.draw()
		})
	}

	public addUpdateComponent(component: IComponent): void {
		this.components.push(component)
	}

	public getComponent<T extends IComponent>(Type: Type<T>): T {
		const ret: T = this.components.find((component) => component instanceof Type) as T
		if (!ret) {
			throw new Error(`Component ${Type.name} not found on Entity ${this.constructor.name}`)
		}
		return ret
	}

	public removeComponent<T extends IComponent>(Type: Type<T>): void {
		this.components = this.components.filter((component) => !(component instanceof Type))
	}

	public hasComponent(Type: new () => IComponent): boolean {
		return this.components.some((component) => component instanceof Type)
	}

	public addDrawComponent(component: DrawComponent): void {
		this.drawComponents.push(component)
	}

	public getDrawComponent<T extends DrawComponent>(Type: Type<T>): T {
		const ret: T = this.drawComponents.find((component) => component instanceof Type) as T
		if (!ret) {
			throw new Error(`Draw component ${Type.name} not found on Entity ${this.constructor.name}`)
		}
		return ret
	}

	public removeDrawComponent<T extends DrawComponent>(Type: Type<T>): void {
		this.drawComponents = this.drawComponents.filter((component) => !(component instanceof Type))
	}

	public hasDrawComponent(Type: new () => DrawComponent): boolean {
		return this.drawComponents.some((component) => component instanceof Type)
	}
}
