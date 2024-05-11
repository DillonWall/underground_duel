// IComponent implements IUpdate, IAwake
// References Entity (can be null)

import { IAwake } from "../lifecycle/awake.js"
import { IUpdate } from "../lifecycle/update.js"
import { Entity } from "./entity.js"

export interface IComponent extends IAwake, IUpdate {
	entity: Entity | null
}
