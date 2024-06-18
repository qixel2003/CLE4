import { Actor, Color, Vector, Input, CollisionType, SpriteSheet, Animation } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Enemy } from './enemy.js';

// Utility function to generate a range of numbers
function range(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}

export class Player extends Actor {
    constructor(health, attack, defense, rangedAttack) {
        super({
            pos: new Vector(400, 300), // Start Positie
            width: 50,
            height: 50,
            color: Color.Red, // Tijdelijke kleur   
        });
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.rangedAttack = rangedAttack;
        this.startHealth = health;

        // Zet collision op Active voor de beste ervaring.
        this.body.collisionType = CollisionType.Active;

        // Variables for handling enemy collision and health reduction
        this.isCollidingWithEnemy = false;
        this.lastHitTime = 0;
        this.attackCooldown = 500; // Cooldown for melee attack in milliseconds
        this.lastAttackTime = 0;

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Player1,
            grid: { rows: 1, columns: 10, spriteWidth: 96, spriteHeight: 96 }
        });
        const idle = runSheet.sprites[0]; // geen animatie
        const runLeft = Animation.fromSpriteSheet(runSheet, range(8, 9), 80);
        const runRight = Animation.fromSpriteSheet(runSheet, range(6, 7), 80);
        const runBack = Animation.fromSpriteSheet(runSheet, range(1, 2), 80);
        const runFront = Animation.fromSpriteSheet(runSheet, range(3, 4), 80);

        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);
        this.graphics.add("runfront", runFront);
        this.graphics.add("runback", runBack);

        this.graphics.use(idle);
        this.on('collisionstart', (event) => this.onCollisionStart(event));
        this.on('collisionend', (event) => this.onCollisionEnd(event));
    }

    // Update function voor speler movement
    onPreUpdate(engine, delta) {
        let speed = 200;
        let vel = Vector.Zero;
        this.graphics.use('idle');

        // Lees welke key er wordt gedrukt
        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            vel = vel.add(new Vector(0, -1));
            this.graphics.use('runfront');
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            vel = vel.add(new Vector(0, 1));
            this.graphics.use('runback');
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            vel = vel.add(new Vector(-1, 0));
            this.graphics.use('runleft');
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            vel = vel.add(new Vector(1, 0));
            this.graphics.use('runright');
        }

        // Normalize zorgt ervoor dat je niet diagonaal sneller beweegt
        if (!vel.equals(Vector.Zero)) {
            vel = vel.normalize().scale(speed);
        }
        this.vel = vel;

        // Handler melee attack
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            this.meleeAttack();
        }

        // Reduce health if colliding with an enemy every second
        if (this.isCollidingWithEnemy && Date.now() - this.lastHitTime >= 1000) {
            this.health -= this.collidingEnemy.attack;
            this.lastHitTime = Date.now();
            console.log(`Player health: ${this.health}`);
        }

        if (this.health <= 0) {
            this.gameOver();
        }
    }

    meleeAttack() {
        // Ensure attacks cannot be spammed
        if (Date.now() - this.lastAttackTime < this.attackCooldown) {
            return;
        }

        this.lastAttackTime = Date.now(); // Reset the timer for attack cooldown

        // Determine the attack direction using the player's velocity vector
        let attackDirection = this.vel.normalize();
        if (attackDirection.equals(Vector.Zero)) {
            attackDirection = new Vector(1, 0); // Default to right if there's no movement
        }

        // Position the attack in front of the player
        // The attack is positioned slightly in front of the player in the direction of movement
        const attackOffset = attackDirection.scale(this.width / 2 + 20);

        let attack = new Actor({
            pos: this.pos.add(attackOffset), // Place the attack in front of the player
            width: 30,    // Define the collision hitbox width
            height: 30,   // Define the collision hitbox height
            color: Color.Transparent // Set to transparent if using a sprite
        });

        attack.body.collisionType = CollisionType.Passive; // Passive to detect collisions but not to interfere

        // Add and configure the melee attack sprite
        const meleeSprite = Resources.MeleeAttack.toSprite();
        meleeSprite.scale = new Vector(0.5, 0.5); // Scale the sprite down

        // Set the sprite's anchor to its center
        meleeSprite.anchor = new Vector(0.5, 0.5);

        // Rotate the sprite to match the attack direction
        const rotationAngle = Math.atan2(attackDirection.y, attackDirection.x);
        meleeSprite.rotation = rotationAngle;

        // Use the sprite for the attack's graphics
        attack.graphics.use(meleeSprite);

        // Add collision handler for attack
        attack.on('collisionstart', (event) => {
            if (event.other instanceof Enemy) {
                event.other.takeDamage(this.attack); // Decrease enemy health
                attack.kill(); // Remove the attack actor
            }
        });

        // Add the attack to the scene
        this.scene.add(attack);

        // Remove the attack after a short delay (200 milliseconds)
        setTimeout(() => {
            if (attack.scene) {
                attack.kill();
            }
        }, 200);
    }

    onCollisionStart(event) {
        if (event.other instanceof Enemy) {
            this.isCollidingWithEnemy = true;
            this.collidingEnemy = event.other;
            this.lastHitTime = Date.now(); // Initialize last hit time
            console.log("Collision with enemy started");
        }
    }

    onCollisionEnd(event) {
        if (event.other instanceof Enemy) {
            this.isCollidingWithEnemy = false;
            this.collidingEnemy = null;
            console.log("Collision with enemy ended");
        }
    }

    gameOver() {
        this.pos.x = 400;
        this.pos.y = 300;
        this.health = this.startHealth;
        // this.scene.engine.goToScene('gameover')
        // event.other.kill()    // remove the player
    }
}
