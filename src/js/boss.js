import { Actor, Engine, Vector, Timer, CollisionType, Color } from 'excalibur';
import { Player } from './player.js';

export class Boss extends Actor {
    constructor() {
        super({
            pos: new Vector(400, 300), // Positioning the boss in the center
            width: 100,
            height: 100,
            color: Color.Red // Boss color
        });

        this.attackLeft = true; // Start with attacking the left half
        this.attackInterval = 2000; // Time between attacks (in milliseconds)
        this.attackDuration = 500; // Duration of each attack (in milliseconds)
        this.attack = 2; // Damage dealt to the player per attack
    }

    onInitialize(engine) {
        const attackTimer = new Timer({
            fcn: () => this.performAttack(engine),
            interval: this.attackInterval,
            repeats: true
        });

        engine.currentScene.add(attackTimer);
        attackTimer.start();
    }

    performAttack(engine) {
        // Clear any previous attack visuals or effects
        engine.currentScene.actors.forEach(actor => {
            if (actor.tag === 'attackEffect') {
                actor.kill();
            }
        });

        if (this.attackLeft) {
            this.attackLeftHalf(engine);
        } else {
            this.attackRightHalf(engine);
        }

        this.attackLeft = !this.attackLeft;
    }

    attackLeftHalf(engine) {
        console.log('Boss attacks the left half of the screen!');

        const attackEffect = new Actor({
            pos: new Vector(200, 300), // Center of the left half of the screen
            width: 400, // Cover the left half horizontally
            height: 600, // Cover the entire screen vertically
            color: Color.Blue,
            opacity: 0.5,
            collisionType: CollisionType.Passive // Passive to detect collisions without affecting physics
        });
        attackEffect.tag = 'attackEffect';
        engine.currentScene.add(attackEffect);
        
        attackEffect.on('collisionstart', (event) => {
            if (event.other instanceof Player) {
                event.other.health -= this.attack; // Damage the player
            }
        });

        engine.clock.schedule(() => attackEffect.kill(), this.attackDuration);
    }

    attackRightHalf(engine) {
        console.log('Boss attacks the right half of the screen!');

        const attackEffect = new Actor({
            pos: new Vector(600, 300), // Center of the right half of the screen
            width: 400, // Cover the right half horizontally
            height: 600, // Cover the entire screen vertically
            color: Color.Green,
            opacity: 0.5,
            collisionType: CollisionType.Passive // Passive to detect collisions without affecting physics
        });
        attackEffect.tag = 'attackEffect';
        engine.currentScene.add(attackEffect);

        attackEffect.on('collisionstart', (event) => {
            console.log(event.other)
            if (event.other instanceof Player) {
                event.other.health -= this.attack; // Damage the player
            }
        });

        engine.clock.schedule(() => attackEffect.kill(), this.attackDuration);
    }
}