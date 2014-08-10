/*
 * タイトル画面
 */

var createTitleScene = function() {
	var scene = new Scene();
	var bg = new Sprite(coresizex, coresizey);

	scene.index = SCENE_ENUM.TITLE;
    scene.frame = 0;
	bg.image = game.assets[IMG_TITLE];
	scene.addChild(bg);

	scene.addEventListener('touchend', function(e){
		//manager(this.index);
        game.replaceScene(createGameScene());
	});
    
    scene.addEventListener('enterframe', function(e){
        scene.frame++;
        if (scene.frame >= game.fps * 10) {
            game.pushScene(createDemoScene());
            scene.frame = 0;
        }
    });

	return scene;
};