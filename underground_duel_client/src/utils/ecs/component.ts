import { IAwake } from "../lifecycle/awake.ts"
import { IUpdate } from "../lifecycle/update.ts"

export interface IComponent extends IAwake, IUpdate {
}
