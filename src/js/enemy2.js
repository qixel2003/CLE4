import { Actor, Color, Vector, CollisionType, Timer } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';

export class Enemy2 extends Actor {
    constructor(x, y, lvl) {
        super({
            pos: new Vector(x, y), // initial position
            width: 50,
            height: 100,
            color: Color.Red, // initial color
        });
        this.body.collisionType = CollisionType.Active;

        if (lvl == 1) {
            this.health = 1;
            this.attack = 2;
        }
        else if (lvl == 2) {
            this.health = 3;
            this.attack = 2;
        }
        else if (lvl == 3) {
            this.health = 5;
            this.attack = 3;
        }

        // Timer for shooting projectiles
        this.shootCooldown = 2000; // Shoot every 2 seconds
        this.shootTimer = new Timer({
            fcn: () => this.shootProjectile(),
            interval: this.shootCooldown,
            repeats: true
        });

        // Projectile cooldown
        this.projectileCooldown = 1000; // Minimum time between projectiles in milliseconds
        this.lastShotTime = 0; // Timestamp of the last shot
    }

    onInitialize(engine) {
        this.graphics.use(Resources.EnemyRanged.toSprite());
        this.scene.add(this.shootTimer);
        this.shootTimer.start();
    }

    onPreUpdate(engine, delta) {
        // Ensure player is available in the engine
        if (!this.scene) return; // Ensure the scene is initialized
        const player = this.scene.actors.find(actor => actor instanceof Player);
        if (player) {
            let distance = this.pos.distance(player.pos); // Calculate distance to player
            let direction = player.pos.sub(this.pos).normalize();
            if (distance < 400) {
                // Move closer to the player if distance is greater than 200 but less than 400
                if (distance > 200) {
                    this.vel = direction.scale(200);
                } else {
                    // Maintain the distance
                    this.vel = Vector.Zero;
                }
                // Start shooting projectiles if the player is within 400 units
                this.shootProjectile();
            } else {
                // Stop moving and shooting if the player is further than 400 units
                this.vel = Vector.Zero;
                this.shootTimer.pause(); // Pause shooting
            }
        }
    }

    shootProjectile() {
        // Check cooldown between shots
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime < this.projectileCooldown) {
            return; // Not enough time passed since the last shot
        }

        // Update last shot time
        this.lastShotTime = currentTime;

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

    takeDamage(damage) {
        this.health -= damage;
        console.log(`Enemy health: ${this.health}`);
        if (this.health <= 0) {
            this.kill();
        }
    }
}
