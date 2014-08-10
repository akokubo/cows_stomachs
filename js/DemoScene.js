/*
 * タイトル画面を放置していると流れるデモシーン
 */

var createDemoScene = function() {
    var scene = new Scene();
	var bg = new Sprite(coresizex, coresizey);
    var label = new Label("牛を！");

	scene.index = SCENE_ENUM.DEMO;
    scene.frame = 0;
    scene.state = 0;
	bg.image = game.assets[IMG_DEMO];
	scene.addChild(bg);
    scene.addChild(label);

	scene.addEventListener('touchend', function(e){
		//manager(this.index);
        game.replaceScene(createTitleScene());
	});
    
    scene.addEventListener('enterframe', function(e){
        scene.frame++;
        if(!(scene.frame % (game.fps * 2))) {
            switch(scene.state) {
                case 0:
                    scene.removeChild(label);
                    label.text += "\n育てて！";
                    scene.addChild(label);
                    break;
                    
                case 1:
                    scene.removeChild(label);
                    label.text += "\n出荷しろ！";
                    scene.addChild(label);
                    break;
                    
                default :
                    game.popScene();
                    break;
            }
            scene.state++;
        }
    });

	return scene;
};