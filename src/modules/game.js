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
    let fontSize = 0; // для работы с высотой и длинной текста игровой сессии
    //Текст в игровоёй сессии 
    const textGameProcess = new PIXI.Text("Game session in progress!", new FontStyle("#CC1222", 80, undefined, true))
    textGameProcess.visible = false;
    textGameProcess.position.set(app.screen.width / 2, app.screen.height / 2 - textGameProcess.height / 2);
    textGameProcess.visible = true;
    textGameProcess.anchor.set(0.5);

    document.addEventListener("pointerdown", pointerDown)
    document.addEventListener("keydown", (event) => {
        if (event.keyCode == 32) {
            jumpBunny();
        }
    });

    //массив монеток
    for (let i = 0; i < 5; i++) {
        arrayCoin.push(PIXI.Sprite.from('assets/image/Environment/coin.png'));
        arrayCoin[i].width = 50;
        arrayCoin[i].height = 45;
        arrayCoin[i].position.set(app.screen.width - arrayCoin[i].width + i * 250, app.screen.height - arrayCoin[i].height - 75);
        app.stage.addChild(arrayCoin[i]);
    }

    ticker = PIXI.Ticker.shared;
    ticker.start();
    app.stage.addChild(textGameProcess);

    ticker.add(() => {
        fontSize += 0.015;
        textGameProcess.scale.x = Math.sin(fontSize);
        textGameProcess.scale.y = 2 - Math.cos(fontSize);
        childrenConteinerSetup[1].tilePosition.x -= 0.1;
        childrenConteinerSetup[2].tilePosition.x -= 6;
        childrenConteinerSetup[3].position.x -= 5;
        childrenConteinerSetup[4].position.x += 1;
        childrenConteinerSetup[5].position.x -= 2;
        childrenConteinerSetup[6].position.x -= 6;
        childrenConteinerSetup[7].position.x -= 4;

        for (let index in arrayCoin) {
            arrayCoin[index].position.x -= 5;
         if (arrayCoin[index].x == childrenConteinerSetup[8].x + childrenConteinerSetup[8].width / 2) {
                arrayCoin[index].visible = false;
                variable.coin += 1;
                variable.distance += index * 3;
                variable.score += index * 5;
                amountOfCoin.text = variable.coin;
            }
        }
        moveSprite();
    })

    setTimeout(() => {
        document.removeEventListener("pointerdown", pointerDown)
        textCoinFormGameOver.text = variable.coin;
        textDistanceFormGameOver.text = variable.distance + " м";
        textRecordFormGameOver.text = variable.score;
        if (variable.recordScore < variable.score) {
            variable.recordScore = variable.score;
        }
        textRecord.text = variable.recordScore;
        variable.coin = 0;
        variable.distance = 0;
        variable.score = 0;
        containerFormGameOver.visible = true;
        textGameProcess.visible = false;
        ticker.stop();
    }, 10000);

    function moveSprite() {
        for (let sprite of childrenConteinerSetup) {
            if (sprite.position.x == Math.round(-sprite.width)) {
                sprite.position.x = app.screen.width;
            }
        }
    }

    function jumpBunny() {
        if (childrenConteinerSetup[8].y < app.screen.height / 2) {
            return;
        }
        childrenConteinerSetup[8].y -= 150;
        setTimeout(() => {
            childrenConteinerSetup[8].y += 150;
        }, 300);
    }

    function pointerDown() {
        if (variable.clickPointer)
            jumpBunny();
        variable.clickPointer = true;
    }

    function hitTestRectangle(r1, r2) {

        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
      
        //hit will determine whether there's a collision
        hit = false;
      
        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;
      
        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;
      
        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;
      
        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;
      
        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
      
          //A collision might be occurring. Check for a collision on the y axis
          if (Math.abs(vy) < combinedHalfHeights) {
      
            //There's definitely a collision happening
            hit = true;
          } else {
      
            //There's no collision on the y axis
            hit = false;
          }
        } else {
      
          //There's no collision on the x axis
          hit = false;
        }
      
        //`hit` will be either `true` or `false`
        return hit;
      };
}
