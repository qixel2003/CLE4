import { Actor, Color, Vector, CollisionType, SpriteSheet, Animation } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js'

export class Enemy extends Actor {
    constructor(x, y, lvl) {
        super({
            pos: new Vector(x, y), // initial position
            width: 50,
            height: 100,
            color: Color.Red, // initial color
        });
        this.CollisionType = CollisionType.Active;


       if (lvl==1) {
         this.health = 10;
         this.attack = 2;
       }
    }

    onInitialize(engine) {
        this.graphics.use(Resources.EnemyMelee.toSprite());
    }

    onPreUpdate(engine) {
        // Ensure player is available in the engine
        const player = engine.currentScene.actors.find(actor => actor instanceof Player);
        if (player) {
            let distance = this.pos.distance(player.pos); // Calculate distance to player
            if (distance < 300) {
                let direction = player.pos.sub(this.pos).normalize();
                this.vel = direction.scale(200);
            } else {
                this.vel = Vector.Zero;
            }
        }

    }

    takeDamage(damage) {
        this.health -= damage;
        console.log(`Enemy health: ${this.health}`);
        if (this.health <= 0) {
            this.kill();
        }
    }
}
