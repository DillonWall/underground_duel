import { IAwake } from "../lifecycle/awake.js"
import { IUpdate } from "../lifecycle/update.js"
import { IComponent } from "./component.js"

type AbstractComponent<T> = Function & { prototype: T }
type Type<T> = AbstractComponent<T> | { new (...args: unknown[]): T }

export abstract class Entity implements IUpdate, IAwake {
	protected _components: IComponent[] = []

	public get components() {
		return this._components
	}

	constructor() {}

	public awake(): void {
		this._components.forEach((component) => {
			component.awake()
		})
	}

	public update(deltaTime: number): void {
		this._components.forEach((component) => {
			component.update(deltaTime)
		})
	}

	public addComponent(component: IComponent): void {
		component.entity = this
		this._components.push(component)
	}

	public getComponent<T extends IComponent>(Type: Type<T>): T {
		const ret: T = this._components.find((component) => component instanceof Type) as T
		if (!ret) {
			throw new Error(`Component ${Type.name} not found on Entity ${this.constructor.name}`)
		}
		return ret
	}

	public removeComponent<T extends IComponent>(Type: Type<T>): void {
		this._components = this._components.filter((component) => !(component instanceof Type))
	}

	public hasComponent(Type: new () => IComponent): boolean {
		return this._components.some((component) => component instanceof Type)
	}
}
