//? НЕ ЗАБЫТЬ!!!
//TODO шрифт, разобраться с выводм лидерборда(пушить в массив а потом выводить или каждый раз вызывать create)
import { setup } from './functions.js'
let _width = 1280;
let _height = 640;
let gamePlace = document.getElementById("gamePlace");
export const app = new PIXI.Application({
    width: _width,
    height: _height,
    backgroundColor: 0X6F9ACA,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
});
app.stage.sortableChildren = true;
app.renderer.autoResize = true;
app.stage.interactive = true;
app.stage.cursor = "pointer";
gamePlace.appendChild(app.view);
setup();
//console.log("Данные 0 : " + app.screen.width) //<--------------------------------------считалка
