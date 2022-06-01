import{app} from './main.js';
import {coin} from './functions.js';
import { FontStyle } from './font_style.js';

export let containerHeader;

export function createControlPanel() {
    containerHeader = new PIXI.Container();
    app.stage.addChild(containerHeader);

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
    formOfCoin.height = 66;
    formOfCoin.position.set(68, 12);
    const amountOfCoin = new PIXI.Text(coin, new FontStyle('#FFFFFF'));
    formOfCoin.addChild(amountOfCoin);
    coinContainer.addChild(coinIcon, formOfCoin);
    coinContainer.scale.set(0.7);
    containerHeader.addChild(coinContainer);

    //------------ Количество монет, выравнивание текста в поле с монетами ----------//
    const setCoin = value => {
        coin = value;
        amountOfCoin.text = coin;
        amountOfCoin.x = formOfCoin.width / 2 - amountOfCoin.width / 2;
        amountOfCoin.y = formOfCoin.height/2 - amountOfCoin.height / 2;
    }
    setCoin(coin);

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
    containerHeader.addChild(headerMenu);
    headerMenu.position.set(app.screen.width - headerMenu.width, 5);

    //----- События панели управления -----//

    //Кнопка "Развернуть"
    function onGrowButtonDown() {
        this.isdown = true;
        this.texture = pressGrowButton;
        if (app.renderer.view.style.width == 100 + "%") {
            app.renderer.view.style.width = 1280 + "px";
            app.renderer.view.style.height = 640 + "px";
        }
        else {
            app.renderer.view.style.width = 100 + "%";
            app.renderer.view.style.height = 100 + "%";
        }
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
        pauseMask.visible = (!pauseMask.visible) ? (true) : false;
        (pauseMask.visible) ? ticker.stop() : ticker.start();
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