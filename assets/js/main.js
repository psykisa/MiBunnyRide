import { FontStyle } from './font_style.js'
import { background, createControlPanel, crateFormIntro, score, coin , distance} from './functions.js'

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
//----- ФОРМЫ -------------------------------------------------------------------------//
let conteinerFormGameOver = new PIXI.Container();
app.stage.addChild(conteinerFormGameOver);
conteinerFormGameOver.x = app.screen.width / 2;
conteinerFormGameOver.y = app.screen.height / 2;

conteinerFormGameOver.visible = true;


//лучи
const rays = PIXI.Sprite.from('assets/image/UI/rays.png');
conteinerFormGameOver.addChild(rays);
rays.anchor.set(0.5);
rays.scale.set(0.6);
app.ticker.add(() => {
    rays.rotation += 0.01 ;
});

//фома
const formGameOver = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
formGameOver.scale.set(0.67);
conteinerFormGameOver.addChild(formGameOver);
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
const textRecordFormGameOver = new PIXI.Text(score, new FontStyle("#00FD17", 175, undefined, true));
textRecordFormGameOver.anchor.set(0.5);
textRecordFormGameOver.y = -240;
formGameOver.addChild(textRecordFormGameOver);

//кнопка "OK"
const buttonOkActive = PIXI.Texture.from('assets/image/UI/ok_button_active.png');
const buttonOkPress = PIXI.Texture.from('assets/image/UI/ok_button_press.png');
const buttonOkHover = PIXI.Texture.from('assets/image/UI/ok_button_hover.png');
const buttonOk = new PIXI.Sprite(buttonOkActive);
buttonOk.anchor.set(0.5, -2.15);
buttonOk.interactive = true;
buttonOk
    .on('pointerdown', onButtonOkPress)
    .on('pointerup', onButtonOkUp)
    .on('pointerover', onButtonOkOver)
    .on('pointerout', onButtonOkOut);
formGameOver.addChild(buttonOk);
//----- События формы "Окончание игры" -----//
function onButtonOkPress() {
    this.isdown = true;
    this.texture = buttonOkPress;
}

function onButtonOkUp() {
    this.isdown = false;
    if (this.isOver)
        this.texture = buttonOkHover;
}

function onButtonOkOver() {
    this.isOver = true;
    this.texture = buttonOkHover;
}

function onButtonOkOut() {
    this.isOver = false;
    this.texture = buttonOkActive;
}


//----- События панели управления -----/
//----- Cобытия форм -----//