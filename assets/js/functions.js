import { app } from './main.js';
import { FontStyle } from './font_style.js';

let headerContainer;
let containerFormIntro;
let containerFormGameOver;
let containerFormLeaderBoard;

export let playerName = "Alex";
export let score = 55;
export let coin = "0"
export let distance = "0";

//----- Создание фона -----//
export function background() {
    const mountain = PIXI.Texture.from("assets/image/Environment/back_rocks.png");
    const backgroundMountains = new PIXI.TilingSprite(mountain, app.screen.width, app.screen.height - app.screen.height / 2);
    backgroundMountains.tileScale.set(0.5);
    backgroundMountains.y = app.screen.height - backgroundMountains.height;
    app.stage.addChild(backgroundMountains);

    const ice = PIXI.Texture.from("assets/image/Environment/floor.png");
    const iceFloor = new PIXI.TilingSprite(ice, app.screen.width, app.screen.height - app.screen.height * 0.9);
    iceFloor.y = app.screen.height - iceFloor.height;
    app.stage.addChild(iceFloor);

    const sunTexture = PIXI.Texture.from("assets/image/Environment/bg_sun.png");
    const sunSprite = new PIXI.Sprite(sunTexture);
    app.stage.addChild(sunSprite);

    const treeOne = PIXI.Texture.from("assets/image/Environment/tree_1.png");
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

    app.stage.addChild(treeOneSprite, treeTwoSprite, treeThreeSprite);
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
    const coinIcon = PIXI.Sprite.from('assets/image/UI/collect_coin_icon.png');
    coinIcon.zIndex = 1;
    const formOfCoin = PIXI.Sprite.from('assets/image/UI/coin_score_plate.png');
    formOfCoin.width = 192;
    formOfCoin.position.set(68, 12);
    const amountOfCoin = new PIXI.Text(coin, new FontStyle('#FFFFFF'));
    // amountOfCoin.x = formOfCoin.width / 2 - amountOfCoin.width / 2;
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
    setCoin(555);

    //----- Панель  с кнопками ------//
    const headerMenu = new PIXI.Container();
    // кнопка "Развернуть"
    const activeGrowButton = PIXI.Texture.from('assets/image/UI/btn_fullscreen_active.png');
    const pressGrowButton = PIXI.Texture.from('assets/image/UI/btn_fullscreen_press.png');
    const hoverGrowButton = PIXI.Texture.from('assets/image/UI/btn_fullscreen_hover.png');
    const growButton = new PIXI.Sprite(activeGrowButton);
    growButton.interactive = true;
    growButton
        .on('pointerdown', onGrowButtonDown)
        .on('pointerup', onGrowButtonUp)
        .on('pointerover', onGrowButtonOver)
        .on('pointerout', onGrowButtonOut);

    //  кнопка "Звук"
    const activeSoundButtonOn = PIXI.Texture.from('assets/image/UI/btn_sound_1_active.png');
    const pressSoundButtonOn = PIXI.Texture.from('assets/image/UI/btn_sound_1_press.png');
    const hoverSoundButtonOn = PIXI.Texture.from('assets/image/UI/btn_sound_1_hover.png');
    const activeSoundButtonOf = PIXI.Texture.from('assets/image/UI/btn_sound_0_active.png');
    const pressSoundButtonOf = PIXI.Texture.from('assets/image/UI/btn_sound_0_press.png');
    const hoverSoundButtonOf = PIXI.Texture.from('assets/image/UI/btn_sound_0_hover.png');
    const soundButton = new PIXI.Sprite(activeSoundButtonOf);
    soundButton.x = 150;
    soundButton.interactive = true;
    soundButton
        .on('pointerdown', onSoundButtonDown)
        .on('pointerup', onSoundButtonUp)
        .on('pointerover', onSoundButtonOver)
        .on('pointerout', onSoundButtonOut);

    // кнопка "Пауза"
    const activePauseButton = PIXI.Texture.from('assets/image/UI/btn_pause_active.png');
    const pressPauseButton = PIXI.Texture.from('assets/image/UI/btn_pause_press.png');
    const hoverPauseButton = PIXI.Texture.from('assets/image/UI/btn_pause_hover.png');
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
    headerMenu.position.set(app.screen.width - headerMenu.width, 5);

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
export function createFormIntro() {
    containerFormIntro = new PIXI.Container();
    containerFormIntro.x = app.screen.width / 2;
    containerFormIntro.y = app.screen.height / 2;
    app.stage.addChild(containerFormIntro);
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
    const buttonMiActive = PIXI.Texture.from('assets/image/UI/login_button_active.png');
    const buttonMiHover = PIXI.Texture.from('assets/image/UI/login_button_hover.png');
    const buttonMiPress = PIXI.Texture.from('assets/image/UI/login_button_press.png');
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

    const buttonPlayActive = PIXI.Texture.from('assets/image/UI/play_button_active.png');
    const buttonPlayHover = PIXI.Texture.from('assets/image/UI/play_button_hover.png');
    const buttonPlayPress = PIXI.Texture.from('assets/image/UI/play_button_press.png');
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

    const buttonLeadBoardActive = PIXI.Texture.from('assets/image/UI/leadboard_button_active.png');
    const buttonLeadBoardHover = PIXI.Texture.from('assets/image/UI/leadboard_button_hover.png');
    const buttonLeadBoardPress = PIXI.Texture.from('assets/image/UI/leadboard_button_press.png');
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

    //----- Cобытия формы "Начало" -----//
    //события кнопки Mi
    function onMiButtonDown() {
        this.isdown = true;
        this.texture = buttonMiPress;
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
        containerFormGameOver.visible = true;
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
        containerFormIntro.visible = false;
        containerFormLeaderBoard.visible = true;
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
//-----Форма "Окончание игры"
export function createFormGameOver() {
    containerFormGameOver = new PIXI.Container();
    app.stage.addChild(containerFormGameOver);
    containerFormGameOver.x = app.screen.width / 2;
    containerFormGameOver.y = app.screen.height / 2;
    containerFormGameOver.visible = false;

    //лучи
    const rays = PIXI.Sprite.from('assets/image/UI/rays.png');
    containerFormGameOver.addChild(rays);
    rays.anchor.set(0.5);
    rays.scale.set(0.6);
    app.ticker.add(() => {
        rays.rotation += 0.01;
    });

    //звезды
    const spriteStars = [];
    for (let i = 0; i < 8; i++) {
        spriteStars[i] = PIXI.Sprite.from('assets/image/UI/star.png');
        containerFormGameOver.addChild(spriteStars[i]);
        spriteStars[i].anchor.set(0.5, -1);
    }

    spriteStars[0].position.set(-200, 190);
    spriteStars[0].rotation = 1.1;
    spriteStars[0].scale.set(0.6);
    spriteStars[1].position.set(215, 200);
    spriteStars[1].rotation = -1.1;
    spriteStars[1].scale.set(0.5);
    spriteStars[2].position.set(-220, 10);
    spriteStars[2].rotation = 1.2;
    spriteStars[2].scale.set(0.8);
    spriteStars[3].rotation = - 1.2;
    spriteStars[3].position.set(250, 60);
    spriteStars[3].scale.set(0.45);
    spriteStars[4].position.set(-270, -90);
    spriteStars[4].rotation = 1.3;
    spriteStars[4].scale.set(0.4)
    spriteStars[5].position.set(520, -130);
    spriteStars[5].rotation = 1.1;
    spriteStars[5].scale.set(0.8);
    spriteStars[6].position.set(-170, -220);
    spriteStars[6].rotation = 1.4;
    spriteStars[6].scale.set(0.7);
    spriteStars[7].position.set(430, -255);
    spriteStars[7].rotation = 1.1;
    spriteStars[7].scale.set(0.55);

    //фома
    const formGameOver = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
    formGameOver.scale.set(0.67);
    containerFormGameOver.addChild(formGameOver);
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
    textRecordFormGameOver.y = -250;
    formGameOver.addChild(textRecordFormGameOver);

    //кнопка "OK"
    let buttonOkFormGameOver = createButtonOk()
    formGameOver.addChild(buttonOkFormGameOver);
    buttonOkFormGameOver.on('pointerdown', onButtonOkPressGameOver)
    function onButtonOkPressGameOver() {
        const buttonOkPress = PIXI.Texture.from('assets/image/UI/ok_button_press.png');
        this.isdown = true;
        this.texture = buttonOkPress;
        containerFormGameOver.visible = false;
        containerFormLeaderBoard.visible = true;
    }

    const resultContainer = new PIXI.Container();
    resultContainer.x = formGameOver.width;
    //монеты
    const coinIconGameOver = PIXI.Sprite.from("assets/image/UI/collect_coin_icon.png");
    const textCoinFormGameOver = new PIXI.Text(coin, new FontStyle("#F4AD25", 100, undefined, true));
    resultContainer.addChild(coinIconGameOver, textCoinFormGameOver);
    formGameOver.addChild(resultContainer);
    resultContainer.position.set(-275, -115);
    textCoinFormGameOver.x = 280;
    textCoinFormGameOver.x = (resultContainer.width - textCoinFormGameOver.width) / 2 + 100;

    //дистанция
    const distanceIconGameOver = PIXI.Sprite.from("assets/image/UI/collect_distance_icon.png");
    const textDistanceFormGameOver = new PIXI.Text(distance + " м", new FontStyle("#9AC6FF", 100, undefined, true));
    resultContainer.addChild(distanceIconGameOver, textDistanceFormGameOver);
    distanceIconGameOver.x = -15;
    distanceIconGameOver.y = 165;
    textDistanceFormGameOver.y = 165;

    //--- Выравнивание текста "Дистанция"
    const setDistance = value => {
        distance = value;
        textDistanceFormGameOver.text = distance + " м";
        textDistanceFormGameOver.x = (resultContainer.width - textDistanceFormGameOver.width) / 2 + 150;
    }
    setDistance(123);

}
//-----Форма "Результаты"
export function createFormLeaderBoard() {

let namePeriod = 0;

containerFormLeaderBoard = new PIXI.Container()
app.stage.addChild(containerFormLeaderBoard);
containerFormLeaderBoard.visible = false;
containerFormLeaderBoard.x = app.screen.width / 2 - containerFormLeaderBoard.width / 2;
containerFormLeaderBoard.y = app.screen.height / 2 - containerFormLeaderBoard.height / 2;

const formLeaderBoard = PIXI.Sprite.from('assets/image/UI/info_plate_big.png');
formLeaderBoard.scale.set(0.67);
formLeaderBoard.anchor.set(0.5);
formLeaderBoard.width = 505;
formLeaderBoard.height = 618;
containerFormLeaderBoard.addChild(formLeaderBoard);

//Header
const headerFormLeaderBoard = PIXI.Sprite.from('assets/image/UI/header_info_plate.png');
headerFormLeaderBoard.anchor.set(0.5);
headerFormLeaderBoard.y = -407;
formLeaderBoard.addChild(headerFormLeaderBoard);

const textFormLeaderBoard = new PIXI.Text("Таблица рекордов:", new FontStyle("#003D71"));
textFormLeaderBoard.anchor.set(0.5);
textFormLeaderBoard.y = -10;
headerFormLeaderBoard.addChild(textFormLeaderBoard);

//Кнопка "Ок"
let buttonOkFormLeaderBoard = createButtonOk()
formLeaderBoard.addChild(buttonOkFormLeaderBoard);
buttonOkFormLeaderBoard.on('pointerdown', onButtonOkPressLeaderBoard)

//Период
let massivePeriod = ['Вce время', 'Месяц', 'Неделя'];
let periodFormLeaderBoard = new PIXI.Text(massivePeriod[namePeriod], new FontStyle('#FF6800', 65, undefined, true));
formLeaderBoard.addChild(periodFormLeaderBoard);
periodFormLeaderBoard.anchor.set(0.47, 4.1);

//Кнопки "Вперед" - "Назад"
const arrowActive = PIXI.Texture.from('assets/image/UI/arrow_btn_active.png');
const arrowHover = PIXI.Texture.from('assets/image/UI/arrow_btn_hover.png');
const arrowPress = PIXI.Texture.from('assets/image/UI/arrow_btn_press.png');
const arrowButtonForward = new PIXI.Sprite(arrowActive);
arrowButtonForward.interactive = true;
arrowButtonForward
    .on('pointerdown', onArrowButtonForwardDown)
    .on('pointerup', onArrowButtonForwardUp)
    .on('pointerover', onArrowButtonForwardOver)
    .on('pointerout', onArrowButtonForwardOut);

arrowButtonForward.scale.set(1);
arrowButtonForward.position.set(240, -345)

const arrowButtonBack = new PIXI.Sprite(arrowActive);
arrowButtonBack.interactive = true;
arrowButtonBack
    .on('pointerdown', onArrowButtonBackDown)
    .on('pointerup', onArrowButtonForwardUp)
    .on('pointerover', onArrowButtonForwardOver)
    .on('pointerout', onArrowButtonForwardOut);

arrowButtonBack.scale.set(1);
arrowButtonBack.rotation = 1.06;
arrowButtonBack.position.set(-240, -345)
formLeaderBoard.addChild(arrowButtonForward, arrowButtonBack);

//-----Таблица результатов

let arrayGamers = [
    { name: "Anna", score: 12345 },
    { name: "Alex", score: 1234 },
    { name: "Alice", score: 123 },
    { name: "Петр", score: 315165 },
    { name: "Алексей", score: 58615 },
    { name: "Вадим", score: 6161 },
    { name: "Женя", score: 213 },
    { name: "Игорь", score: 66165 },
    { name: "Вячеслав", score: 12634 },
    { name: "Александр", score: 6515 },
];
let emptyArrayGamersMonth = [
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
    { name: "-", score: "-" },
]
let emptyArrayGamersWeek = JSON.parse(JSON.stringify(emptyArrayGamersMonth));
emptyArrayGamersWeek[0].name = "Cat";                                        ///<-----для проверки

let resultsAlltime = createResultsTable(arrayGamers);
let resultsMonth = createResultsTable(emptyArrayGamersMonth);
let resultsWeek = createResultsTable(emptyArrayGamersWeek);
formLeaderBoard.addChild(resultsAlltime);
formLeaderBoard.addChild(resultsMonth);
formLeaderBoard.addChild(resultsWeek);

resultsAlltime.visible = true;
resultsMonth.visible = false;
resultsWeek.visible = false;
let results = [resultsAlltime, resultsMonth, resultsWeek];

//Событие при нажатии на кнопку "ОК"
function onButtonOkPressLeaderBoard() {
    const buttonOkPress = PIXI.Texture.from('assets/image/UI/ok_button_press.png');
    this.isdown = true;
    this.texture = buttonOkPress;
    containerFormLeaderBoard.visible = false;
    containerFormIntro.visible = true;
    namePeriod = 0
    periodFormLeaderBoard.text = massivePeriod[namePeriod]
}
//События кнопок "Вперед" и "Назад"
function onArrowButtonForwardDown() {
    this.isdown = true;
    this.texture = arrowPress;
    results[namePeriod].visible = false;
    periodFormLeaderBoard.text = massivePeriod[++namePeriod];
    if (namePeriod < 3) {
        results[namePeriod].visible = true;
    }
    if (namePeriod == 3) {
        results[namePeriod - 1].visible = false;
        namePeriod = 0;
        results[namePeriod].visible = true;
        periodFormLeaderBoard.text = massivePeriod[namePeriod];
    }
}

function onArrowButtonForwardUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = arrowHover;
    }
}

function onArrowButtonForwardOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = arrowHover;
}

function onArrowButtonForwardOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = arrowActive;
}

function onArrowButtonBackDown() {
    this.isdown = true;
    this.texture = arrowPress;

  
    periodFormLeaderBoard.text = massivePeriod[--namePeriod];
    if (namePeriod >= 0) {
        results[namePeriod].visible = true;
        results[namePeriod + 1].visible = false;
    }
    if (namePeriod < 0) {
        namePeriod = massivePeriod.length - 1;
        results[namePeriod].visible = true;
        periodFormLeaderBoard.text = massivePeriod[namePeriod];

    }

}
}
//----- Кнопка "OK"
export function createButtonOk() {
    const buttonOkActive = PIXI.Texture.from('assets/image/UI/ok_button_active.png');
    const buttonOkHover = PIXI.Texture.from('assets/image/UI/ok_button_hover.png');
    const buttonOk = new PIXI.Sprite(buttonOkActive);
    buttonOk.anchor.set(0.5, -2.15);
    buttonOk.interactive = true;
    buttonOk
        .on('pointerup', onButtonOkUp)
        .on('pointerover', onButtonOkOver)
        .on('pointerout', onButtonOkOut);
    return buttonOk;

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
}
//-----Таблица Результатов
export function createResultsTable(arrayGamers) {
    const resultsTable = new PIXI.Container();
    let leadPlaceSrite = [PIXI.Sprite.from("assets/image/UI/place_1.png"),
    PIXI.Sprite.from("assets/image/UI/place_2.png"),
    PIXI.Sprite.from("assets/image/UI/place_3.png")];
    let colorLeadPLace = ["#C16001", "#215DB0", "#8B1B01"];
    let fontStyleListGamers = new FontStyle("#000", 37);
    let fontStylePosition = new FontStyle('#FFF', 40);

    for (let i = 0; i < arrayGamers.length; i++) {
        setTimeout(() => {
            if (i < 3) {
                leadPlaceSrite[i].scale.set(1);
                leadPlaceSrite[i].position.set(-340, -270 + i * 80)
                let nameLeadGamer = new PIXI.Text(arrayGamers[i].name, new FontStyle(colorLeadPLace[i], 45));
                nameLeadGamer.position.set(80, 11)
                leadPlaceSrite[i].addChild(nameLeadGamer);
                let scoreLeadSprite = PIXI.Sprite.from("assets/image/UI/highleader_scores_plate.png");
                scoreLeadSprite.width = 180;
                scoreLeadSprite.position.set(170, -255 + i * 80)
                let scoreLeadGamers = new PIXI.Text(arrayGamers[i].score, new FontStyle(colorLeadPLace[i], 40));
                scoreLeadGamers.position.set(scoreLeadSprite.width/2 - scoreLeadGamers.width/2, -2);
                scoreLeadSprite.addChild(scoreLeadGamers);
                resultsTable.addChild(leadPlaceSrite[i], scoreLeadSprite);
            }
            if (i > 2) {
                const positionText = new PIXI.Text(i + 1, fontStylePosition);
                positionText.position.set(-300 - positionText.width / 2, i * positionText.height - 170);
                resultsTable.addChild(positionText);
                let nameGamers = PIXI.Sprite.from('assets/image/UI/midleader_name_plate.png');
                nameGamers.position.set(-265, i * positionText.height - 170);
                const textNameGamers = new PIXI.Text(arrayGamers[i].name, fontStyleListGamers);
                textNameGamers.position.set(20, -6);
                nameGamers.addChild(textNameGamers);
                let scoreGamers = PIXI.Sprite.from('assets/image/UI/midleader_scores_plate.png');
                scoreGamers.width = 165;
                scoreGamers.position.set(178, i * positionText.height - 170);
                const textScoreGamers = new PIXI.Text(arrayGamers[i].score, fontStyleListGamers);
                scoreGamers.addChild(textScoreGamers);
                textScoreGamers.position.set(scoreGamers.width/2 - textScoreGamers.width/2, -6);
                resultsTable.addChild(nameGamers, scoreGamers);
            }
        }, 100 * i);
    }
    return resultsTable;
}
