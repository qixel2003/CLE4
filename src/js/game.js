import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, SolverStrategy, BoundingBox} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Hostage } from './hostage.js'
import { Enemy } from './enemy.js'
import { Enemy2 } from './enemy2.js'
import { Powerup } from './powerup.js'
import { MainMenu } from './scenemainmenu.js'
import { HostageQuinten } from './scenehostagequinten.js'
import { Boss } from './boss.js'
import { RoomQ1 } from './roomQ1.js'
import { Room1 } from './room1.js'



import { BossRoom } from './sceneBossRoom.js'
import { Hostage2 } from './scenehostage2.js'
import { Hostage3 } from './scenehostage3.js'

// import { Level } from './room1.js'
// import { Level2 } from './room2.js'
// import { GameOver } from './game_over.js'
// import { LevelClear } from './levelclear.js'
// import { Intro } from './intro.js'

const options = {
    width: 1200, height: 720, maxFps:60,
    backgroundColor: Color.Black,
    displayMode: DisplayMode.FitScreen,
    physics: {
        // solver: SolverStrategy.Realistic,
        // gravity: new Vector(0, 800),
    }
}

export class Game extends Engine {

    constructor() {
        super(options)
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        // this.add('intro', new Intro())
        this.add('room1', new Room1())
        // this.add('room2', new Room2())
        this.add('roomQ1', new RoomQ1())
        // this.add('boss', new Boss())
        // this.add('gameover', new GameOver())
        // this.add('levelclear', new LevelClear())
        // this.goToScene('intro')
        // this.goToScene('room1')
        // this.goToScene('roomQ1')


        // this.add('hostageQ', new HostageQuinten())
        // this.goToScene('hostageQ')
        // this.add('boss', new BossRoom())
        // this.goToScene('boss')
        // this.add('hostage2', new Hostage2())
        // this.goToScene('hostage2')
        this.add('hostage3', new Hostage3())
        this.goToScene('hostage3')

        
        //Player heeft nodig: health, attack, defence en rangedAttack unlock.
        const player = new Player(10, 2, 20, false);
        this.add(player)
        // Camera setup
        if (this.currentScene.camera) {
            // Lock camera to player
            this.currentScene.camera.strategy.lockToActor(player);

            // Limit camera bounds
            this.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 2000, 1200));

        //     console.log('Camera strategy applied successfully.');
        // } else {
        //     console.error('Error: Camera not found in current scene.');
        // }
        // const boss = new Boss();
        // this.add(boss);

        // const hostage = new Hostage(new Vector(400, 500))
        // this.add(hostage)

            console.log('Camera strategy applied successfully.');
        } else {
            console.error('Error: Camera not found in current scene.');
        }
        const hostage = new Hostage(new Vector(400, 500))
        this.add(hostage)
        // const meleeEnemy= new Enemy(600,700,1)
        // this.add(meleeEnemy)

        // const rangedEnemy = new Enemy2(400, 700, 1)
        // this.add(rangedEnemy)
        var attackBoost = new Powerup(200, 100, 'attack', 5000); // Attack boost, 5 seconds duration
        var shield = new Powerup(300, 100, 'shield', 5000); // Shield, 5 seconds duration
        var speedBoost = new Powerup(400, 100, 'speed', 5000); // Speed boost, 5 seconds duration
        this.add(attackBoost);
        this.add(shield);
        this.add(speedBoost);

        const boss = new Boss
        this.add(boss)

        // const mainmenu = new MainMenu;
        // this.add(mainmenu)
    }
}

new Game()
