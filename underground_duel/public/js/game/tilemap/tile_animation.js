import { Animation } from "../../utils/animation/animation.js";
export class TileAnimation extends Animation {
    constructor(tileAnimationModel) {
        super(tileAnimationModel.name, tileAnimationModel.imageSrc, tileAnimationModel.delays, tileAnimationModel.loop, tileAnimationModel.resetOnAwake);
        this._frameImageIndecies = tileAnimationModel.frameImageIndecies;
    }
    getFrameImageIndex(frameIndex) {
        return this._frameImageIndecies[frameIndex];
    }
    getCurrentFrameImageIndex() {
        return this._frameImageIndecies[this.currentFrame];
    }
    awake() {
        super.awake();
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
//# sourceMappingURL=tile_animation.js.map