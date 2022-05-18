import { FontStyle } from './font_style.js'
import { background } from './functions.js'
// import { Howl ,Howler} from 'howler'
let gamePlace = document.getElementById("gamePlace");
let game = gamePlace.querySelector("div");
/*game.style.overflow = "hidden";*/
const app = new PIXI.Application({
    width: 1280,
    height: 640,
    backgroundColor: 0X6F9ACA,
    resolution: window.devicePixelRatio || 1,
});
app.stage.interactive = true;
app.stage.cursor = "pointer";
game.appendChild(app.view);
const sound = new Howl({
    src:['../audio/super.mp3'],
});
Howler.volume(0.5);
background(app);

/*createHeader();*/

//----- Шапка ----------------------------------------------------------------------------//
const headerContainer = new PIXI.Container();
app.stage.addChild(headerContainer);
//-------- Поле с монетами -----//
let coin = "0";
const coinContainer = new PIXI.Container();
coinContainer.sortableChildren = true;
// coinContainer.scale.set(0.7);
coinContainer.position.set(12, 10);
const coinIcon = new PIXI.Sprite.from('assets/image/UI/collect_coin_icon.png');
coinIcon.zIndex = 1;
const formOfCoin = new PIXI.Sprite.from('assets/image/UI/coin_score_plate.png');
formOfCoin.width = 192;
formOfCoin.position.set(65, 12);
const amountOfCoin = new PIXI.Text(coin, new FontStyle('#FFFFFF'));
amountOfCoin.x = formOfCoin.width / 2 - amountOfCoin.width / 2;
formOfCoin.addChild(amountOfCoin);
coinContainer.addChild(coinIcon, formOfCoin);
headerContainer.addChild(coinContainer);
//------------ Количество монет, выравнивание текста в поле с монетами ----------//
const setCoin = value => {
    coin = value;
    amountOfCoin.text = coin;
    amountOfCoin.x = formOfCoin.width / 2 - amountOfCoin.width / 2;
}
setCoin(123);

//----- Панель  с кнопками ------//
const headerMenu = new PIXI.Container();
// кнопка "Развернуть"
const activeGrowButton = new PIXI.Texture.from('assets/image/UI/btn_fullscreen_active.png');
const pressGrowButton = new PIXI.Texture.from('assets/image/UI/btn_fullscreen_press.png');
const hoverGrowButton = new PIXI.Texture.from('assets/image/UI/btn_fullscreen_hover.png');
const growButton = new PIXI.Sprite(activeGrowButton);
growButton.interactive = true;
growButton
    .on('pointerdown', onGrowButtonDown)
    .on('pointerup', onGrowButtonUp)
    .on('pointerover', onGrowButtonOver)
    .on('pointerout', onGrowButtonOut);

//  кнопка "Звук"
const activeSoundButtonOn = new PIXI.Texture.from('assets/image/UI/btn_sound_1_active.png');
const pressSoundButtonOn = new PIXI.Texture.from('assets/image/UI/btn_sound_1_press.png');
const hoverSoundButtonOn = new PIXI.Texture.from('assets/image/UI/btn_sound_1_hover.png');
const activeSoundButtonOf = new PIXI.Texture.from('assets/image/UI/btn_sound_0_active.png');
const pressSoundButtonOf = new PIXI.Texture.from('assets/image/UI/btn_sound_0_press.png');
const hoverSoundButtonOf = new PIXI.Texture.from('assets/image/UI/btn_sound_0_hover.png');
const soundButton = new PIXI.Sprite(activeSoundButtonOn);
soundButton.x = 150;
soundButton.interactive = true;
soundButton
    .on('pointerdown', onSoundButtonDown)
    .on('pointerup', onSoundButtonUp)
    .on('pointerover', onSoundButtonOver)
    .on('pointerout', onSoundButtonOut);

// кнопка "Пауза"
const activePauseButton = new PIXI.Texture.from('assets/image/UI/btn_pause_active.png');
const pressPauseButton = new PIXI.Texture.from('assets/image/UI/btn_pause_press.png');
const hoverPauseButton = new PIXI.Texture.from('assets/image/UI/btn_pause_hover.png');
const pauseButton = new PIXI.Sprite(activePauseButton);
pauseButton.x = 300;
pauseButton.interactive = true;
pauseButton
    .on('pointerdown', onPauseButtonDown)
    .on('pointerup', onPauseButtonUp)
    .on('pointerover', onPauseButtonOver)
    .on('pointerout', onPauseButtonOut);

headerMenu.addChild(growButton);
headerMenu.addChild(growButton, soundButton, pauseButton);
headerContainer.addChild(headerMenu);
headerMenu.position.set(app.screen.width - headerMenu.width, 5);
headerMenu.scale.set(0.7);

/////////////////////////////////////////////////////////////////////////////////////////

//----- ФОРМЫ -------------------------------------------------------------------------//

const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
app.stage.addChild(container);

//форма интро
const formIntro = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
formIntro.scale.set(0.67);
container.addChild(formIntro);
formIntro.anchor.set(0.5);

//рекорды
let score = 55;
const textRecord = new PIXI.Text('Рекорд: ' + score, new FontStyle("#00FD17", 67, undefined, true));
textRecord.anchor.set(0.5);
textRecord.style.wordWrap = "true";
formIntro.addChild(textRecord);
textRecord.y = -270;

//header
const headerInfoPlate = new PIXI.Sprite.from('assets/image/UI/header_info_plate.png');
headerInfoPlate.anchor.set(0.5);
headerInfoPlate.y = -407;
formIntro.addChild(headerInfoPlate);

const textHeaderInfoPlate = new PIXI.Text("Твои рекорды:", new FontStyle("#003D71"));
textHeaderInfoPlate.anchor.set(0.5);
textHeaderInfoPlate.y = -10;
headerInfoPlate.addChild(textHeaderInfoPlate);

//about user
const userNameBar = new PIXI.Sprite.from('assets/image/UI/user_name_bar.png');
userNameBar.anchor.set(0.5);
userNameBar.y = 100;
formIntro.addChild(userNameBar);

let aboutUser = "Alex";
const textUserNameBar = new PIXI.Text(aboutUser, new FontStyle("#FFFFFF"));
textUserNameBar.anchor.set(0.5);
textUserNameBar.x = -200;
userNameBar.addChild(textUserNameBar);


//buttons Form
const buttonMiActive = new PIXI.Texture.from('assets/image/UI/login_button_active.png');
const buttonMiHover = new PIXI.Texture.from('assets/image/UI/login_button_hover.png');
const buttonMiPress = new PIXI.Texture.from('assets/image/UI/login_button_press.png');
const buttonMi = new PIXI.Sprite(buttonMiActive);
buttonMi.anchor.set(0.5);
buttonMi.y = -65;
buttonMi.interactive = true;
buttonMi
    .on('pointerdown', onMiButtonDown)
    .on('pointerup', onMiButtonUp)
    .on('pointerover', onMiButtonOver)
    .on('pointerout', onMiButtonOut);
formIntro.addChild(buttonMi);

const buttonPlayActive = new PIXI.Texture.from('assets/image/UI/play_button_active.png');
const buttonPlayHover = new PIXI.Texture.from('assets/image/UI/play_button_hover.png');
const buttonPlayPress = new PIXI.Texture.from('assets/image/UI/play_button_press.png');
const buttonPlay = new PIXI.Sprite.from(buttonPlayActive);
buttonPlay.anchor.set(0.5);
buttonPlay.x = 163;
buttonPlay.y = 300;
buttonPlay.interactive = true;
buttonPlay
    .on('pointerdown', onPlayButtonDown)
    .on('pointerup', onPlayButtonUp)
    .on('pointerover', onPlayButtonOver)
    .on('pointerout', onPlayButtonOut);
formIntro.addChild(buttonPlay);

const buttonLeadBoardActive = new PIXI.Texture.from('assets/image/UI/leadboard_button_active.png');
const buttonLeadBoardHover = new PIXI.Texture.from('assets/image/UI/leadboard_button_hover.png');
const buttonLeadBoardPress = new PIXI.Texture.from('assets/image/UI/leadboard_button_press.png');
const buttonLeadBoard = new PIXI.Sprite.from(buttonLeadBoardActive);
buttonLeadBoard.anchor.set(0.5);
buttonLeadBoard.x = -163;
buttonLeadBoard.y = 300;
buttonLeadBoard.interactive = true;
buttonLeadBoard
    .on('pointerdown', onLeadBoardButtonDown)
    .on('pointerup', onLeadBoardButtonUp)
    .on('pointerover', onLeadBoardButtonOver)
    .on('pointerout', onLeadBoardButtonOut);
formIntro.addChild(buttonLeadBoard);


/////////////////////////-----СОБЫТИЯ -----//////////////////////////////////////////////////////////

//----- События панели управления -----//

//Кнопка "Развернуть"
function onGrowButtonDown() {
    this.isdown = true;
    this.texture = pressGrowButton;
}

function onGrowButtonUp() {
    this.isdown = false;
    if (this.isOver)
        this.texture = hoverGrowButton;
}

function onGrowButtonOver() {
    this.isOver = true;
    this.texture = hoverGrowButton;
}

function onGrowButtonOut() {
    this.isOver = false;
    this.texture = activeGrowButton;
}

//Кнопка "Звук"
function onSoundButtonDown() {
    sound.play();
    this.isdown = true;
    this.texture = (this.texture === hoverSoundButtonOn) ? pressSoundButtonOn : pressSoundButtonOf;
}

function onSoundButtonUp() {
    this.isdown = false;
    if (this.isOver)
        this.texture = (this.texture === pressSoundButtonOn) ? hoverSoundButtonOf : hoverSoundButtonOn;
}

function onSoundButtonOver() {
    this.isOver = true;
    this.texture = (this.texture === activeSoundButtonOn) ? hoverSoundButtonOn : hoverSoundButtonOf;
}

function onSoundButtonOut() {
    this.isOver = false;
    this.texture = (this.texture === hoverSoundButtonOn) ? activeSoundButtonOn : activeSoundButtonOf;
}

function onPauseButtonDown() {
    this.isdown = true;
    this.texture = pressPauseButton;
}
function onPauseButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = hoverPauseButton;
    }
}

function onPauseButtonOver() {
    this.isOver = true;
    this.texture = hoverPauseButton;
}
function onPauseButtonOut() {
this.isOver=false;
this.texture = activePauseButton;
}

//----- Cобытия форм -----//

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

