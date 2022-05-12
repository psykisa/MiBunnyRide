/*
//форма интро
export const formIntro = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
formIntro.anchor.set(0.5);
formIntro.scale.set(0.6);
//container.addChild(formIntro);

//Font Style
class FontStyle extends PIXI.TextStyle {
    constructor(fill, fontSize = 60, fontFamily = 'Zubilo', dropShadow = false,) {
        super();
        this.fill = fill;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.dropShadow = dropShadow;
        this.dropShadowColor = '#000000';
        this.dropShadowBlur = 5;
        this.dropShadowDistance = 10;
        this.dropShadowAngle = -4.8;
        this.padding = 20;
        this.align = "center";
    }
}

//рекорды
let value = 55;
let textRecord = new PIXI.Text("Рекорд: " + value, new FontStyle("#00FD17", undefined, undefined, true) );
textRecord.anchor.set(0.5);
textRecord.style.wordWrap = "true";
formIntro.addChild(textRecord);
textRecord.y = -270;

//header
let headerInfoPplate = new PIXI.Sprite.from('assets/image/UI/header_info_plate.png');
headerInfoPplate.anchor.set(0.5);
headerInfoPplate.scale.set(0.6);
headerInfoPplate.y = -245;
container.addChild(headerInfoPplate);

let textHeaderInfoPlate = new PIXI.Text("Твои рекорды:", new FontStyle("#003D71"));
textHeaderInfoPlate.anchor.set(0.5);
textHeaderInfoPlate.y = -10;
headerInfoPplate.addChild(textHeaderInfoPlate);

//about user
let userNameBar = new PIXI.Sprite.from('assets/image/UI/user_name_bar.png');
userNameBar.anchor.set(0.5);
userNameBar.y = 100;
formIntro.addChild(userNameBar);

let aboutUser = "Alex";
let textUserNameBar = new PIXI.Text(aboutUser, new  FontStyle("#FFFFFF"));
textUserNameBar.anchor.set(0.5);
textUserNameBar.x = -200;
userNameBar.addChild(textUserNameBar);

//buttons
let buttonMiActive = new PIXI.Texture.from('assets/image/UI/login_button_active.png');
let buttonMiHover = new PIXI.Texture.from('assets/image/UI/login_button_hover.png');
let buttonMiPress = new PIXI.Texture.from('assets/image/UI/login_button_press.png');
let buttonMi = new PIXI.Sprite(buttonMiActive);
buttonMi.anchor.set(0.5);
buttonMi.y = -65;
buttonMi.interactive = true;
buttonMi.buttonMode = true;
buttonMi
    .on('pointerdown', onMiButtonDown)
    .on('pointerup', onMiButtonUp)
    .on('pointerover', onMiButtonOver)
    .on('pointerout', onMiButtonOut);
formIntro.addChild(buttonMi);

let buttonPlayActive = new PIXI.Texture.from('assets/image/UI/play_button_active.png');
let buttonPlayHover = new PIXI.Texture.from('assets/image/UI/play_button_hover.png');
let buttonPlayPress = new PIXI.Texture.from('assets/image/UI/play_button_press.png');
let buttonPlay = new PIXI.Sprite.from(buttonPlayActive);
buttonPlay.anchor.set(0.5);
buttonPlay.x = 163;
buttonPlay.y = 300;
buttonPlay.interactive = true;
buttonPlay.buttonMode = true;
buttonPlay
    .on('pointerdown', onPlayButtonDown)
    .on('pointerup', onPlayButtonUp)
    .on('pointerover', onPlayButtonOver)
    .on('pointerout', onPlayButtonOut);
formIntro.addChild(buttonPlay);

let buttonLeadBoardActive = new PIXI.Texture.from('assets/image/UI/leadboard_button_active.png');
let buttonLeadBoardHover = new PIXI.Texture.from('assets/image/UI/leadboard_button_hover.png');
let buttonLeadBoardPress = new PIXI.Texture.from('assets/image/UI/leadboard_button_press.png');
let buttonLeadBoard = new PIXI.Sprite.from(buttonLeadBoardActive);
buttonLeadBoard.anchor.set(0.5);
buttonLeadBoard.x = -163;
buttonLeadBoard.y = 300;
buttonLeadBoard.interactive = true;
buttonLeadBoard.buttonMode = true;
buttonLeadBoard
    .on('pointerdown', onLeadBoardButtonDown)
    .on('pointerup', onLeadBoardButtonUp)
    .on('pointerover', onLeadBoardButtonOver)
    .on('pointerout', onLeadBoardButtonOut);
formIntro.addChild(buttonLeadBoard);
*/
