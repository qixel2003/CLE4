import { Actor, Color, Vector, Input, CollisionType, Animation, SpriteSheet } from "excalibur";
import { Resources } from './resources';  // Ensure this path is correct based on your file structure

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
            collisionType: CollisionType.Active // Set collision to Active
        });
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.rangedAttack = rangedAttack;
        this.shielded = false; // Initialize shielded state

        // Setup player animations (assumed to be defined in your resources)
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Player1,
            grid: { rows: 1, columns: 10, spriteWidth: 96, spriteHeight: 96 }
        });

        const idle = runSheet.sprites[0];
        const runLeft = Animation.fromSpriteSheet(runSheet, [8, 9], 80);
        const runRight = Animation.fromSpriteSheet(runSheet, [6, 7], 80);
        const runBack = Animation.fromSpriteSheet(runSheet, [1, 2], 80);
        const runFront = Animation.fromSpriteSheet(runSheet, [3, 4], 80);

        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);
        this.graphics.add("runfront", runFront);
        this.graphics.add("runback", runBack);

        this.graphics.use(idle);
    }

    onPreUpdate(engine) {
        let speed = this.speed;
        let vel = Vector.Zero;
        this.graphics.use('idle');

        // Handle movement input
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

        // Handle melee attack
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            this.meleeAttack();
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
        const attackOffset = attackDirection.scale(this.width / 2 + 20);
        let attack = new Actor({
            pos: this.pos.add(attackOffset),
            width: 30,
            height: 30,
            color: Color.Transparent,
            collisionType: CollisionType.Active
        });

        // Add and configure the melee attack sprite
        const meleeSprite = Resources.MeleeAttack.toSprite();
        meleeSprite.scale = new Vector(0.5, 0.5); // Scale the sprite down
        meleeSprite.anchor = new Vector(0.5, 0.5); // Set the sprite's anchor to its center
        meleeSprite.rotation = Math.atan2(attackDirection.y, attackDirection.x); // Rotate to match the attack direction

        attack.graphics.use(meleeSprite);

        // Add the attack to the scene and remove it after a short delay
        this.scene.add(attack);
        setTimeout(() => {
            this.scene.remove(attack);
        }, 200);
    }
    onPostUpdate(engine, delta) {
       
    }
}
