import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, SolverStrategy, BoundingBox, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Hostage } from './hostage.js'
import { Cage } from './cage.js'
import { Enemy } from './enemy.js'
import { Enemy2 } from './enemy2.js'
import { RoomQbg } from './roomQbg.js'


export class RoomQ1 extends Scene {
    onInitialize(engine) {
        this.startRoomQ1();
    }

    onActivate(ctx) {
        console.log("reset the RoomQ1");
        this.resetGame();
        this.startRoomQ1(); // Re-initialize the RoomQ1
    }

    startRoomQ1() {
        this.score = 0;
        console.log("start the game!");

        const backg = new RoomQbg(600,400);
        this.add(backg);

        this.createPlayer(10, 2, 20, false);
        this.createHostage(1000, 400);
        this.createCage(1000,400);
        // this.createEnemy(600, 700, 1);
        // this.createEnemy2(400, 700, 1);

    }

    onPreUpdate(engine) {
        // Add any necessary updates per frame here
    }

    createPlayer(health, attack, defense, rangedAttack) {
        const player = new Player(health, attack, defense, rangedAttack);
        this.add(player)
        // Camera setup
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 2000, 1200));
    }

    createEnemy(x, y, lvl) {
        const enemy = new Enemy(x, y, lvl);
        this.add(enemy);
    }

    createEnemy2(x, y, lvl) {
        const enemy = new Enemy2(x, y, lvl);
        this.add(enemy);
    }

    createHostage(x, y) {
        const hostage = new Hostage(new Vector(x, y))
        this.add(hostage)
    }

    createCage(x, y) {
        const cage = new Cage(x, y)
        this.add(cage)
    }
    

    // addPoint() {
    //     this.score++;
    //     this.label.text = `Score: ${this.score}`;
    // }

    resetGame() {
        // Clear all existing actors
        this.actors.forEach(actor => {
            this.remove(actor);
        });

        // Reset game state variables
        this.score = 0;
    }
}
new RoomQ1