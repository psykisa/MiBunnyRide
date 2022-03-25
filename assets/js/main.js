// const app = new PIXI.Application ({
//     width: 600,
//     height: 600,
// });
const app = new PIXI.Application();
document.body.appendChild(app.view);

//фон
const background = PIXI.Sprite.from("assets/image/Environment/bg_preloader.png");
background.height = app.screen.height;
background.width = app.screen.width;
app.stage.addChild(background);
const ground = PIXI.Sprite.from("assets/image/Environment/tail_snow_1.png");
ground.height = app.screen.height;
ground.width = app.screen.width;
app.stage.addChild(ground);

//заяц
const bunny = PIXI.Sprite.from("assets/image/Characters/mi_bunny_idle_03.png");
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
app.stage.addChild(bunny);
app.ticker.add(() => {
    bunny.rotation += 0.05;
});








