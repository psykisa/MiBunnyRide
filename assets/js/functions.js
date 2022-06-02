import { FontStyle } from './font_style.js';
import { results, textLoad } from './form_leaderboard.js';
import { variable } from './variables.js';

//----- Кнопка "OK" -----------------------------------------------------//
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
//----- Таблица Результатов ---------------------------------------------//
export function createResultsTable(arrayGamers) {
    const resultsTable = new PIXI.Container();      // <-------таблица
    let rowResultTable;                             //<--------строка в таблице результатов
    let leadPlaceSrite = [PIXI.Sprite.from("assets/image/UI/place_1.png"),
    PIXI.Sprite.from("assets/image/UI/place_2.png"),
    PIXI.Sprite.from("assets/image/UI/place_3.png")];
    let colorLeadPLace = ["#C16001", "#215DB0", "#8B1B01"];
    let fontStyleListGamers = new FontStyle("#333", 37);
    let fontStylePosition = new FontStyle('#FFF', 40);

    for (let i = 0; i < arrayGamers.length; i++) {
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
            scoreLeadGamers.position.set(scoreLeadSprite.width / 2 - scoreLeadGamers.width / 2, -2);
            scoreLeadSprite.addChild(scoreLeadGamers);
            rowResultTable = new PIXI.Container();
            rowResultTable.addChild(leadPlaceSrite[i], scoreLeadSprite);
            rowResultTable.visible = false;
            resultsTable.addChild(rowResultTable);
        }
        if (i > 2) {
            let positionText = new PIXI.Text(i + 1, fontStylePosition);
            positionText.position.set(-35 - positionText.width / 2, -5);
            let nameGamers = PIXI.Sprite.from('assets/image/UI/midleader_name_plate.png');
            nameGamers.x = -267;
            let textNameGamers = new PIXI.Text(arrayGamers[i].name, fontStyleListGamers);
            textNameGamers.position.set(20, -2);
            nameGamers.addChild(positionText, textNameGamers);
            let scoreGamers = PIXI.Sprite.from('assets/image/UI/midleader_scores_plate.png');
            scoreGamers.width = 165;
            scoreGamers.x = 178;
            let textScoreGamers = new PIXI.Text(arrayGamers[i].score, fontStyleListGamers);
            scoreGamers.addChild(textScoreGamers);
            textScoreGamers.position.set(scoreGamers.width / 2 - textScoreGamers.width / 2, -2);
            rowResultTable = new PIXI.Container();
            rowResultTable.addChild(nameGamers, scoreGamers);
            rowResultTable.y = rowResultTable.height * 0.55 * i - 175;
            rowResultTable.visible = false;
            resultsTable.addChild(rowResultTable);
        }
    }
    return resultsTable;
}
//----- Вывод таблицы результатов ---------------------------------------//
export const showLinesTable = () => {
    let temp = results[variable.namePeriod].children;
    
    hideLinesTable();
    textLoad.visible = true;
    setTimeout(() =>{
        textLoad.visible = false;
        results[variable.namePeriod].visible = true;
        for (let i = 0; i < temp.length; i++) {
            setTimeout(() => {
                temp[i].visible = true;
            }, 100 * i);
        }
    }, 300);
}

 export const hideLinesTable = () => {
    results[variable.namePeriod].children.forEach(element => {
        element.visible = false;
    });
}
