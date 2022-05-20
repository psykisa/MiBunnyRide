// import { FontStyle } from './font_style.js'
import { background, createControlPanel, crateFormIntro } from './functions.js'

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


// console.log("Ширина M = " + mask.width);
// console.log("Высота M = " + mask.height);
// console.log("Данные : " + mask.parent);

background();
createControlPanel();
crateFormIntro();
//----- Шапка ----------------------------------------------------------------------------//



/////////////////////////////////////////////////////////////////////////////////////////

//----- ФОРМЫ -------------------------------------------------------------------------//




//----- События панели управления -----//

//----- Cобытия форм -----//