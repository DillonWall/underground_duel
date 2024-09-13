// IComponent implements IUpdate, IAwake
// References Entity (can be null)

import { IAwake } from "../lifecycle/awake.ts"
import { IUpdate } from "../lifecycle/update.ts"
import { Entity } from "./entity.ts"

export interface IComponent extends IAwake, IUpdate {
	entity: Entity | null
}
