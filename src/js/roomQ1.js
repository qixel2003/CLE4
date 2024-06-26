import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, SolverStrategy, BoundingBox, Scene, CollisionType, Label } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Hostage } from './hostage.js'
import { Cage } from './cage.js'
import { Enemy } from './enemy.js'
import { Enemy2 } from './enemy2.js'
import { RoomQbg } from './roomQbg.js'
import { EventBlock } from './eventBlock.js'
import { Fire } from './fire.js'
import { Door1, DoorStart } from './door.js';
import { UI } from './ui.js';




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
        this.createEventBlock(700, 300, 'save', "We don't save gingers dumass");
        this.createEventBlock(700, 500, 'kill', 'NO Mercy!!!!');

        const doorHostageQ = new Door1(600, 25)
        this.add(doorHostageQ)

        // const doorStart = new DoorStart(1180, 375)
        // this.add(doorStart)

        // this.createFire(600,400);
        // this.createEnemy(600, 700, 1);
        // this.createEnemy2(400, 700, 1);

        this.messageLabel = new Label({
            text: '',
            pos: new Vector(700, 400),
            fontSize: 30,
            color: Color.White,
            z: 100 // Ensure the label is on top
        });
        this.add(this.messageLabel);

        

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
        const playerUI = new UI(player)
        this.add(playerUI)
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
        const hostage = new Hostage({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        hostage.pos = new Vector(x, y)
        const hostageImage = Resources.Hostage1.toSprite();
        hostageImage.scale = new Vector(0.3, 0.3)
        hostage.graphics.use(hostageImage);
        this.add(hostage)
    }

    createEventBlock(x, y, name, line) {
        // const line = 'save me';
        const eventBlock = new EventBlock(x, y, name, line);
        this.add(eventBlock)
    }

    createCage(x, y) {
        const cage = new Cage(x, y)
        this.add(cage)
    }

    createFire(){
        const fire = new Fire(1000,400);
        this.add(fire)
    }
    

    // addPoint() {
    //     this.score++;
    //     this.label.text = `Score: ${this.score}`;
    // }

    displayMessage(message) {
        this.messageLabel.text = message;
        this.messageLabel.visible = true;

        // Hide the message after 2 seconds
        this.engine.clock.schedule(() => {
            this.messageLabel.visible = false;
        }, 2000);
    }

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