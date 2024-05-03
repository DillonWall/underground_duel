export class Entity {
    get components() {
        return this._components;
    }
    constructor() {
        this._components = [];
    }
    awake() {
        // console.log(`Entity ${this.constructor.name} awake`)
        this._components.forEach((component) => {
            component.awake();
        });
    }
    update(deltaTime) {
        this._components.forEach((component) => {
            component.update(deltaTime);
        });
    }
    addComponent(component) {
        component.entity = this;
        this._components.push(component);
    }
    getComponent(Type) {
        const ret = this._components.find((component) => component instanceof Type);
        if (!ret) {
            throw new Error(`Component ${Type.name} not found on Entity ${this.constructor.name}`);
        }
        return ret;
    }
    removeComponent(Type) {
        this._components = this._components.filter((component) => !(component instanceof Type));
    }
    hasComponent(Type) {
        return this._components.some((component) => component instanceof Type);
    }
}
//# sourceMappingURL=entity.js.map