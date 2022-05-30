
//? НЕ ЗАБЫТЬ!!!
//TODO подключить шрифт из CSS , разобраться с выводм лидерборда(пушить в массив а потом выводить или каждый раз вызывать create)
export {FontStyle} 
import {setup} from './functions.js'
 let gamePlace = document.getElementById("gamePlace");
export const app = new PIXI.Application({
    width: 1280,
    height: 640,
    backgroundColor: 0X6F9ACA,
    resolution: window.devicePixelRatio || 1,
});
app.stage.sortableChildren = true;
app.renderer.autoResize = true;
app.stage.interactive = true;
app.stage.cursor = "pointer";
gamePlace.appendChild(app.view);

app.loader.add({ name: 'Zubilo', url: 'assets/fonts/Zubilo.otf' });
app.loader.load(() => {
 class FontStyle {
        constructor(fill, fontSize = 60, fontFamily = 'Zubilo', dropShadow = false,) {
            this.fill = fill;
            this.fontSize = fontSize;
            this.fontFamily = fontFamily;
            this.dropShadow = dropShadow;
            this.dropShadowColor = '#003c76';
            this.dropShadowBlur = 5;
            this.dropShadowDistance = 10;
            this.dropShadowAngle = -4.8;
            this.padding = 20;
            this.align = "center";
        }
    }
}
)


// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.resize(window.innerWidth, window.innerHeight);

setup();


//console.log("Данные 0 : " + app.screen.width) //<--------------------------------------считалка
