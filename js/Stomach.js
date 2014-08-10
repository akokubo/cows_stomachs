/*
 * 胃袋画面
 */

//変数宣言
//システム
var Eat_btn;
var stomach;
var reset = false;
var sto_reset = false;

var sto_debug = 0;
 
function createStomach(){
    stomach = new Scene();
    
    
    //グループ追加
    stomach.addChild(gp0_Sto);
    stomach.addChild(gp1_Sto);
    stomach.addChild(gp2_Sto);
    stomach.addChild(gp3_Sto);
    
    //ウィンドウ
    var WINDOW = new Sprite(coresizex,coresizey);
    WINDOW.image = game.assets[IMG_WINDOW];
    gp0_Sto.addChild(WINDOW);
    
    //胃袋召喚
    var Stomachs = [];
    var Sto_Num = 4;
    
    for(var i = 0; i < Sto_Num; i ++){
        Stomachs[i] = new STOMACH(Stomachw*i,
                                 (coresizey - Stomachh)/2,i);
        gp1_Sto.addChild(Stomachs[i]);
    }
    //やりなおしボタン
    var Sto_btn = new STO((coresizex - BTNw)/2,
                          BTNh*4);
    gp2_Sto.addChild(Sto_btn);
    
    
    //イートボタン
    Eat_btn = new EAT((coresizex - BTNw)/2,
    						coresizey - BTNh*5);
    //gp2_Sto.addChild(Eat_btn)
    
    //ウィンドウを再開した時の初期化処理
    stomach.on('enterframe',function(e){
    	if(sto_reset == true){
    		reset = true;
            Sto_btn.time = 1;
            sto_NUM = 0;
            
            gp2_Sto.removeChild(Eat_btn)
    		console.log("sto_debug = " + sto_debug);
    		sto_debug++;
    		sto_reset = false;
    	}
    });
    
    return stomach;
}

//ストマッククラス
var STOMACH = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y,i){
        
        enchant.Sprite.call(this,Stomachw,Stomachh);
        this.image = game.assets[IMG_STOMACH];
        this.frame = i;
        this.x = x;
        this.y = y;
        this.check = 0;
        
        var scalechenge = 0.1;
        var space = 20;
        
        this.on('touchstart',function(e){
        	if(sto_NUM < 4 && reset == false){
	            this.scaleX += scalechenge;
	            this.scaleY += scalechenge;
            }
        });
        this.on('touchend',function(e){
        	if(sto_NUM < 4 && reset == false){
	            this.scaleX -= scalechenge;
	            this.scaleY -= scalechenge;
	            
	            sto_NUMs[sto_NUM] = new NUM_STO(space+this.x+NUMw*this.check
	                                            ,this.y,sto_NUM);
	            gp2_Sto.addChild(sto_NUMs[sto_NUM]);
                game.params.Stomachs[sto_NUM] = this.frame;
	            sto_NUM ++;
	            this.check ++;
	            if(sto_NUM == 4){
	            	gp2_Sto.addChild(Eat_btn);
	            }
            }
        });
        this.on('enterframe',function(e){
            if(reset == true){
                this.check = 0;
            }
        });
    
    }//initialize
});//class

//ナンバークラス
var NUM_STO = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y,sto_NUM){
        
        enchant.Sprite.call(this,NUMw,NUMh);
        this.image = game.assets[IMG_NUM];
        this.frame = sto_NUM;
        this.x = x;
        this.y = y;
        
        this.on('enterframe',function(e){
            if(reset == true){
                gp2_Sto.removeChild(this);
            }
        });
    
    }//initialize
});//class

//ストマックボタンクラス
var STO = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,BTNw,BTNh);
        this.image = game.assets[IMG_BTN];
        this.frame = 1;
        this.x = x;
        this.y = y;
        
        var scalechenge = 0.1;
        
        this.on('touchstart',function(e){
            this.scaleX += scalechenge;
            this.scaleY += scalechenge;
        });
        this.on('touchend',function(e){
            this.scaleX -= scalechenge;
            this.scaleY -= scalechenge;
            
            reset = true;
            this.time = 1;
            sto_NUM = 0;
            
            gp2_Sto.removeChild(Eat_btn)
            
        });
        this.on('enterframe',function(e){
            if(this.time >= 1){
                if(this.time %5 == 0){
                    reset = false;
                    this.time = 0;
                    console.log("reseted");
                }
                this.time++;
            }
        });
    
    }//initialize
});//class

var digestion = function (feed, stomach_patterns) {
    var feeds = [
        "leaf",
        "humus",
        "hay",
        "soy",
        "corn",
        "beer",
        "salt"
    ];

//最適パターン
    var patterns = {
        "leaf":  [0, 0, 3, 1],
        "humus": [0, 2, 3, 3],
        "hay":   [0, 0, 3, 3],
        "soy":   [0, 3, 3, 1],
        "corn":  [0, 0, 3, 1],
        "beer":  [2, 3, 1, 1],
        "salt":  [2, 3, 3, 3]
    };
//最適パターン時の上昇値
    var statuses = {
        "leaf":  { "weight": 5, "muscle": 5},
        "humus": { "weight": 7, "muscle": 3},
        "hay":   { "weight": 6, "muscle": 4},
        "soy":   { "weight": 10, "muscle": 0},
        "corn":  { "weight": 10, "muscle": 0},
        "beer":  { "weight": 10, "muscle": 10},
        "salt":  { "weight": -1, "muscle": 10}
    };

    var functions = [
        [0, 0], // 食物繊維
        [1, 0], // 水分吸収
        [0, 1], // 毒素分解
        [1, 1]  // 栄養吸収
    ];

    var pattern = patterns[feeds[feed]];

    var distance = function (p1, p2) {
        return (Math.abs(functions[p1][0] - functions[p2][0]) + Math.abs(functions[p1][1] - functions[p2][1]));
    };

    var execute = function (feed, pattern, stomach_patterns) {
        var dist = 0;
        for (var i = 0; i < 4; i++) {
            dist += distance(pattern[i], stomach_patterns[i]);
        }
        var ratio = ((8 - dist) / 8)*2;//最終計算値
        var weight = Math.floor(statuses[feed].weight * ratio);
        var muscle = Math.floor(statuses[feed].muscle * ratio);
        game.params.Cow.weight += weight;
        game.params.Cow.muscle += muscle;
        console.log('weight:' + game.params.Cow.weight);
        console.log('muscle:' + game.params.Cow.muscle);
    };
    execute(feeds[feed], pattern, stomach_patterns);
};

//イートボタンクラス
var EAT = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,BTNw,BTNh);
        this.image = game.assets[IMG_BTN];
        this.frame = 2;
        this.x = x;
        this.y = y;
        
        var scalechenge = 0.1;
        
        this.on('touchstart',function(e){
            this.scaleX += scalechenge;
            this.scaleY += scalechenge;
        });
        this.on('touchend',function(e){
            console.log(game.params.Feed);
            console.log(game.params.Stomachs);
            digestion(game.params.Feed, game.params.Stomachs);
            
            //次回開いたときにリセットさせるトリガー
            sto_reset = true;
            
            //日数を減らす
            if (daycount[1] == 0) {
                daycount[0] --;
                daycount[1] = 9;
            } else {
                daycount[1]--;
            }
            
            //自分を消す
            gp2_Sto.removeChild(this)
            
            //シーンを消す
            game.removeScene(stomach);
            game.removeScene(feedScene);
            
            this.scaleX -= scalechenge;
            this.scaleY -= scalechenge;
        });
    
    }//initialize
});//class
 