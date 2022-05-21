import {app} from './main.js';
import { FontStyle } from './font_style.js';

let headerContainer ;
let containerFormIntro;

export let coin = "0";
export let playerName = "Alex";
export let score = 55;
export let distance = 0;

 //----- Создание фона -----//
export function background() {
    const mountain =  PIXI.Texture.from("assets/image/Environment/back_rocks.png");
    const backgroundMountains = new PIXI.TilingSprite(mountain, app.screen.width, app.screen.height - app.screen.height / 2);
    backgroundMountains.tileScale.set(0.5);
    backgroundMountains.y = app.screen.height - backgroundMountains.height;
    app.stage.addChild(backgroundMountains);

    const ice = PIXI.Texture.from("assets/image/Environment/floor.png");
    const iceFloor = new PIXI.TilingSprite(ice, app.screen.width, app.screen.height - app.screen.height * 0.9);
    iceFloor.y = app.screen.height - iceFloor.height;
    app.stage.addChild(iceFloor);

    const sunTexture =  PIXI.Texture.from("assets/image/Environment/bg_sun.png");
    const sunSprite = new PIXI.Sprite(sunTexture);
    app.stage.addChild(sunSprite);

    const treeOne =  PIXI.Texture.from("assets/image/Environment/tree_1.png");
    const treeOneSprite = new PIXI.Sprite(treeOne);
    treeOneSprite.height = 160;
    treeOneSprite.width = 148;
    treeOneSprite.position.set(20, app.screen.height - treeOneSprite.height * 1.3);

    const treeTwo = PIXI.Texture.from("assets/image/Environment/tree_2.png");
    const treeTwoSprite = new PIXI.Sprite(treeTwo);
    treeTwoSprite.height = 103;
    treeTwoSprite.width = 111;
    treeTwoSprite.position.set(app.screen.width - treeTwoSprite.width * 1.5, app.screen.height - treeTwoSprite.height * 1.5);

    const treeThreeSprite = new PIXI.Sprite(treeTwo);
    treeThreeSprite.height = 103;
    treeThreeSprite.width = 111;
    treeThreeSprite.position.set(100, app.screen.height - treeThreeSprite.height * 1.45);

    app.stage.addChild(treeOneSprite,treeTwoSprite, treeThreeSprite);
}
//----- Панель управления -----//
export function createControlPanel() {
    headerContainer = new PIXI.Container();
    app.stage.addChild(headerContainer);

    //-----Пауза-----//
    let pauseMask = new PIXI.Sprite(PIXI.Texture.WHITE);
    pauseMask.width = app.screen.width;
    pauseMask.height = app.screen.height;
    app.stage.addChild(pauseMask)
    pauseMask.zIndex = 10;
    pauseMask.tint = 0x000000;
    pauseMask.alpha = 0.5;
    pauseMask.visible = false;
    //-----Звук-----//
    const sound = new Howl({
        src: ['assets/sound/speeder.mp3'],
        loop: true,
    });
    sound.volume(0.5);
    sound.rate(0.85);
    
    //-------- Поле с монетами -----//
    
    const coinContainer = new PIXI.Container();
    coinContainer.sortableChildren = true;
    coinContainer.position.set(12, 10);
    const coinIcon =  PIXI.Sprite.from('assets/image/UI/collect_coin_icon.png');
    coinIcon.zIndex = 1;
    const formOfCoin =  PIXI.Sprite.from('assets/image/UI/coin_score_plate.png');
    formOfCoin.width = 192;
    formOfCoin.position.set(68, 12);
    const amountOfCoin = new PIXI.Text(coin, new FontStyle('#FFFFFF'));
    amountOfCoin.x = formOfCoin.width / 2 - amountOfCoin.width / 2;
    formOfCoin.addChild(amountOfCoin);
    coinContainer.addChild(coinIcon, formOfCoin);
    coinContainer.scale.set(0.7);
    headerContainer.addChild(coinContainer);
    
    //------------ Количество монет, выравнивание текста в поле с монетами ----------//
    const setCoin = value => {
        coin = value;
        amountOfCoin.text = coin;
        amountOfCoin.x = formOfCoin.width / 2 - amountOfCoin.width / 2;
    }
    setCoin(155);
    
    //----- Панель  с кнопками ------//
    const headerMenu = new PIXI.Container();
    // кнопка "Развернуть"
    const activeGrowButton =  PIXI.Texture.from('assets/image/UI/btn_fullscreen_active.png');
    const pressGrowButton =  PIXI.Texture.from('assets/image/UI/btn_fullscreen_press.png');
    const hoverGrowButton =  PIXI.Texture.from('assets/image/UI/btn_fullscreen_hover.png');
    const growButton = new PIXI.Sprite(activeGrowButton);
    growButton.interactive = true;
    growButton
        .on('pointerdown', onGrowButtonDown)
        .on('pointerup', onGrowButtonUp)
        .on('pointerover', onGrowButtonOver)
        .on('pointerout', onGrowButtonOut);
    
    //  кнопка "Звук"
    const activeSoundButtonOn =  PIXI.Texture.from('assets/image/UI/btn_sound_1_active.png');
    const pressSoundButtonOn =  PIXI.Texture.from('assets/image/UI/btn_sound_1_press.png');
    const hoverSoundButtonOn =  PIXI.Texture.from('assets/image/UI/btn_sound_1_hover.png');
    const activeSoundButtonOf =  PIXI.Texture.from('assets/image/UI/btn_sound_0_active.png');
    const pressSoundButtonOf =  PIXI.Texture.from('assets/image/UI/btn_sound_0_press.png');
    const hoverSoundButtonOf =  PIXI.Texture.from('assets/image/UI/btn_sound_0_hover.png');
    const soundButton = new PIXI.Sprite(activeSoundButtonOf);
    soundButton.x = 150;
    soundButton.interactive = true;
    soundButton
        .on('pointerdown', onSoundButtonDown)
        .on('pointerup', onSoundButtonUp)
        .on('pointerover', onSoundButtonOver)
        .on('pointerout', onSoundButtonOut);
    
    // кнопка "Пауза"
    const activePauseButton =  PIXI.Texture.from('assets/image/UI/btn_pause_active.png');
    const pressPauseButton =  PIXI.Texture.from('assets/image/UI/btn_pause_press.png');
    const hoverPauseButton =  PIXI.Texture.from('assets/image/UI/btn_pause_hover.png');
    const pauseButton = new PIXI.Sprite(activePauseButton);
    pauseButton.x = 300;
    pauseButton.interactive = true;
    pauseButton
        .on('pointerdown', onPauseButtonDown)
        .on('pointerup', onPauseButtonUp)
        .on('pointerover', onPauseButtonOver)
        .on('pointerout', onPauseButtonOut);
    
    growButton.width = 130;
    soundButton.width = 130;
    pauseButton.width = 130; 
    headerMenu.addChild(growButton, soundButton, pauseButton);
    headerMenu.scale.set(0.7);
    headerContainer.addChild(headerMenu);
    headerMenu.position.set(app.screen.width - headerMenu.width , 5);

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
    this.isdown = true;
    sound.stop();
    this.texture = (this.texture === hoverSoundButtonOn) ? pressSoundButtonOn : pressSoundButtonOf;
    if (this.texture === pressSoundButtonOf)
        sound.play();
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
//кнопка "Пауза" 
function onPauseButtonDown() {
    this.isdown = true;
    this.texture = pressPauseButton;
    pauseMask.visible = (!pauseMask.visible) ? true : false;
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
    this.isOver = false;
    this.texture = activePauseButton;
}
}
//-----Форма "Начало игры" -----//
export function crateFormIntro(){
containerFormIntro = new PIXI.Container();
containerFormIntro.x = app.screen.width / 2;
containerFormIntro.y = app.screen.height / 2;
app.stage.addChild(containerFormIntro);
containerFormIntro.visible = false; //<--------------пока срыл интро;
//форма интро
const formIntro = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
formIntro.scale.set(0.67);
containerFormIntro.addChild(formIntro);
formIntro.anchor.set(0.5);

//рекорды
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


const textUserNameBar = new PIXI.Text(playerName, new FontStyle("#FFFFFF"));
textUserNameBar.anchor.set(0.5);
textUserNameBar.x = -200;
userNameBar.addChild(textUserNameBar);


//buttons Form
const buttonMiActive =  PIXI.Texture.from('assets/image/UI/login_button_active.png');
const buttonMiHover =  PIXI.Texture.from('assets/image/UI/login_button_hover.png');
const buttonMiPress =  PIXI.Texture.from('assets/image/UI/login_button_press.png');
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

const buttonPlayActive =  PIXI.Texture.from('assets/image/UI/play_button_active.png');
const buttonPlayHover =  PIXI.Texture.from('assets/image/UI/play_button_hover.png');
const buttonPlayPress =  PIXI.Texture.from('assets/image/UI/play_button_press.png');
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

const buttonLeadBoardActive =  PIXI.Texture.from('assets/image/UI/leadboard_button_active.png');
const buttonLeadBoardHover =  PIXI.Texture.from('assets/image/UI/leadboard_button_hover.png');
const buttonLeadBoardPress =  PIXI.Texture.from('assets/image/UI/leadboard_button_press.png');
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

//----- Cобытия "Начало" -----//
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
    containerFormIntro.visible = false;
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
}
//-----Форма " Окончание игры"
export function crateFormGameOver(){

}








 //СОБЫТИЯ:

 //события кнопки Mi
// function onMiButtonDown() {
//     this.isdown = true;
//     this.texture = buttonMiPress;
//     this.alpha = 1;
//     document.location.href = 'https://account.xiaomi.com/fe/service/login/password?client_id=2882303761518691426&_ssign=2%26V1_oauth2.0%26mf6HIlHY8a9BU%2BW5INWlitVS1Ho%3D&lsrp_appName=Sign+in+to+%24%7Bmi+bunny+ride%7D%24+with+Mi+Account&_customDisplay=20&scope=1&_locale=en_US&sid=oauth2.0&qs=%253Fcallback%253Dhttps%25253A%25252F%25252Fopen.account.xiaomi.com%25252Fsts%25252Foauth%25253Fsign%25253DczmkxNtqFsVr9MvD95ynqto2jME%2525253D%252526followup%25253Dhttps%2525253A%2525252F%2525252Fopen.account.xiaomi.com%2525252Foauth2%2525252Fauthorize%2525253Fresponse_type%2525253Dtoken%25252526client_id%2525253D2882303761518691426%25252526redirect_uri%2525253Dhttps%252525253A%252525252F%252525252Fmibunnyride.com%252525252F%25252526skip_confirm%2525253Dfalse%252526sid%25253Doauth2.0%2526sid%253Doauth2.0%2526lsrp_appName%253DSign%252520in%252520to%252520%252524%25257Bmi%252520bunny%252520ride%25257D%252524%252520with%252520Mi%252520Account%2526_customDisplay%253D20%2526scope%253D1%2526client_id%253D2882303761518691426%2526_locale%253Den_US%2526_ssign%253D2%252526V1_oauth2.0%252526mf6HIlHY8a9BU%25252BW5INWlitVS1Ho%25253D&callback=https%3A%2F%2Fopen.account.xiaomi.com%2Fsts%2Foauth%3Fsign%3DczmkxNtqFsVr9MvD95ynqto2jME%253D%26followup%3Dhttps%253A%252F%252Fopen.account.xiaomi.com%252Foauth2%252Fauthorize%253Fresponse_type%253Dtoken%2526client_id%253D2882303761518691426%2526redirect_uri%253Dhttps%25253A%25252F%25252Fmibunnyride.com%25252F%2526skip_confirm%253Dfalse%26sid%3Doauth2.0&_sign=2%26V1_oauth2.0%26gmKkXwnELJp7pPtOyTYLaApYCc8%3D&serviceParam=%7B%22checkSafePhone%22%3Afalse%2C%22checkSafeAddress%22%3Afalse%2C%22lsrp_score%22%3A0.0%7D&showActiveX=false&theme=&needTheme=false&bizDeviceType=&scopes=%5B%7B%5C%22level%5C%22%3A1%2C%5C%22name%5C%22%3A%5C%22Mi+Account+info%5C%22%2C%5C%22id%5C%22%3A1%7D%5D';
// }

// function onMiButtonUp() {
//     this.isdown = false;
//     if (this.isOver) {
//         this.texture = buttonMiHover;
//     }
// }

// function onMiButtonOver() {
//     this.isOver = true;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = buttonMiHover;
// }

// function onMiButtonOut() {
//     this.isOver = false;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = buttonMiActive;
// }

//события кнопки Play
// function onPlayButtonDown() {
//     this.isdown = true;
//     this.texture = buttonPlayPress;
//     this.alpha = 1;
// }

// function onPlayButtonUp() {
//     this.isdown = false;
//     if (this.isOver) {
//         this.texture = buttonPlayHover;
//     }
// }

// function onPlayButtonOver() {
//     this.isOver = true;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = buttonPlayHover;
// }

// function onPlayButtonOut() {
//     this.isOver = false;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = buttonPlayActive;
// }

// //события кнопки LeadBoard
// function onLeadBoardButtonDown() {
//     this.isdown = true;
//     this.texture = buttonLeadBoardPress;
//     this.alpha = 1;
// }

// function onLeadBoardButtonUp() {
//     this.isdown = false;
//     if (this.isOver) {
//         this.texture = buttonLeadBoardHover;
//     }
// }

// function onLeadBoardButtonOver() {
//     this.isOver = true;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = buttonLeadBoardHover;
// }

// function onLeadBoardButtonOut() {
//     this.isOver = false;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = buttonLeadBoardActive;
// }