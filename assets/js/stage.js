import { app } from './main.js';
import { createControlPanel } from './control_panel.js';
import { createFormIntro } from './form_intro.js';
import { createFormGameOver } from './form_gameover.js';
import { createFormLeaderBoard } from './form_leaderboard.js';

export let containerSetup;

export function setup() {
    containerSetup = new PIXI.Container()

    const mountain = PIXI.Texture.from("assets/image/Environment/back_rocks.png");
    const srtaticMountains = new PIXI.Sprite(mountain);
    srtaticMountains.y = 150;
   
    const dinamicMountains = new PIXI.TilingSprite(mountain, app.screen.width, app.screen.height / 2);
    dinamicMountains.tileScale.set(0.5);
    dinamicMountains.y = app.screen.height - dinamicMountains.height;

    const ice = PIXI.Texture.from("assets/image/Environment/floor.png");
    const iceFloor = new PIXI.TilingSprite(ice, app.screen.width, app.screen.height - app.screen.height * 0.9);
    iceFloor.y = app.screen.height - iceFloor.height;

    const sunTexture = PIXI.Texture.from("assets/image/Environment/bg_sun.png");
    const sunSprite = new PIXI.Sprite(sunTexture);
    sunSprite.width = 215;
    sunSprite.height = 215;

    const airshipSprite = PIXI.Sprite.from("assets/image/Environment/airship.png");
    airshipSprite.height = 90;
    airshipSprite.width = 174;
    airshipSprite.position.set(10, 150);

    const treeOne = PIXI.Texture.from("assets/image/Environment/tree_1.png");
    const treeOneSprite = new PIXI.Sprite(treeOne);
    treeOneSprite.height = 160;
    treeOneSprite.width = 148;
    treeOneSprite.position.set(20, app.screen.height - treeOneSprite.height * 1.3);

    const treeTwo = PIXI.Texture.from("assets/image/Environment/tree_2.png");
    const treeTwoSprite = new PIXI.Sprite(treeTwo);
    treeTwoSprite.height = 104;
    treeTwoSprite.width = 112;
    treeTwoSprite.position.set(app.screen.width - treeTwoSprite.width * 1.5, app.screen.height - treeTwoSprite.height * 1.5);

    const treeThreeSprite = new PIXI.Sprite(treeTwo);
    treeThreeSprite.height = 104;
    treeThreeSprite.width = 112;
    treeThreeSprite.position.set(100, app.screen.height - treeThreeSprite.height * 1.45);

    const bunnySprite = PIXI.Sprite.from("assets/image/Characters/mi_bunny_idle_03.png");
    bunnySprite.height = 150;
    bunnySprite.width = 150;
    bunnySprite.position.set(250, app.screen.height - bunnySprite.height * 1.23);
    containerSetup.addChild(
        srtaticMountains,
        dinamicMountains,
        iceFloor,
        sunSprite,
        airshipSprite,
        treeOneSprite,
        treeTwoSprite,
        treeThreeSprite,
        bunnySprite);
    app.stage.addChild(containerSetup);
    createControlPanel();
    createFormIntro();
    createFormGameOver();
    createFormLeaderBoard();
}
