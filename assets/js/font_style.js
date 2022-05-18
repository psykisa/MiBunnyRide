/*-----Шрифт для форм-----*/
export class FontStyle extends PIXI.TextStyle {
    constructor(fill, fontSize = 60, fontFamily = 'Zubilo', dropShadow = false,) {
        super();
        this.fill = fill;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.dropShadow = dropShadow;
        this.dropShadowColor = '#003c76';
        this.dropShadowBlur = 5;
        this.dropShadowDistance = 10;
        this.dropShadowAngle = -4.8;
        this.padding = 20;
        this.align = "center";
    }
}
