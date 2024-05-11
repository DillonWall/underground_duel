import { IAwake } from "../lifecycle/awake.js"
import { IUpdate } from "../lifecycle/update.js"
import { IComponent } from "./component.js"

type AbstractComponent<T> = Function & { prototype: T }
type Type<T> = AbstractComponent<T> | { new (...args: unknown[]): T }

export abstract class Entity implements IUpdate, IAwake {
	protected components: IComponent[] = []

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

	public addComponent(component: IComponent): void {
		component.entity = this
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
}
