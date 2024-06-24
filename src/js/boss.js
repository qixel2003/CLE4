import { Actor, Engine, Vector, Timer, CollisionType, Color, Scene } from 'excalibur';
import { Player } from './player.js';

export class Boss extends Actor {
    constructor() {
        super({
            pos: new Vector(600, 200), // Positioning the boss in the center
            width: 100,
            height: 100,
            color: Color.Red // Boss color
        });

        this.attackLeft = true; // Start with attacking the left half
        this.attackInterval = 2000; // Time between attacks (in milliseconds)
        this.attackDuration = 500; // Duration of each attack (in milliseconds)
        this.attack = 2; // Damage dealt to the player per attack
        this.health = 20; // Boss health
        this.phase = '1';
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

    onPreUpdate(engine){
        if(this.health<=10){
            this.phase='2';
        }
    }

    performAttack(engine) {
        // Clear any previous attack visuals or effects
        engine.currentScene.actors.forEach(actor => {
            if (actor.tag === 'attackEffect') {
                actor.kill();
            }
        });

        if (this.phase == '1') {
            if (this.attackLeft) {
                this.attackLeftHalf(engine);
            } else {
                this.attackRightHalf(engine);
            }

            this.attackLeft = !this.attackLeft;
        } else {
            this.performRangedAttack(engine);
        }
    }

    performRangedAttack(engine) {
        // Shoot 10 projectiles with a delay of 1 second between each shot
        for (let i = 0; i < 10; i++) {
            engine.clock.schedule(() => {
                this.rangedAttack(engine);
            }, i * 100); // Delay each shot by i seconds
        }
    }

    rangedAttack(engine) {
        // Ensure player is available in the engine
        if (!this.scene) return; // Ensure the scene is initialized
        const player = this.scene.actors.find(actor => actor instanceof Player);
        if (player) {
            const projectile = new Actor({
                pos: this.pos.clone(), // Start at enemy position
                width: 10,
                height: 10,
                color: Color.Black,
                collisionType: CollisionType.Passive
            });

            const direction = player.pos.sub(this.pos).normalize();
            projectile.vel = direction.scale(300); // Speed of the projectile

            projectile.on('collisionstart', (event) => {
                if (event.other instanceof Player) {
                    event.other.health -= this.attack; // Damage the player
                    projectile.kill(); // Destroy the projectile
                }
            });

            this.scene.add(projectile);

            // Remove the projectile after a certain time to prevent clutter
            setTimeout(() => {
                if (projectile.scene) {
                    projectile.kill();
                }
            }, 3000); // Projectile lifetime (3 seconds)
        }
    }

    attackLeftHalf(engine) {
        console.log('Boss attacks the left half of the screen!');

        const attackEffect = new Actor({
            pos: new Vector(350, 400), // Center of the left half of the screen
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
            pos: new Vector(850, 400), // Center of the right half of the screen
            width: 400, // Cover the right half horizontally
            height: 600, // Cover the entire screen vertically
            color: Color.Green,
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

    takeDamage(damage) {
        this.health -= damage;
        console.log(`Enemy health: ${this.health}`);
        if (this.health <= 0) {
            this.kill();
        }
    }
}
