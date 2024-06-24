import { Actor, Color, Vector, Label, CollisionType, Engine, FontUnit, FontStyle, TextAlign } from "excalibur";
import { Player } from './player.js';

export class EventBlock extends Actor {
    constructor(x, y, name, line) {
        super({
            width: 50,
            height: 50,
            color: Color.Blue, // Block color
            collisionType: CollisionType.Passive // Block is immovable
        });

        this.tag = name;
        this.text = line;
        this.pos= new Vector(x,y);
    }

    onInitialize(engine) {
        // Create a label and configure its appearance
        const label = new Label({
            text: this.tag,
            pos: new Vector(-25, -this.height / 2 - 20), // Position above the actor
            color: Color.White,
            fontSize: 20, // Font size in pixels
            fontUnit: FontUnit.Px,
            fontStyle: FontStyle.Normal,
            textAlign: TextAlign.Center // Center align the text
        });

        // Add the label as a child of the hostage
        this.addChild(label);

        this.on('collisionstart', (event) => {
            if (event.other instanceof Player) {
                engine.currentScene.displayMessage(this.text); // Call the method to display the message
                engine.currentScene.createFire(); // Call the method to start the fire

            }
        });
    }

    
}