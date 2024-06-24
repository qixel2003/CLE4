import '../css/style.css'
import { ScreenElement, Label, Vector, Font, FontUnit } from 'excalibur';

export class UI extends ScreenElement {
    constructor(player) {
        super();
        this.player = player; // Store the player actor reference
    }

    onInitialize(engine) {

        // Create a label for the player health
        this.healthLabel = new Label({
            text: `Health: ${this.player.health}`, // Use the player's health
            pos: new Vector(10, 10), // Position it below the score
            z: 9,
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px
            })
        });

        // Add labels as children to the UI
        this.addChild(this.healthLabel);

        // Initialize with the current score and health
        this.updateHealth();
    }

    onPreUpdate() {
        this.updateHealth();
    }

    updateScore() {
        // Update the score label text
        this.scoreLabel.text = `Score: ${this.scene.score}`;
    }

    updateHealth() {
        // Update the health label text with the current player's health
        this.healthLabel.text = `Health: ${this.player.health}`;
    }
}
