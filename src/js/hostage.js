import { Actor, Color, Vector, Label, CollisionType, Engine, FontUnit, FontStyle } from "excalibur";

export class Hostage extends Actor {
    constructor(position) {
        super({
            pos: position, // Position of the hostage
            width: 50,
            height: 50,
            color: Color.Blue, // Hostage color
            collisionType: CollisionType.Fixed // Hostage is immovable
        });

        this.text = "Hallo";
    }

    onInitialize(engine) {
        // Create a label for the text popup
        const label = new Label({
            text: this.text,
            pos: this.pos.add(new Vector(0, -this.height - 20)), // Position the label above the hostage
            color: Color.White,
            fontSize: 20,
            fontUnit: FontUnit.Px, // Use pixels for font size
            fontStyle: FontStyle.Normal,
            textAlign: 'center'
        });

        // Center the label above the hostage
        label.anchor = new Vector(0.5, 1); // Adjust anchor to center horizontally and place above

        // Add the label as a child of the hostage
        this.addChild(label);
    }
}