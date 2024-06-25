import { Scene, Actor, Engine, Vector, Color } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js'; // Assuming Resources is where your images are
import { Boss } from './boss.js';
import { Player } from './player.js';
import { DoorStart, Door1, Door3 } from './door.js';
import { UI } from './ui.js';


export class BossRoom extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        // Assuming you have a full-screen image in your Resources class
        const backgroundImage = Resources.BossRoom.toSprite();

        // Create an Actor to hold the image
        const backgroundActor = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2), // Center the image
            width: 1280,
            height: 720,
            anchor: new Vector(0.5, 0.5) // Center the anchor point
        });

        // Scale the sprite to cover the entire screen
        const scaleX = engine.drawWidth / backgroundImage.width;
        const scaleY = engine.drawHeight / backgroundImage.height;

        // Use the larger scale factor to maintain the aspect ratio and cover the screen
        const scaleFactor = Math.max(scaleX, scaleY);

        backgroundImage.scale = new Vector(scaleFactor, scaleFactor);

        // Assign the sprite to the actor's graphics
        backgroundActor.graphics.use(backgroundImage);

        // Add the actor to the scene
        this.add(backgroundActor);

        const boss = new Boss(400, 600);
        this.add(boss)

        const player = new Player(10, 2, 20, false);
        this.add(player)

        const playerUI = new UI(player)
        this.add(playerUI)

        const door = new DoorStart(600, 690);
        this.add(door)

        const doorHostageQ = new Door1(25, 375);
        this.add(doorHostageQ)

        const doorHostage3 = new Door3(1180, 375);
        this.add(doorHostage3)
    }
}