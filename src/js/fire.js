import { Actor, Color, Vector, Label, CollisionType, Engine, FontUnit, FontStyle, TextAlign } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Hostage } from "./hostage.js";
import { Cage } from "./cage.js";

export class Fire extends Actor {
    constructor(x,y) {
        super({
            width: 50,
            height: 50,
            anchor: new Vector(0.5, 0.3),
            pos: new Vector(x, y),
            collisionType: CollisionType.Passive, // Define the collision type
            z: 4
        });

        this.graphics.use(Resources.Fire.toSprite())


        this.text = "Help me!!!";

        this.on('collisionstart', (event) => this.onCollisionStart(event));

    }

    onInitialize(engine) {
        // Create a label and configure its appearance
        const label = new Label({
            text: this.text,
            pos: new Vector(-25, -this.height / 2 - 20), // Position above the actor
            color: Color.White,
            fontSize: 20, // Font size in pixels
            fontUnit: FontUnit.Px,
            fontStyle: FontStyle.Normal,
            textAlign: TextAlign.Center // Center align the text
        });

        // Add the label as a child of the hostage
        this.addChild(label);
    }

    onCollisionStart(event) {
        if (event.other instanceof Hostage || event.other instanceof Cage) {
            event.other.kill();
            console.log("Collision with player started");
        }
    }
}