
//? НЕ ЗАБЫТЬ!!!
//TODO Сделать расширение экрана, подключить шрифт из CSS , разобраться с выводм лидерборда(пушить в массив а потом выводить или каждый раз вызывать create)

import {setup} from './functions.js'
let gamePlace = document.getElementById("gamePlace");
let game = gamePlace.querySelector("div");
/*game.style.overflow = "hidden";*/
export const app = new PIXI.Application({
    width: 1280,
    height: 640,
    backgroundColor: 0X6F9ACA,
    resolution: window.devicePixelRatio || 1,
});
app.stage.sortableChildren = true;
app.stage.interactive = true;
app.stage.cursor = "pointer";
game.appendChild(app.view);

setup();

//console.log("Данные 0 : " + Math.round(-treeThreeSprite.width)) //<--------------------------------------считалка
