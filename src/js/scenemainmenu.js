import { Scene, Actor, Engine, Vector, Color, Keys, } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js'; // Assuming Resources is where your images are

export class MainMenu extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        // Assuming you have a full-screen image in your Resources class
        const backgroundImage = Resources.MainMenu.toSprite();

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
    }

    onActivate() {
        this.engine.input.keyboard.off("click");

        this.engine.input.keyboard.on("press", (event) => {
            if(event.key === Keys.Space) {
                this.engine.goToScene();
            }
        })
    }
}