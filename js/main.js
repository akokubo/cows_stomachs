/*
 * window.onload
 *
 * The function which will be executed after loading page.
 * Command in enchant.js such as "new Core();" will cause an error if executed before entire page is loaded.
 *
 * ページがロードされた際に実行される関数。
 * すべての処理はページがロードされてから行うため、 window.onload の中で実行する。
 * 特に new Core(); は、<body> タグが存在しないとエラーになるので注意。
 */

window.onload = function(){
    /**
     * new Core(width, height)
     *
     * Make instance of enchant.Core class. Set window size to 320 x 320
     * Core オブジェクトを作成する。
     * 画面の大きさは 320ピクセル x 320ピクセル に設定する。
     */
    game = new Core(coresizex, coresizey);

    // ゲーム・パラメータ・オブジェクト
    game.params = {
        Stomachs: [],
        Feed: null,
        Cow: { weight: 100.0, muscle: 100.0 }
    };

    /**
     * Core.fps
     *
     * Set fps (frame per second) in this game to 15.
     * ゲームの fps (frame per second) を指定する。この場合、1秒間あたり15回画面が更新される。
     */
    game.fps = 15;
    /**
     * Core#preload
     *
     * You can preload all assets files before starting the game.
     * Set needed file lists in relative/absolute path for attributes of Core#preload
     * 必要なファイルを相対パスで引数に指定する。 ファイルはすべて、ゲームが始まる前にロードされる。
     */
    game.preload(IMG_TITLE,
                 IMG_DEMO,
                 IMG_FEEDS,
                 IMG_FARM,
                 IMG_COW,
                 IMG_BTN,
                 IMG_STOMACH,
                 IMG_NUM,
                 IMG_WINDOW,
                 IMG_DAY,
                 IMG_FONT,
                 IMG_MACLE,
                 IMG_WEIGHT,
                 IMG_STAGE,
                 IMG_FRAME,
                 IMG_MATH,
                 IMG_DIVISION,
                 IMG_TEXTWINDOW,
                 IMG_NEXT,
                 IMG_FONTwhite);

    /**
     * Core#onload
     *
     * ロードが完了した直後に実行される関数を指定している。
     * onload プロパティは load イベントのリスナとして働くので、以下の2つの書き方は同じ意味。
     *
     * game.onload = function(){
     *     // code
     * }
     *
     * game.addEventListener("load", function(){
     *     // code
     * })
     */

    game.onload = function(){
        //game.currentScene = SCENE_ENUM.GAME;
        game.pushScene(createTitleScene());
    };

    /**
     * Core#start
     * ゲームを開始する。この関数を実行するまで、ゲームは待機状態となる。
     * 代わりに Core#debug を使うことで、デバッグモードで起動することができる。
     * Core#pause(); で一時停止し、 Core#resume(); で再開することができる。
     */
    game.start();
};
