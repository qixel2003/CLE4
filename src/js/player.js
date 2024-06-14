import { Actor, Color, Vector, Input, CollisionType } from "excalibur";

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
    }

    // Update function voor speler movement
    onPreUpdate(engine) {
        let speed = 200;
        let vel = Vector.Zero
        // Lees welke key er wordt gedrukt
        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            vel = vel.add(new Vector(0, -1));
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            vel = vel.add(new Vector(0, 1));
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            vel = vel.add(new Vector(-1, 0));
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            vel = vel.add(new Vector(1, 0));
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
        // Zorgt ervoor dat de aanvallen niet gespammed kunnen worden
        if (Date.now() - this.lastAttackTime < this.attackCooldown) {
            return;
        }

        this.lastAttackTime = Date.now(); // Reset de timer per aanvaL

        // Achterhaal welke richting je opgaat door middel van de Vector
        let attackDirection = this.vel.normalize();
        if (attackDirection.equals(Vector.Zero)) {
            attackDirection = new Vector(1, 0); // Default naar rechts als er geen beweging is.
        }

        // Maak de Melee entity aan, geen apparte class hier voor nodig, misschien eventueel voor de powerups wel.
        let attack = new Actor({
            pos: this.pos.add(attackDirection.scale(this.width)), // Positioneer de aanval voor de speler, niet in.
            width: 30,
            height: 30,
            color: Color.Yellow // Attack color
        });
        attack.CollisionType = CollisionType.Active;

        // Add melee attack in de game.
        this.scene.add(attack);

        // Verwijder de attack na een korte delay, is momenteel 200 mili seconde
        setTimeout(() => {
            this.scene.remove(attack);
        }, 200);
    }
} 
