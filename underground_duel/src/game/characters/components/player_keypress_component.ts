import { IComponent } from "../../../utils/ecs/component.js"
import { Vector2D } from "../../../utils/math/vector2d.js"
import { Player } from "../player.js"
import { Settings } from "../../../settings/settings.js"

export class PlayerKeyPressComponent implements IComponent {
	entity: Player

	private _eventListeners: Array<{ eventName: string; func: (this: Document, ev: any) => void }> = []

	constructor(entity: Player) {
		this.entity = entity
		this.setupEventListeners()
	}

	private createEventFuncKeyDown(controlsArr: Array<string>, func: () => void): (event: KeyboardEvent) => void {
		return (event: KeyboardEvent) => {
			event.preventDefault()
			if (
				controlsArr.some((x) => {
					return x === event.code
				}) &&
				event.repeat === false
			) {
				func()
			}
		}
	}

	private createEventFuncKeyUp(controlsArr: Array<string>, func: () => void): (event: KeyboardEvent) => void {
		return (event: KeyboardEvent) => {
			event.preventDefault()
			if (
				controlsArr.some((x) => {
					return x === event.code
				})
			) {
				func()
			}
		}
	}

	private setupEventListeners(): void {
		// Left
		this._eventListeners.push({
			eventName: "keydown",
			func: this.createEventFuncKeyDown(Settings.controls.left, () => {
				this.entity.movement_c.addDirection(Vector2D.left())
			}),
		})
		this._eventListeners.push({
			eventName: "keyup",
			func: this.createEventFuncKeyUp(Settings.controls.left, () => {
				this.entity.movement_c.removeDirection(Vector2D.left())
			}),
		})
		// Right
		this._eventListeners.push({
			eventName: "keydown",
			func: this.createEventFuncKeyDown(Settings.controls.right, () => {
				this.entity.movement_c.addDirection(Vector2D.right())
			}),
		})
		this._eventListeners.push({
			eventName: "keyup",
			func: this.createEventFuncKeyUp(Settings.controls.right, () => {
				this.entity.movement_c.removeDirection(Vector2D.right())
			}),
		})
		// Up
		this._eventListeners.push({
			eventName: "keydown",
			func: this.createEventFuncKeyDown(Settings.controls.up, () => {
				this.entity.movement_c.addDirection(Vector2D.up())
			}),
		})
		this._eventListeners.push({
			eventName: "keyup",
			func: this.createEventFuncKeyUp(Settings.controls.up, () => {
				this.entity.movement_c.removeDirection(Vector2D.up())
			}),
		})
		// Down
		this._eventListeners.push({
			eventName: "keydown",
			func: this.createEventFuncKeyDown(Settings.controls.down, () => {
				this.entity.movement_c.addDirection(Vector2D.down())
			}),
		})
		this._eventListeners.push({
			eventName: "keyup",
			func: this.createEventFuncKeyUp(Settings.controls.down, () => {
				this.entity.movement_c.removeDirection(Vector2D.down())
			}),
		})

		// // move by stick
		// document.addEventListener("gamepadStickMove", (event: GamepadStickEvent) => {
		// 	if (event.detail?.gamepadId !== this.player || event.detail.stickIndex !== 0) {
		// 		return
		// 	}

		// 	this.action.movingX = event.detail.stick.x
		// 	this.action.movingY = event.detail.stick.y
		// })
		// // attack
		// config.controls[this.player].attack.forEach((key: string) => {
		// 	document.addEventListener("keydown", (event: KeyboardEvent) => {
		// 		if (this.active && event.code === key && event.repeat === false && !this.action.cooldown) {
		// 			this.action.attacking = true
		// 		}
		// 	})

		// 	document.addEventListener("gamepadButtonDown", (event: GamepadButtonEvent) => {
		// 		if (
		// 			event.detail?.gamepadId === this.player &&
		// 			event.detail.buttonIndex === config.gamepad.attack &&
		// 			!this.action.cooldown
		// 		) {
		// 			this.action.attacking = true
		// 		}
		// 	})
		// })
	}

	private registerControls(): void {
		this._eventListeners.forEach((element) => {
			document.addEventListener(element.eventName, element.func)
		})
	}

	private unregisterControls(): void {
		this._eventListeners.forEach((element) => {
			document.removeEventListener(element.eventName, element.func)
		})
	}

	public awake(): void {
		this.registerControls()
	}

	public sleep(): void {
		this.unregisterControls()
	}

	update(deltaTime: number): void {}
}
