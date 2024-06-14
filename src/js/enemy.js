import { Actor, Color, Vector, Input } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'

export class Enemy extends Actor {
    constructor(x,y) {
        super({
            pos: new Vector(x, y), // initial position
            width: 50,
            height: 50,
            color: Color.Red, // initial color
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Enemy.toSprite())
    }

    onPreUpdate(engine) {
        let direction = this.sub(engine.player.pos).normalize()
        this.vel = direction.scale(200)
    }
}
