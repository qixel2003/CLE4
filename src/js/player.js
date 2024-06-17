import { Actor, Color, Vector, Input, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'

export class Player extends Actor {
    constructor(health, attack, defense, rangedAttack) {
        super({
            pos: new Vector(400, 300), // Start Positie
            width: 50,
            height: 50,
            color: Color.Red, // Tijdelijke kleur
        })
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.rangedAttack = rangedAttack;

        //Zet collision op Active voor de beste ervaring.
        this.CollisionType = CollisionType.Active;
        this.graphics.use(Resources.MCF.toSprite());
    }

    // Update function voor speler movement
    onPreUpdate(engine) {
        let speed = 200;
        let vel = Vector.Zero
        // Lees welke key er wordt gedrukt
        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            vel = vel.add(new Vector(0, -1));
            this.graphics.use(Resources.MCB.toSprite());
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            vel = vel.add(new Vector(0, 1));
            this.graphics.use(Resources.MCF.toSprite());
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            vel = vel.add(new Vector(-1, 0));
            this.graphics.use(Resources.MCSL.toSprite());
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            vel = vel.add(new Vector(1, 0));
            this.graphics.use(Resources.MCSR.toSprite());
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
        const attackOffset = attackDirection.scale(this.width / 2 + 15);

        let attack = new Actor({
            pos: this.pos.add(attackOffset), // Place the attack in front of the player
            width: 30,    // Define the collision hitbox width
            height: 30,   // Define the collision hitbox height
            color: Color.Transparent // Set to transparent if using a sprite
        });

        attack.body.collisionType = CollisionType.Active;

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

        // Add the attack to the scene
        this.scene.add(attack);

        // Remove the attack after a short delay (200 milliseconds)
        setTimeout(() => {
            this.scene.remove(attack);
        }, 200);
    }
} 
