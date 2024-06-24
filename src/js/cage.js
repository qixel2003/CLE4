import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Cage extends Actor {

    constructor(x, y) {
        super({ x, y, width: Resources.Cage.width-50, height: Resources.Cage.height-50 })
        this.scale = new Vector(2.0, 2.0);

    }

    onInitialize(engine) {

        this.graphics.use(Resources.Cage.toSprite())
        // this.scale = new Vector(1.0, 1.0);
    }
}