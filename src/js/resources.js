import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/mc_front.png'),
    Player1: new ImageSource('images/mc_sheet.png'),
    MeleeAttack: new ImageSource('images/melee_attack.png') // Add your melee attack sprite
};





const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }