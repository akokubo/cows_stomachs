/*global Scene, Sprite, Label, game, createStomach, SCENE_ENUM,
  IMG_RUMINATION_BG, IMG_SCORE_BOARD, IMG_FEEDS_MINI_ICON, IMG_STOMACHS_MINI_ICON,
  IMG_OK_BUTTON, IMG_EVALUATIONS_MINI_ICON */
/*jslint devel:true */
/*
 * はんすう画面
 *
 */

var ruminationScene;

var digestion = function (feed, stomach_patterns) {
    'use strict';

    var feeds, patterns, statuses, functions, pattern, distance, execute;

    feeds = [
        "leaf",
        "humus",
        "hay",
        "soy",
        "corn",
        "beer",
        "salt"
    ];

    //最適パターン
    patterns = {
        "leaf":  [0, 0, 3, 1],
        "humus": [0, 2, 3, 3],
        "hay":   [0, 0, 3, 3],
        "soy":   [0, 3, 3, 1],
        "corn":  [0, 0, 3, 1],
        "beer":  [2, 3, 1, 1],
        "salt":  [2, 3, 3, 3]
    };

    //最適パターン時の上昇値
    statuses = {
        "leaf":  { "weight": 5, "muscle": 5},
        "humus": { "weight": 7, "muscle": 3},
        "hay":   { "weight": 6, "muscle": 4},
        "soy":   { "weight": 10, "muscle": 0},
        "corn":  { "weight": 10, "muscle": 0},
        "beer":  { "weight": 10, "muscle": 10},
        "salt":  { "weight": -1, "muscle": 10}
    };

    functions = [
        [0, 0], // 食物繊維
        [1, 0], // 水分吸収
        [0, 1], // 毒素分解
        [1, 1]  // 栄養吸収
    ];

    pattern = patterns[feeds[feed]];

    distance = function (p1, p2) {
        return (Math.abs(functions[p1][0] - functions[p2][0]) + Math.abs(functions[p1][1] - functions[p2][1]));
    };

    execute = function (feed, pattern, stomach_patterns) {
        var dist = 0, sps = [], evaluation = [], i, d, ratio, weight, muscle;

        for (i = 0; i < 4; i += 1) {
            sps[i] = stomach_patterns[i];
            d = distance(pattern[i], stomach_patterns[i]);
            dist += d;
            evaluation.push(d);
        }

        ratio = ((8 - dist) / 8) * 9.9;//最終計算値
        weight = Math.floor(statuses[feed].weight * ratio);
        muscle = Math.floor(statuses[feed].muscle * ratio);
        game.params.weight = weight;
        game.params.muscle = muscle;
        game.params.Cow.weight += weight;
        game.params.Cow.muscle += muscle;

        game.params.recent.push({
            Feed: game.params.Feed,
            Stomachs: sps,
            Digestions: evaluation,
            Weight: weight,
            Muscle: muscle
        });

        //console.log('weight:' + game.params.Cow.weight);
        //console.log('muscle:' + game.params.Cow.muscle);
    };

    execute(feeds[feed], pattern, stomach_patterns);
};

var createRuminationScene = function () {
    'use strict';
    var scene = new Scene(),
        background_image = game.assets[IMG_RUMINATION_BG],
        score_board_image = game.assets[IMG_SCORE_BOARD],
        feeds_icon = game.assets[IMG_FEEDS_MINI_ICON],
        stomachs_icon = game.assets[IMG_STOMACHS_MINI_ICON],
        evaluations_icon = game.assets[IMG_EVALUATIONS_MINI_ICON],
        ok_buttom_image = game.assets[IMG_OK_BUTTON],
        margin_top = 90,
        width = 640,
        height = 960,
        score_height = 64,
        background = new Sprite(width, height),
        header = new Sprite(width, score_height),
        footer = new Sprite(width, score_height),
        day_rest = game.params.recent.length + 1,
        i,
        j,
        score_board,
        button,
        feed,
        stomach,
        weight_label,
        muscle_label,
        scorize,
        evaluation;

/*
    game.params.recent = [
        {
            Feed: 1,
            Stomachs: [ 0, 1, 2, 3 ],
            Digestions: [0, 1, 2, 2],
            Weight: 5,
            Muscle: 3
        },
        {
            Feed: 3,
            Stomachs: [ 3, 2, 1, 0 ],
            Weight: 4,
            Digestions: [2, 1, 0, 0],
            Muscle: 9
        }
    ];
    game.params.Feed = 5;
    game.params.Stomachs = [ 2, 3, 1, 1 ];
*/

    day_rest = game.params.recent.length + 1;
    digestion(game.params.Feed, game.params.Stomachs);

    scorize = function (val) {
        var value = parseInt(val, 10), result;
        if (value > 0) {
            if (value >= 10) {
                result = '+' + val;
            } else {
                result = ' +' + val;
            }
        } else if (value === 0) {
            result = '  0';
        } else {
            if (value <= -10) {
                result = val;
            } else {
                result = ' ' + val;
            }
        }
        return result;
    };

    // シーンの作成
    scene = new Scene();
    scene.index = SCENE_ENUM.RUMINATION;
    ruminationScene = scene;

    // 背景
    background.image = background_image;
    scene.addChild(background);

    // ヘッダーの作成
    header.image = score_board_image;
    header.moveTo(0, margin_top);
    scene.addChild(header);

    // フッターの作成
    footer.image = score_board_image;
    footer.frame = 6;
    footer.moveTo(0, score_height * (day_rest + 1) + margin_top);
    scene.addChild(footer);

    // スコアの作成
    for (i = 0; i < day_rest; i += 1) {
        score_board = new Sprite(width, score_height);
        score_board.image = score_board_image;
        score_board.frame = i + 1;
        score_board.moveTo(0, score_height * (i + 1) + margin_top);

        scene.addChild(score_board);

        feed = new Sprite(64, 64);
        feed.image = feeds_icon;
        feed.frame = game.params.recent[i].Feed;
        feed.moveTo(130, score_height * (i + 1) + margin_top);
        scene.addChild(feed);

        //console.log(game.params.recent[i].Stomachs);
        for (j = 0; j < 4; j += 1) {
            stomach = new Sprite(64, 64);
            stomach.image = stomachs_icon;
            stomach.frame = game.params.recent[i].Stomachs[j];
            stomach.moveTo(193 + j * 64, score_height * (i + 1) + margin_top);
            scene.addChild(stomach);
        }

        for (j = 0; j < 4; j += 1) {
            evaluation = new Sprite(64, 64);
            evaluation.image = evaluations_icon;
            evaluation.frame = game.params.recent[i].Digestions[j];
            evaluation.moveTo(193 + j * 64, score_height * (i + 1) + margin_top);
            scene.addChild(evaluation);
        }

        weight_label = new Label(scorize(game.params.recent[i].Weight));
        muscle_label = new Label(scorize(game.params.recent[i].Muscle));
        weight_label.font = "32px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        muscle_label.font = "32px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        weight_label.moveTo(197 + 4 * 64, score_height * (i + 1) + margin_top + 20);
        muscle_label.moveTo(197 + 5 * 64, score_height * (i + 1) + margin_top + 20);
        scene.addChild(weight_label);
        scene.addChild(muscle_label);
    }

    weight_label = new Label("現在の体重: " + game.params.Cow.weight);
    muscle_label = new Label("現在の筋力: " + game.params.Cow.muscle);
    weight_label.font = "32px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
    muscle_label.font = "32px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
    weight_label.moveTo(190 + 2 * 64, score_height * (i + 1) + margin_top + 20);
    muscle_label.moveTo(190 + 2 * 64, score_height * (i + 2) + margin_top + 20);
    scene.addChild(weight_label);
    scene.addChild(muscle_label);

    button = new Sprite(85, 56);
    button.image = ok_buttom_image;
    button.moveTo(270, score_height * (i + 4) + margin_top);
    button.scale(2, 2);
    scene.addChild(button);
    button.addEventListener('touchend', function () {
        // 胃袋選択シーンへ移行
        game.removeScene(ruminationScene);
        //game.pushScene(createFeedScene());
    });

    return scene;
};
