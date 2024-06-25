import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Hostage } from './hostage';

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/mc_front.png'),
    Player1: new ImageSource('images/mc_sheet.png'),
    EnemyMelee: new ImageSource('images/Melee_Enemy_Sprite.png'),
    EnemyRanged: new ImageSource('images/Ranged_Enemy_Sprite.png'),
    Boss: new ImageSource('images/Crab_final_boss.png'),

    MeleeAttack: new ImageSource('images/melee_attack.png'), // Add your melee attack sprite

    //Powerups
    AttackBoost: new ImageSource('images/powerAttack.png'),
    DefenceBoost: new ImageSource('images/powerDefense.png'),
    SpeedBoost: new ImageSource('images/powerSpeed.png'),
    
    //Main Menu Image
    MainMenu: new ImageSource('images/mainmenu.png'),
    HostageMapQuinten: new ImageSource('images/mapspritequinten.jpg'),
    BossRoom: new ImageSource('images/map_boss.png'),
    HostageRoom2: new ImageSource('images/mapspritehostage2.jpg'),
    MapStage: new ImageSource('images/map_stage1.png'),

    //Assets
    Fontein: new ImageSource('images/fontein.png'),
    Tree: new ImageSource('images/tree.png'),
    Lantern: new ImageSource('images/lantern.png'),
    Cage: new ImageSource('images/cage.png'),
    Fire: new ImageSource('images/fire.png'),
    Door: new ImageSource('images/open_door.png'),

    //Hostages
    Hostage1: new ImageSource('images/hostage1.png'),
    HostageQuinten: new ImageSource('images/hostage4.png'),
    Hostage2: new ImageSource('images/hostage2.png'),
    Hostage3: new ImageSource('images/hostage3.png')
};





const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }