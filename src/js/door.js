import { Actor, Vector, CollisionType, Shape, Engine } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class DoorStart extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(.2, .2)
        });

        this.body.collisionType = CollisionType.Passive;
        this.graphics.use(Resources.Door.toSprite())

        const doorTouch = Shape.Box(225, 285, new Vector(.5, .5))
        this.collider.set(doorTouch)
        this.on('collisionstart', (event) => this.onCollisionStart(event));

        this.z = 1
        
    }

    onCollisionStart(event) {
        if (event.other instanceof Player) {
            console.log("Going to the next scene");
            this.scene.engine.goToScene('roomQ1')
        }
    }
}

export class DoorBoss extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(.2, .2)
        });

        this.body.collisionType = CollisionType.Passive;
        this.graphics.use(Resources.Door.toSprite())

        const doorTouch = Shape.Box(225, 285, new Vector(.5, .5))
        this.collider.set(doorTouch);
        this.on('collisionstart', (event) => this.onCollisionStart(event));

        this.z = 1
    }

    onCollisionStart(event) {
        if (event.other instanceof Player) {
            console.log("Going to the next scene");
            this.scene.engine.goToScene('boss')
        }
    }
}

export class Door1 extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(.2, .2),
        });

        this.body.collisionType = CollisionType.Passive;
        this.graphics.use(Resources.Door.toSprite());

        const doorTouch = Shape.Box(225, 285, new Vector(.5, .5));
        this.collider.set(doorTouch);
        this.on('collisionstart', (event) => this.onCollisionStart(event));

        this.z = 1
    }

    onCollisionStart(event) {
        if (event.other instanceof Player) {
            console.log("Going to the next scene");
            this.scene.engine.goToScene('hostageQ');
        }
    }
}

export class Door2 extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(.2, .2)
        });

        this.body.collisionType = CollisionType.Passive;
        this.graphics.use(Resources.Door.toSprite())

        const doorTouch = Shape.Box(225, 285, new Vector(.5, .5))
        this.collider.set(doorTouch);
        this.on('collisionstart', (event) => this.onCollisionStart(event));

        this.z = 1
    }

    onCollisionStart(event) {
        if (event.other instanceof Player) {
            console.log("Going to the next scene");
            this.scene.engine.goToScene('hostage2')
        }
    }
}

export class Door3 extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(.2, .2)
        });

        this.body.collisionType = CollisionType.Passive;
        this.graphics.use(Resources.Door.toSprite())

        const doorTouch = Shape.Box(225, 285, new Vector(.5, .5))
        this.collider.set(doorTouch);
        this.on('collisionstart', (event) => this.onCollisionStart(event));

        this.z = 1
    }

    onCollisionStart(event) {
        if (event.other instanceof Player) {
            console.log("Going to the next scene");
            this.scene.engine.goToScene('hostage3')
        }
    }
}

export class Door4 extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(.2, .2)
        });

        this.body.collisionType = CollisionType.Passive;
        this.graphics.use(Resources.Door.toSprite())

        const doorTouch = Shape.Box(225, 285, new Vector(.5, .5))
        this.collider.set(doorTouch);
        this.on('collisionstart', (event) => this.onCollisionStart(event));
        
        this.z = 1
    }

    onCollisionStart(event) {
        if (event.other instanceof Player) {
            console.log("Going to the next scene");
            this.scene.engine.goToScene('roomQ1')
        }
    }
}