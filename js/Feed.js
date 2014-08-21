/*global Scene, Sprite, game, createStomach, SCENE_ENUM, IMG_FEEDS */
/*jslint devel:true */
/*
 * 餌画面
 *
 */

var feedScene;

var createFeedScene = function () {
    'use strict';
    var scene = new Scene(),
        image = game.assets[IMG_FEEDS],
        width = 640,
        height = 108, /* スプライト1個分の高さ */
        margin_top = 24,
        header = new Sprite(width, height),
        footer = new Sprite(width, height),
        buttons = [],
        feed_num = 7,
        i,
        clickButton,
        button;

    // シーンの作成
    scene = new Scene();
    scene.index = SCENE_ENUM.FEED;
    feedScene = scene;

    // ヘッダーの作成
    header.image = image;
    header.moveTo(0, margin_top);
    scene.addChild(header);

    // フッターの作成
    footer.image = image;
    footer.frame = feed_num + 1;
    footer.moveTo(0, height * (feed_num + 1) + margin_top);
    scene.addChild(footer);

    // ボタンクリック時のイベントはンドラーの設定
    clickButton = function (button, index) {
        button.addEventListener('touchend', function () {
            // ゲームオブジェクトに選んだエサを保存
            game.params.Feed = index;
            //console.log(game.params.Feed);

            // 画面のリセット
            scene.removeChild(header);
            scene.removeChild(footer);
            for (i = 0; i < feed_num; i += 1) {
                scene.removeChild(buttons[i]);
            }
            // 胃袋選択シーンへ移行
            game.pushScene(createStomach());
        });
    };

    // ボタンの作成
    for (i = 0; i < feed_num; i += 1) {
        button = new Sprite(width, height);
        button.index = i;
        button.image = image;
        button.frame = i + 1;
        button.moveTo(0, height * (i + 1) + margin_top);

        clickButton(button, i);

        scene.addChild(button);

        // ボタンを配列に保存しておく
        buttons.push(button);
    }

    return scene;
};
