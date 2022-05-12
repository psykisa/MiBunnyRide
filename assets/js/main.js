let gamePlace = document.getElementById("gamePlace");
let game = gamePlace.querySelector("div");
const app = new PIXI.Application({width: 1280, height: 640, backgroundColor: 0X6F9ACA});
game.appendChild(app.view);

//фон
const background = PIXI.Sprite.from("assets/image/Environment/back_rocks.png");
background.scale.set(0.5);
background.width = app.screen.width;
/*let backRock = new PIXI.TilingSprite(background);*/
/*backRock.anchor.y = 0.5;
backRock.anchor.x=0.5;
backRock.position.x = 200;
backRock.position.y = 200;*/
background.x = 0;
background.y = 255;
app.stage.addChild(background);

const floor = PIXI.Sprite.from("assets/image/Environment/floor.png");
floor.height = app.screen.height / 5;
floor.width = app.screen.width;
floor.position.y = 600;
/*floor.rotation = 0.1;*/
app.stage.addChild(floor);

const sun = PIXI.Sprite.from("assets/image/Environment/bg_sun.png");
/*floor.height = app.screen.height / 5;
floor.width = app.screen.width;*/
/*sun.x= ;*/
sun.y = -100;
app.stage.addChild(sun);

/*sun.x=255;*/


const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
app.stage.addChild(container);


// import {formIntro} from "./form_intro";



// //форма интро
const formIntro = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
formIntro.scale.set(0.67);
container.addChild(formIntro);
formIntro.anchor.set(0.5);

//Font Style

class FontStyle extends PIXI.TextStyle {
    constructor(fill, fontSize = 60, fontFamily = 'Zubilo', dropShadow = false,) {
        super();
        this.fill = fill;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.dropShadow = dropShadow;
        this.dropShadowColor = '#003c76';
        this.dropShadowBlur = 7;
        this.dropShadowDistance = 6;
        this.dropShadowAngle = -4.8;
        this.padding = 20;
        this.align = "center";
    }
}

//рекорды
let value = 55;
let textRecord = new PIXI.Text("Рекорд: " + value, new FontStyle("#00FD17", undefined, undefined, true));
textRecord.anchor.set(0.5);
textRecord.style.wordWrap = "true";
textRecord.style.fontSize="67px";
formIntro.addChild(textRecord);
textRecord.y = -270;

//header
let headerInfoPlate = new PIXI.Sprite.from('assets/image/UI/header_info_plate.png');
headerInfoPlate.anchor.set(0.5);
headerInfoPlate.scale.set(0.67);
headerInfoPlate.y = -271;
container.addChild(headerInfoPlate);

let textHeaderInfoPlate = new PIXI.Text("Твои рекорды:", new FontStyle("#003D71"));
textHeaderInfoPlate.anchor.set(0.5);
textHeaderInfoPlate.y = -10;
headerInfoPlate.addChild(textHeaderInfoPlate);

//about user
let userNameBar = new PIXI.Sprite.from('assets/image/UI/user_name_bar.png');
userNameBar.anchor.set(0.5);
userNameBar.y = 100;
formIntro.addChild(userNameBar);

let aboutUser = "Alex";
let textUserNameBar = new PIXI.Text(aboutUser, new FontStyle("#FFFFFF"));
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


//СОБЫТИЯ:

//события кнопки Mi
function onMiButtonDown() {
    this.isdown = true;
    this.texture = buttonMiPress;
    this.alpha = 1;
    document.location.href = 'https://account.xiaomi.com/fe/service/login/password?client_id=2882303761518691426&_ssign=2%26V1_oauth2.0%26mf6HIlHY8a9BU%2BW5INWlitVS1Ho%3D&lsrp_appName=Sign+in+to+%24%7Bmi+bunny+ride%7D%24+with+Mi+Account&_customDisplay=20&scope=1&_locale=en_US&sid=oauth2.0&qs=%253Fcallback%253Dhttps%25253A%25252F%25252Fopen.account.xiaomi.com%25252Fsts%25252Foauth%25253Fsign%25253DczmkxNtqFsVr9MvD95ynqto2jME%2525253D%252526followup%25253Dhttps%2525253A%2525252F%2525252Fopen.account.xiaomi.com%2525252Foauth2%2525252Fauthorize%2525253Fresponse_type%2525253Dtoken%25252526client_id%2525253D2882303761518691426%25252526redirect_uri%2525253Dhttps%252525253A%252525252F%252525252Fmibunnyride.com%252525252F%25252526skip_confirm%2525253Dfalse%252526sid%25253Doauth2.0%2526sid%253Doauth2.0%2526lsrp_appName%253DSign%252520in%252520to%252520%252524%25257Bmi%252520bunny%252520ride%25257D%252524%252520with%252520Mi%252520Account%2526_customDisplay%253D20%2526scope%253D1%2526client_id%253D2882303761518691426%2526_locale%253Den_US%2526_ssign%253D2%252526V1_oauth2.0%252526mf6HIlHY8a9BU%25252BW5INWlitVS1Ho%25253D&callback=https%3A%2F%2Fopen.account.xiaomi.com%2Fsts%2Foauth%3Fsign%3DczmkxNtqFsVr9MvD95ynqto2jME%253D%26followup%3Dhttps%253A%252F%252Fopen.account.xiaomi.com%252Foauth2%252Fauthorize%253Fresponse_type%253Dtoken%2526client_id%253D2882303761518691426%2526redirect_uri%253Dhttps%25253A%25252F%25252Fmibunnyride.com%25252F%2526skip_confirm%253Dfalse%26sid%3Doauth2.0&_sign=2%26V1_oauth2.0%26gmKkXwnELJp7pPtOyTYLaApYCc8%3D&serviceParam=%7B%22checkSafePhone%22%3Afalse%2C%22checkSafeAddress%22%3Afalse%2C%22lsrp_score%22%3A0.0%7D&showActiveX=false&theme=&needTheme=false&bizDeviceType=&scopes=%5B%7B%5C%22level%5C%22%3A1%2C%5C%22name%5C%22%3A%5C%22Mi+Account+info%5C%22%2C%5C%22id%5C%22%3A1%7D%5D';
}

function onMiButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = buttonMiHover;
    }
}

function onMiButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = buttonMiHover;
}

 function onMiButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = buttonMiActive;
}

//события кнопки Play
 function onPlayButtonDown() {
    this.isdown = true;
    this.texture = buttonPlayPress;
    this.alpha = 1;
}

 function onPlayButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = buttonPlayHover;
    }
}

function onPlayButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = buttonPlayHover;
}

function onPlayButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = buttonPlayActive;
}

//события кнопки LeadBoard

function onLeadBoardButtonDown() {
    this.isdown = true;
    this.texture = buttonLeadBoardPress;
    this.alpha = 1;
}

 function onLeadBoardButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = buttonLeadBoardHover;
    }
}

function onLeadBoardButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = buttonLeadBoardHover;
}

 function onLeadBoardButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = buttonLeadBoardActive;
}


