import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Hostage } from './hostage.js'
import { Enemy } from './enemy.js'
import { Enemy2 } from './enemy2.js'
import { Powerup } from './powerup.js'
import { MainMenu } from './scenemainmenu.js'
import { HostageQuinten } from './scenehostagequinten.js'

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
        // this.add('room1', new Room1())
        // this.add('room2', new Room2())
        // this.add('gameover', new GameOver())
        // this.add('levelclear', new LevelClear())
        // this.goToScene('intro')
        // this.goToScene('room1')

        this.add('hostageQ', new HostageQuinten())
        this.goToScene('hostageQ')

        
        //Player heeft nodig: health, attack, defence en rangedAttack unlock.
        const player = new Player(10, 2, 20, false);
        this.add(player)
        const hostage = new Hostage(new Vector(400, 500))
        this.add(hostage)
        const meleeEnemy= new Enemy(600,700,1)
        this.add(meleeEnemy)
        const rangedEnemy = new Enemy2(400, 700, 1)
        this.add(rangedEnemy)
        var attackBoost = new Powerup(200, 100, 'attack', 5000); // Attack boost, 5 seconds duration
        var shield = new Powerup(300, 100, 'shield', 5000); // Shield, 5 seconds duration
        var speedBoost = new Powerup(400, 100, 'speed', 5000); // Speed boost, 5 seconds duration
        this.add(attackBoost);
        this.add(shield);
        this.add(speedBoost);

        const mainmenu = new MainMenu;
        this.add(mainmenu)
    }

}

new Game()
