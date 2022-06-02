import {app} from './main.js';
import {FontStyle} from './font_style.js';
import { containerFormIntro } from './form_intro.js';
import { createResultsTable, createButtonOk, showLinesTable, hideLinesTable } from './functions.js';
import { variable } from './variables.js';
import { setup } from './stage.js';

export let containerFormLeaderBoard;
export let results = [];
export let textLoad;

export function createFormLeaderBoard() {
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
    let periodFormLeaderBoard = new PIXI.Text(massivePeriod[variable.namePeriod], new FontStyle('#FF6800', 65, undefined, true));
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

    //-----Таблицы результатов

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
    ];

    let emptyArrayGamersWeek = [
        { name: "1", score: "-" },
        { name: "2", score: "-" },
        { name: "3", score: "-" },
        { name: "4", score: "-" },
        { name: "5", score: "-" },
        { name: "6", score: "-" },
        { name: "7", score: "-" },
        { name: "8", score: "-" },
        { name: "9", score: "-" },
        { name: "10", score: "-" },
    ];

    // let emptyArrayGamersWeek = JSON.parse(JSON.stringify(emptyArrayGamersMonth));
    // emptyArrayGamersWeek[0].name = "Cat";                                        ///<-----для проверки

    let resultsAlltime = createResultsTable(arrayGamers);
    let resultsMonth = createResultsTable(emptyArrayGamersMonth);
    let resultsWeek = createResultsTable(emptyArrayGamersWeek);
    formLeaderBoard.addChild(resultsAlltime);
    formLeaderBoard.addChild(resultsMonth);
    formLeaderBoard.addChild(resultsWeek);
    results.push(resultsAlltime, resultsMonth, resultsWeek);

    textLoad = new PIXI.Text("Загрузка...", new FontStyle("#00295D", 80));
    formLeaderBoard.addChild(textLoad);
    textLoad.position.set(-textLoad.width / 2, -textLoad.height / 2);
    textLoad.visible = false;

    //Событие при нажатии на кнопку "ОК"
    function onButtonOkPressLeaderBoard() {
        const buttonOkPress = PIXI.Texture.from('assets/image/UI/ok_button_press.png');
        this.isdown = true;
        this.texture = buttonOkPress;
        containerFormLeaderBoard.visible = false;
        containerFormIntro.visible = true;
        hideLinesTable();
        variable.namePeriod = 0;
        periodFormLeaderBoard.text = massivePeriod[variable.namePeriod];
        results.length = 0;
        app.stage.removeChildren();
        setup();
        
    }

    //События кнопок "Вперед" и "Назад"
    function onArrowButtonForwardDown() {
        this.isdown = true;
        this.texture = arrowPress;
        results[variable.namePeriod].visible = false;
        periodFormLeaderBoard.text = massivePeriod[++variable.namePeriod];
        if (variable.namePeriod < 3) {
            showLinesTable();
        }
        if (variable.namePeriod == 3) {
            results[variable.namePeriod - 1].visible = false;
            variable.namePeriod = 0;
            showLinesTable();
            periodFormLeaderBoard.text = massivePeriod[variable.namePeriod];
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
        results[0].visible = false
        periodFormLeaderBoard.text = massivePeriod[--variable.namePeriod];
        if (variable.namePeriod >= 0) {
            results[variable.namePeriod + 1].visible = false;
            showLinesTable();
        }
        if (variable.namePeriod < 0) {
            variable.namePeriod = massivePeriod.length - 1;
            showLinesTable();
            periodFormLeaderBoard.text = massivePeriod[variable.namePeriod];
        }
    }
}