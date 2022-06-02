import { app } from './main.js';
import { FontStyle } from './font_style.js';
import { containerFormLeaderBoard } from './form_leaderboard.js';
import { createButtonOk, showLinesTable } from './functions.js';
import { variable } from './variables.js';

export let containerFormGameOver;
export let textCoinFormGameOver;
export let textDistanceFormGameOver;
export let textRecordFormGameOver;

export function createFormGameOver() {
    containerFormGameOver = new PIXI.Container();
    app.stage.addChild(containerFormGameOver);
    containerFormGameOver.x = app.screen.width / 2;
    containerFormGameOver.y = app.screen.height / 2;
    containerFormGameOver.visible = false;

    //лучи
    const rays = PIXI.Sprite.from('assets/image/UI/rays.png');
    containerFormGameOver.addChild(rays);
    rays.anchor.set(0.5);
    rays.scale.set(0.6);
    app.ticker.add(() => {
        rays.rotation += 0.01;
    });

    //звезды
    const arrayStars = [];
    for (let i = 0; i < 8; i++) {
        arrayStars[i] = PIXI.Sprite.from('assets/image/UI/star.png');
        containerFormGameOver.addChild(arrayStars[i]);
        arrayStars[i].anchor.set(0.5, 0.5);
    }

    arrayStars[0].position.set(-340, 240);
    arrayStars[0].scale.set(0.65);
    arrayStars[1].position.set(330, 235);
    arrayStars[1].scale.set(0.6);
    arrayStars[2].position.set(-410, 80);
    arrayStars[2].scale.set(0.9);
    arrayStars[3].position.set(360, 90);
    arrayStars[3].scale.set(0.55);
    arrayStars[4].position.set(-370, -80);
    arrayStars[4].scale.set(0.5)
    arrayStars[5].position.set(370, -80);
    arrayStars[5].scale.set(1);
    arrayStars[6].position.set(-345, -220);
    arrayStars[6].scale.set(0.65);
    arrayStars[7].position.set(320, -230);
    arrayStars[7].scale.set(0.6);

    let radian = 0;
    app.ticker.add(() => {
        radian += 0.02;
        const value = Math.cos(radian);
        for (let i = 0; i < arrayStars.length; i++) {
            ((i + 1) % 2) ? arrayStars[i].rotation = - value * 0.3 : arrayStars[i].rotation = value * 0.3;
        }
    });

    //фома
    const formGameOver = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
    formGameOver.scale.set(0.67);
    containerFormGameOver.addChild(formGameOver);
    formGameOver.anchor.set(0.5);

    //header
    const headerFormGameOver = PIXI.Sprite.from('assets/image/UI/header_info_plate.png');
    headerFormGameOver.anchor.set(0.5);
    headerFormGameOver.y = -407;
    formGameOver.addChild(headerFormGameOver);

    const textHeaderFormGameOver = new PIXI.Text("Твои рекорды:", new FontStyle("#003D71"));
    textHeaderFormGameOver.anchor.set(0.5);
    textHeaderFormGameOver.y = -10;
    headerFormGameOver.addChild(textHeaderFormGameOver);

    //очки
    textRecordFormGameOver = new PIXI.Text(variable.score, new FontStyle("#00FD17", 175, undefined, true));
    textRecordFormGameOver.anchor.set(0.5);
    textRecordFormGameOver.y = -250;
    formGameOver.addChild(textRecordFormGameOver);

    //кнопка "OK"
    let buttonOkFormGameOver = createButtonOk()
    formGameOver.addChild(buttonOkFormGameOver);
    buttonOkFormGameOver.on('pointerdown', onButtonOkPressGameOver)
    function onButtonOkPressGameOver() {
        const buttonOkPress = PIXI.Texture.from('assets/image/UI/ok_button_press.png');
        this.isdown = true;
        this.texture = buttonOkPress;
        containerFormGameOver.visible = false;
        containerFormLeaderBoard.visible = true;
        showLinesTable();
    }

    const resultContainer = new PIXI.Container();
    resultContainer.x = formGameOver.width;
    //монеты
    const coinIconGameOver = PIXI.Sprite.from("assets/image/UI/collect_coin_icon.png");
    textCoinFormGameOver = new PIXI.Text(variable.coin, new FontStyle("#F4AD25", 100, undefined, true));
    resultContainer.addChild(coinIconGameOver, textCoinFormGameOver);
    formGameOver.addChild(resultContainer);
    resultContainer.position.set(-275, -115);
    textCoinFormGameOver.x = 280;
    textCoinFormGameOver.x = (resultContainer.width - textCoinFormGameOver.width) / 2 + 100;

    //дистанция
    const distanceIconGameOver = PIXI.Sprite.from("assets/image/UI/collect_distance_icon.png");
    textDistanceFormGameOver = new PIXI.Text(variable.distance + " м", new FontStyle("#9AC6FF", 100, undefined, true));
    textDistanceFormGameOver.x = (resultContainer.width - textDistanceFormGameOver.width) / 2 + 150;
    resultContainer.addChild(distanceIconGameOver, textDistanceFormGameOver);
    distanceIconGameOver.x = -15;
    distanceIconGameOver.y = 165;
    textDistanceFormGameOver.y = 165;

}