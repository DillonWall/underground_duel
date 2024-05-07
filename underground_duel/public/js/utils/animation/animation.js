import { Entity } from "../ecs/entity.js";
export class Animation extends Entity {
    constructor(name, imgSrc, delays, loop, resetOnAwake = true) {
        super();
        this.name = name;
        this.imgSrc = imgSrc;
        this.delays = delays;
        this.lengthFrames = delays.length;
        this.lengthTime = this.delays.reduce((total, delay) => total + delay, 0);
        this.elapsedTime = 0;
        this.currentFrame = 0;
        this.loop = loop;
        this.playing = false;
        this.resetOnAwake = resetOnAwake;
    }
    awake() {
        if (this.resetOnAwake) {
            this.elapsedTime = 0;
            this.currentFrame = 0;
        }
        this.playing = true;
    }
    update(deltaTime) {
        if (!this.playing || this.lengthFrames === 0) {
            return;
        }
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.lengthTime) {
            if (this.loop) {
                this.elapsedTime = this.elapsedTime % this.lengthTime;
            }
            else {
                this.elapsedTime = this.lengthTime;
                this.playing = false;
            }
        }
        this.currentFrame = this.findCurrentFrameIndex();
    }
    findCurrentFrameIndex() {
        let totalTime = 0;
        for (let i = 0; i < this.delays.length; i++) {
            totalTime += this.delays[i];
            if (totalTime >= this.elapsedTime) {
                return i;
            }
        }
        return this.lengthFrames - 1;
    }
}
//# sourceMappingURL=animation.js.map