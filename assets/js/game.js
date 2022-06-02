import { app } from './main.js';
import { FontStyle } from './font_style.js';
import { containerSetup } from './stage.js';
import { containerFormGameOver } from './form_gameover.js';
import { createFormLeaderBoard } from './form_leaderboard.js';

export let ticker;
export function game() {
    let childrenConteinerSetup = containerSetup.children;

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
        containerFormGameOver.visible = true;
        textGameProcess.visible = false;
        ticker.stop();
    }, 10000);
}