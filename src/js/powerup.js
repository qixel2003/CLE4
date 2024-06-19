import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Player } from './player.js'

export class Powerup extends Actor {
    constructor(x, y, type, duration) {
        super({
            pos: new Vector(x, y),
            width: 20,
            height: 20,
            color: Color.White // Initial color (will be updated)
        });
        this.duration = duration || 5000; // duration in milliseconds (default: 5000ms)
        this.type = type;
        this.color = this.getColorForType(type);
        this.collisionType = CollisionType.Passive;
        this.on('collisionstart', this.onCollision.bind(this)); // Bind onCollision method to current instance
    }

    getColorForType(type) {
        switch (type) {
            case 'attack':
                return Color.Red;
            case 'shield':
                return Color.Blue;
            case 'speed':
                return Color.Green;
            default:
                return Color.White;
        }
    }

    applyEffect(actor) {
        switch (this.type) {
            case 'attack':
                console.log("Attack boost applied to: " + actor);
                // Example: Increase actor's attack power
                actor.attack = (actor.attack || 10) * 1.5;
                setTimeout(() => {
                    actor.attack /= 1.5;
                }, this.duration);
                break;
            case 'shield':
                console.log("Shield applied to: " + actor);
                // Example: Add shield property or increase defense
                actor.isShielded = true;
                actor.CollisionType = CollisionType.Passive;
                setTimeout(() => {
                    actor.isShielded = false;
                    actor.CollisionType = CollisionType.Active;
                    console.log(actor)
                }, this.duration);
                break;
            case 'speed':
                console.log("Speed boost applied to: " + actor);
                // Example: Increase actor's speed
                actor.speed = (actor.speed || 100) * 1.5;
                setTimeout(() => {
                    actor.speed /= 1.5;
                }, this.duration);
                break;
            default:
                console.warn("Unknown power-up type: " + this.type);
        }
    }

    onPreUpdate(engine, delta) {
        this.color = this.getColorForType(this.type); // Update color
        super.onPreUpdate(engine, delta);
    }

    onCollision(evt) {
        let other = evt.other;
        if (other instanceof Player) {
            console.log(other)
            this.applyEffect(other);
            this.kill(); // Kill the power-up after applying effect
        }
    }
}
