import { app } from '../index.js';
import FontStyle from './font_style.js';
import { variable } from './variables.js';
import { containerSetup } from './stage.js';
import { amountOfCoin } from './control_panel.js';
import { containerFormGameOver, textRecordFormGameOver, textCoinFormGameOver, textDistanceFormGameOver } from './form_gameover.js';
import { textRecord } from './form_intro.js';
export let ticker;

export function game() {
    let childrenConteinerSetup = containerSetup.children;
    let arrayCoin = [];

    for (let i = 0; i < 5; i++) {
        arrayCoin.push(PIXI.Sprite.from('assets/image/Environment/coin.png'));
        arrayCoin[i].width = 50;
        arrayCoin[i].height = 45;
        arrayCoin[i].position.set(app.screen.width - arrayCoin[i].width + i * 250, app.screen.height - arrayCoin[i].height - 75);
        app.stage.addChild(arrayCoin[i]);
    }

    //Текст в игровоёй сессии 
    const textGameProcess = new PIXI.Text("Game session in progress!", new FontStyle("#CC1222", 80, undefined, true))
    textGameProcess.visible = false;
    textGameProcess.position.set(app.screen.width / 2, app.screen.height / 2 - textGameProcess.height / 2);
    textGameProcess.visible = true;
    textGameProcess.anchor.set(0.5);
    ticker = PIXI.Ticker.shared;
    ticker.start();
    app.stage.addChild(textGameProcess);

    let fontSize = 0; // для работы с высотой и длинной текста игровой сессии

    ticker.add(() => {
        fontSize += 0.015;
        textGameProcess.scale.x = Math.sin(fontSize);
        textGameProcess.scale.y = 2 - Math.cos(fontSize);
        childrenConteinerSetup[1].tilePosition.x -= 0.1;
        childrenConteinerSetup[2].tilePosition.x -= 2;
        childrenConteinerSetup[3].position.x -= 5;
        childrenConteinerSetup[4].position.x += 1;
        childrenConteinerSetup[5].position.x -= 2;
        childrenConteinerSetup[6].position.x -= 6;
        childrenConteinerSetup[7].position.x -= 4;

        for (let index in arrayCoin) {
            arrayCoin[index].position.x -= 5;
            if (arrayCoin[index].x == childrenConteinerSetup[8].x + childrenConteinerSetup[8].width / 2) {
                arrayCoin[index].visible = false;
                variable.coin += 100;
                variable.distance += index * 3;
                variable.score += index * 5;
                amountOfCoin.text = variable.coin;
            }
        }
        moveSprite();
        function moveSprite() {
            for (let sprite of childrenConteinerSetup) {
                if (sprite.position.x == Math.round(-sprite.width)) {
                    sprite.position.x = app.screen.width;
                }
            }
        }
    })

    setTimeout(() => {
        textCoinFormGameOver.text = variable.coin;
        textDistanceFormGameOver.text = variable.distance + " м";
        textRecordFormGameOver.text = variable.score;
        if (variable.recordScore < variable.score) {
            variable.recordScore = variable.score;
        }
        textRecord.text = variable.recordScore;
        variable.coin = 600;
        variable.distance = 0;
        variable.score = 0;
        containerFormGameOver.visible = true;
        textGameProcess.visible = false;
        ticker.stop();
    }, 10000);
}