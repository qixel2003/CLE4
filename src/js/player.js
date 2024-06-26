import { Actor, Color, Vector, Input, CollisionType, SpriteSheet, Animation, Shape } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Enemy } from './enemy.js';
import { Enemy2 } from './enemy2.js'; // Import Enemy2
import { Boss } from "./boss.js";

// Utility function to generate a range of numbers
function range(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}

export class Player extends Actor {
    health;
    attack;
    defense;
    rangedAttack;
    shielded;

    constructor(health, attack, defense, speed, rangedAttack) {
        super({
            pos: new Vector(400, 300),
            width: 50,
            height: 50,
            color: Color.Red,
            collisionType: CollisionType.Active, // Set collision to Active
            z: 2
        });

        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.rangedAttack = rangedAttack;
        this.startHealth = health;

        // Zet collision op Active voor de beste ervaring.
        this.body.collisionType = CollisionType.Active;
        const body = Shape.Box(45, 60, new Vector(.5, .6))
        this.collider.set(body)

        // Variables for handling enemy collision and health reduction
        this.isCollidingWithEnemy = false;
        this.lastHitTime = 0;
        this.attackCooldown = 500; // Cooldown for melee attack in milliseconds
        this.lastAttackTime = 0;

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Player1,
            grid: { rows: 1, columns: 10, spriteWidth: 100, spriteHeight: 100 }
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
        engine.input.gamepads.enabled = true;



        // // Lees welke key er wordt gedrukt
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

        // Normalize velocity to maintain consistent speed in diagonal movement
        if (!vel.equals(Vector.Zero)) {
            vel = vel.normalize().scale(speed);
        }
        this.vel = vel;

        // //Controller Movement
        if (!this.vel.equals(Vector.Zero)) {
            this.lastMovementDirection = this.vel.normalize();
        }

        const gamepad = engine.input.gamepads.at(0); // Get the first connected gamepad
        if (gamepad) {
            let moveDirection = Vector.Zero.clone(); // Initialize movement direction to zero
            console.log("controller aan")

            // Define a deadzone to prevent unintended movement from slight stick drift
            const deadzone = 0.1;
            const leftStickX = gamepad.getAxes(Input.Axes.LeftStickX);
            const leftStickY = gamepad.getAxes(Input.Axes.LeftStickY);

            // Only check D-pad buttons if stick input is zero
            if (moveDirection.equals(Vector.Zero)) {
                if (gamepad.isButtonPressed(Input.Buttons.DpadLeft)) {
                    moveDirection.x = -1;
                    this.graphics.use('runleft');
                }
                if (gamepad.isButtonPressed(Input.Buttons.DpadRight)) {
                    moveDirection.x = 1;
                    this.graphics.use('runright');
                }
                if (gamepad.isButtonPressed(Input.Buttons.DpadUp)) {
                    moveDirection.y = -1;
                    this.graphics.use('runfront');
                }
                if (gamepad.isButtonPressed(Input.Buttons.DpadDown)) {
                    moveDirection.y = 1;
                    this.graphics.use('runback');
                }
            }

            // Normalize and scale the direction vector if it's not zero
            if (!moveDirection.equals(Vector.Zero)) {
                moveDirection = moveDirection.normalize().scale(200); // Adjust speed as needed
            }

            // Set the player's velocity
            this.vel = moveDirection; // Ensure this.vel is the correct property for velocity
        } else {
            console.log("No gamepad connected or gamepad not detected");
        }


        // Handle melee attack Face1 = A or X Face2 = B or Circle Face3 = X or Square Face4 = Y or Triangle
        
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)|| gamepad.isButtonPressed(Input.Buttons.Face1)) {
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

    // If there's no movement, use the last movement direction
    if (attackDirection.equals(Vector.Zero)) {
        attackDirection = this.lastMovementDirection;
    }

    // Update lastMovementDirection in case the attack updates it (this ensures it gets updated even if there's no movement)
    if (!attackDirection.equals(Vector.Zero)) {
        this.lastMovementDirection = attackDirection;
    }

    // Position the attack in front of the player
    const attackOffset = attackDirection.scale(this.width / 2 + 30);
    let attack = new Actor({
        pos: this.pos.add(attackOffset), // Place the attack in front of the player
        width: 30,    // Define the collision hitbox width
        height: 30,   // Define the collision hitbox height
        color: Color.Transparent // Set to transparent if using a sprite
    });

    attack.body.collisionType = CollisionType.Passive; // Passive to detect collisions but not to interfere

    // Calculate the rotation based on the attackOffset
    const angleOfRotation = Math.atan2(attackOffset.y, attackOffset.x);

    // Add and configure the melee attack sprite
    const meleeSprite = Resources.MeleeAttack.toSprite();
    meleeSprite.scale = new Vector(0.5, 0.5); // Scale the sprite down
    meleeSprite.anchor = new Vector(0.5, 0.5); // Set the sprite's anchor to its center
    meleeSprite.rotation = angleOfRotation; // Rotate to match the attack offset

    attack.graphics.use(meleeSprite);

    // Add collision handler for attack
    attack.on('collisionstart', (event) => {
        if (event.other instanceof Enemy || event.other instanceof Enemy2 || event.other instanceof Boss) {
            event.other.takeDamage(this.attack); // Decrease enemy health
            attack.kill(); // Remove the attack actor
        }
    });

    // Add the attack to the scene
    this.scene.add(attack);
    setTimeout(() => {
        if (attack.scene) {
            attack.kill();
        }
    }, 200);
}

    onCollisionStart(event) {
        if (event.other instanceof Enemy || event.other instanceof Enemy2 || event.other instanceof Boss) {
            console.log(event.other)
            this.isCollidingWithEnemy = true;
            this.collidingEnemy = event.other;
            this.lastHitTime = Date.now(); // Initialize last hit time
            console.log("Collision with enemy started");
        }
    }

    onCollisionEnd(event) {
        if (event.other instanceof Enemy || event.other instanceof Enemy2 || event.other instanceof Boss) {
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
