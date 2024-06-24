import '../css/style.css';
import { Actor, Engine, Vector, Color, Label, FontUnit, Font, BoundingBox, SolverStrategy, Scene } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Room1 extends Scene {
    onInitialize(engine) {
        this.startLevel();
    }

    onActivate(ctx) {
        console.log("reset the level");
        this.resetGame();
        this.startLevel(); // Re-initialize the level
    }

    startLevel() {
        
    }

    onPreUpdate(engine) {
        // Add any necessary updates per frame here
    }

    

    resetGame() {
        // Clear all existing actors
        this.actors.forEach(actor => {
            this.remove(actor);
        });
    }
}
new Room1