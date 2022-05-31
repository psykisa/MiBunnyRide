//? НЕ ЗАБЫТЬ!!!
//TODO шрифт, разобраться с выводм лидерборда(пушить в массив а потом выводить или каждый раз вызывать create)
 let _width = 1280;
 let _height = 640;
import {setup} from './functions.js'
 let gamePlace = document.getElementById("gamePlace");
export const app = new PIXI.Application({
    width: _width,
    height: _height,
    backgroundColor: 0X6F9ACA,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
});

window.addEventListener('resize', resize);
function resize(){
    _width = window.innerWidth;
    _height = window.innerHeight;
    app.resize(_width, _height);
}
app.stage.sortableChildren = true;
app.renderer.autoResize = true;
app.stage.interactive = true;
app.stage.cursor = "pointer";
app.loader.add({ name: 'Zubilo', url: 'assets/fonts/Zubilo.otf' });
gamePlace.appendChild(app.view);

// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.resize(window.innerWidth, window.innerHeight);
setup();
//console.log("Данные 0 : " + app.screen.width) //<--------------------------------------считалка
