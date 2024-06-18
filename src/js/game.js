import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Hostage } from './hostage.js'

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

        //Player heeft nodig: health, attack, defence en rangedAttack unlock.
        const player = new Player(100, 20, 20, false);
        this.add(player)
        const hostage = new Hostage(new Vector(400, 500))
        this.add(hostage)
    }

}

new Game()
