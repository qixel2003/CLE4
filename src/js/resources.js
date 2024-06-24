import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/mc_front.png'),
    Player1: new ImageSource('images/mc_sheet.png'),
    EnemyMelee: new ImageSource('images/Melee_Enemy_Sprite.png'),
    EnemyRanged: new ImageSource('images/Ranged_Enemy_Sprite.png'),
    MeleeAttack: new ImageSource('images/melee_attack.png'), // Add your melee attack sprite
    Fire: new ImageSource('images/fire.png'),
    Cage: new ImageSource('images/cage.png'),
    Noordpleinlicht: new ImageSource('images/noordlicht.png'),
    Lichten: new ImageSource('images/lichten.png'),
    Ginger: new ImageSource('images/hostage1.png'),

    //Powerups
    AttackBoost: new ImageSource('images/powerAttack.png'),
    DefenceBoost: new ImageSource('images/powerDefense.png'),
    SpeedBoost: new ImageSource('images/powerSpeed.png'),
    //Main Menu Image
    MainMenu: new ImageSource('images/mainmenu.png'),
    HostageMapQuinten: new ImageSource('images/mapspritequinten.jpg'),
    BossRoom: new ImageSource('images/map_boss.png'),

    Fontein: new ImageSource('images/fontein.png'),
    Tree: new ImageSource('images/tree.png'),
    Lantern: new ImageSource('images/lantern.png'),
    Cage: new ImageSource('images/cage.png'),

    //Hostages
    HostageQuinten: new ImageSource('images/hostage4.png'),
};





const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }