import { Actor, Color, Vector, Label, CollisionType, Engine, FontUnit, FontStyle, TextAlign } from "excalibur";
import { Player } from './player.js';

export class Hostage extends Actor {
    constructor() {
        super({
            width: 50,
            height: 50,
            color: Color.Blue, // Hostage color
            collisionType: CollisionType.Fixed // Hostage is immovable
        });

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
        if (event.other instanceof Player) {
            this.kill();
            console.log("Collision with player started");
        }
    }
}