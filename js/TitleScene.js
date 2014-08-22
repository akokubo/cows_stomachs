/*
 * タイトル画面
 */

var createTitleScene = function() {
	var scene = new Scene();
	var bg = new Sprite(coresizex, coresizey);

	scene.index = SCENE_ENUM.TITLE;
    scene.frame = 0;
	bg.image = game.assets[IMG_TITLE];
    bg.frame = 0;
	scene.addChild(bg);

	scene.addEventListener('touchend', function(e){
		//manager(this.index);
        game.replaceScene(createGameScene());
	});
    
    scene.addEventListener('enterframe', function(e){
        scene.frame++;

        if (scene.frame >= game.fps * 15) {
            bg.frame = 0;
            scene.frame = 0;
            //game.pushScene(createDemoScene());
        } else if (scene.frame >= game.fps * 12) {
            bg.frame = 4;
        } else if (scene.frame >= game.fps * 9) {
            bg.frame = 3;
        } else if (scene.frame >= game.fps * 6) {
            bg.frame = 2;
        } else if (scene.frame >= game.fps * 3) {
            bg.frame = 1;
        }
    });

	return scene;
};