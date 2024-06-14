import { Actor, Color, Vector, Input } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'

export class Player extends Actor {
    constructor() {
        super({
            pos: new Vector(400, 300), // initial position
            width: 50,
            height: 50,
            color: Color.Red, // initial color
        })
    }

// Update function to handle player movement
onPreUpdate(engine) {
    let speed = 200;
     let vel = Vector.Zero  
     // Check for keyboard inputs
     if (engine.input.keyboard.isHeld(Input.Keys.W)) {
         vel = vel.add(new Vector(0, -1));
     }
     if (engine.input.keyboard.isHeld(Input.Keys.S)) {
         vel = vel.add(new Vector(0, 1));
     }
     if (engine.input.keyboard.isHeld(Input.Keys.A)) {
         vel = vel.add(new Vector(-1, 0));
     }
     if (engine.input.keyboard.isHeld(Input.Keys.D)) {
         vel = vel.add(new Vector(1, 0));
     }
    
     // Normalize velocity vector to prevent faster diagonal movement
     if (!vel.equals(Vector.Zero)) {
         vel = vel.normalize().scale(speed);
     }
     // Apply velocity to the player
     this.vel = vel;
    } 
} 
