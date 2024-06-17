import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    //Main Character Sprites
    MCF: new ImageSource('images/mc_front.png'),
    MCB: new ImageSource('images/mc_back.png'),
    MCSR: new ImageSource('images/mc_side_right.png'),
    MCSL: new ImageSource('images/mc_side_left.png'),
    //Main Character Sprites End
    MeleeAttack: new ImageSource('images/melee_attack.png')
    Player: new ImageSource('images/mc_front.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }