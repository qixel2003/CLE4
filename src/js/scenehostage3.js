import { Scene, Actor, Engine, Vector, Color, CollisionType, ImageSource } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js'; // Assuming Resources is where your images are
import { Player } from './player.js';
import { Hostage } from './hostage.js';
import { Enemy } from './enemy.js'
import { Enemy2 } from './enemy2.js'
import { UI } from './ui.js';

export class Hostage3 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        // Assuming you have a full-screen image in your Resources class
        const backgroundImage = Resources.HostageMapQuinten.toSprite();

        // Create an Actor to hold the image
        const backgroundActor = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2), // Center the image
            width: backgroundImage.width,
            height: backgroundImage.height,
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

        const player = new Player(10, 2, 20, false);
        this.add(player)
        player.vel = Vector.Zero

        const playerUI = new UI(player)
        this.add(playerUI)

        const tree = new Actor({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            pos: new Vector(150, 200),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        const treeImage = Resources.Tree.toSprite();
        tree.graphics.use(treeImage);
        this.add(tree);

        const tree2 = new Actor({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            pos: new Vector(500, 200),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        tree2.graphics.use(treeImage);
        this.add(tree2);

        const tree3 = new Actor({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            pos: new Vector(325, 700),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        tree3.graphics.use(treeImage);
        this.add(tree3);

        const tree4 = new Actor({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            pos: new Vector(700, 700),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        tree4.graphics.use(treeImage);
        this.add(tree4);

        const lantern1 = new Actor({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            pos: new Vector(1000, 200),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        const lantern2 = new Actor({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            pos: new Vector(1000, 550),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        const lanternImage = Resources.Lantern.toSprite();
        lanternImage.scale = new Vector(0.7, 0.7);
        lantern1.graphics.use(lanternImage);
        lantern2.graphics.use(lanternImage);
        this.add(lantern1);
        this.add(lantern2);

        const hostage = new Hostage({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            collisionType: CollisionType.Fixed, // Define the collision type
            z: 3
        })
        hostage.pos = new Vector(400, 400)
        const hostageImage = Resources.Hostage3.toSprite();
        hostageImage.scale = new Vector(0.3, 0.3)
        hostage.graphics.use(hostageImage);
        this.add(hostage)

        const cage = new Actor({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.8),
            pos: new Vector(400, 450),
            collisionType: CollisionType.Passive, // Define the collision type
            z: 4
        })
        const cageImage = Resources.Cage.toSprite();
        cageImage.scale = new Vector(1.3, 1.3)
        cage.graphics.use(cageImage);
        this.add(cage)

        const meleeEnemy = new Enemy(600, 700, 1)
        this.add(meleeEnemy)
        const rangedEnemy = new Enemy2(400, 700, 1)
        this.add(rangedEnemy)
    }
}