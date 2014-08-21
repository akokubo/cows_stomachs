/*
 * メインゲームシーン
 */

//画像サイズ
var COWw = 512;
var COWh = 512;

var BTNw = 256;
var BTNh = 64;

var Stomachw = 160;
var Stomachh = 160;

var NUMw = 32;
var NUMh = 32;

var FONTw = 48;
var FONTh = 48;

var STATEw = 256;
var STATEh = 64;

//システム
var sto_NUM = 0;
var sto_NUMs = [];

var daycount = [0,5];

var weight_aray;
var macle_aray;

var Cow;

var beauty = 1;
var faty = 2;

//グループ
var gp0 = new Group();
var gp1 = new Group();
var gp2 = new Group();
var gp3 = new Group();


var gp0_Sto = new Group();
var gp1_Sto = new Group();
var gp2_Sto = new Group();
var gp3_Sto = new Group();

function createGameScene() {
    var gamescene = new Scene();
    
    //グループ追加
    gamescene.addChild(gp0);
    gamescene.addChild(gp1);
    gamescene.addChild(gp2);
    gamescene.addChild(gp3);
    
    //メイングラフィック
    
    //背景
    var BG = new Sprite(coresizex,coresizey);
    BG.image = game.assets[IMG_FARM];
    gp0.addChild(BG);
    
    //牛召喚
    Cow = new COW( (coresizex - COWw)/2 ,
                      (coresizey - COWh)/2 - BTNh );
    gp1.addChild(Cow);
    
    //ボタン
    var Btn_esa = new ESA((coresizex - BTNw)/2,
                          coresizey - BTNh*5);
    gp2.addChild(Btn_esa);
    
    //日数表示
    var day = new DAY(0,0);
    gp2.addChild(day);
    
    //牛ステータス表示
    var space = 50;
    var weight = new WEIGHT(space,coresizey - STATEh*3);
    gp2.addChild(weight);
    var masle = new MACLE(weight.x+STATEw+space,coresizey - STATEh*3);
    gp2.addChild(masle);

    return gamescene;
}

//ステータスを桁ごとに変換
var split_num = function (num) {
    var tmp = num;
    var num_array = [];
    var place = Math.LOG10E * Math.log(num);
    var length = Math.floor(place);
    for (var i = 0; i <= length; i++) {
        num_array.unshift(tmp % 10);
        tmp = Math.floor(tmp / 10);
    }
    return num_array;
};


//ウエイトクラス
var WEIGHT = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,STATEw,STATEh);
        this.image = game.assets[IMG_WEIGHT];
        this.x = x;
        this.y = y;
        
        weight_aray = split_num(game.params.Cow.weight);
        
        var weights = [];
        var FONT_POSIX = 150;
        var FONT_POSIY = 8;
        
        weights[0] = new WEIGHT_NUM(FONT_POSIX + this.x,FONT_POSIY + this.y,0);
        gp3.addChild(weights[0]);
        weights[1] = new WEIGHT_NUM(FONT_POSIX + this.x+FONTw/2,FONT_POSIY + this.y,1);
        gp3.addChild(weights[1]);
        weights[2] = new WEIGHT_NUM(FONT_POSIX + this.x+FONTw,FONT_POSIY + this.y,2);
        gp3.addChild(weights[2]);
        
        this.on('enterframe',function(e){
        	weight_aray = split_num(game.params.Cow.weight);
        });
        this.on('touchend',function(e){
        	//game.params.Cow.weight += 50;
        });
    
    }//initialize
});//class
//ウエイトナムクラス
var WEIGHT_NUM = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y,place){
        
        enchant.Sprite.call(this,FONTw,FONTh);
        this.image = game.assets[IMG_FONT];
        this.x = x;
        this.y = y;
        this.place = place;
        
        this.on('enterframe',function(e){
        	this.frame = weight_aray[place];
        });
    
    }//initialize
});//class

//マッスルクラス
var MACLE = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,STATEw,STATEh);
        this.image = game.assets[IMG_MACLE];
        this.x = x;
        this.y = y;
        this.place;
        
        macle_aray = split_num(game.params.Cow.muscle);
        
        var macles = [];
        var FONT_POSIX = 150;
        var FONT_POSIY = 8;
        
        macles[0] = new MACLE_NUM(FONT_POSIX + this.x,FONT_POSIY + this.y,0);
        gp3.addChild(macles[0]);
        macles[1] = new MACLE_NUM(FONT_POSIX + this.x+FONTw/2,FONT_POSIY + this.y,1);
        gp3.addChild(macles[1]);
        macles[2] = new MACLE_NUM(FONT_POSIX + this.x+FONTw,FONT_POSIY + this.y,2);
        gp3.addChild(macles[2]);
        
        this.on('enterframe',function(e){
        	macle_aray = split_num(game.params.Cow.muscle);
        });
        this.on('touchend',function(e){
        	//game.params.Cow.muscle += 50;
        });
    
    }//initialize
});//class

//マッスルナムクラス
var MACLE_NUM = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y,place){
        
        enchant.Sprite.call(this,FONTw,FONTh);
        this.image = game.assets[IMG_FONT];
        this.x = x;
        this.y = y;
        this.place = place;
        
        this.on('enterframe',function(e){
        	this.frame = macle_aray[this.place];
        });
    
    }//initialize
});//class

//デイクラス
var DAY = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,coresizex/2,BTNh);
        this.image = game.assets[IMG_DAY];
        this.x = x;
        this.y = y;
        
        var days = [];
        var fontx = 150;
        days[0] = new DAY_NUM(fontx,0,0);
        gp3.addChild(days[0]);
        days[1] = new DAY_NUM(fontx+FONTw/2,0,1);
        gp3.addChild(days[1]);
        
        this.on('enterframe',function(e){
        	//日数調整
        	if(daycount[1] < 0){
        		daycount[0] --;
        		daycount[1] = 9;
        	}
        	
        	//出荷シーンに偏移
        	if(daycount[0] == 0 && daycount[1] == 0){
        		game.pushScene(createShipScene(Cow.frame));//牛の状態を引数として渡す
        	}
        	
        });
        this.on('touchend',function(e){
        	//daycount[1]--;
        });
    
    }//initialize
});//class

//デイナムクラス
var DAY_NUM = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y,KURAI){
        
        enchant.Sprite.call(this,FONTw,FONTh);
        this.image = game.assets[IMG_FONT];
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.KURAI = KURAI;
        
        this.on('enterframe',function(e){
        	this.frame = daycount[this.KURAI];
        	
        });
    
    }//initialize
});//class

//カウクラス
var COW = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,COWw,COWh);
        this.image = game.assets[IMG_COW];
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.time = 0;
        
        var revers = 0.1;
        var weight_beauty = 200;
        var muscle_beauty = 200;
        
        this.on('enterframe',function(e){
            if(this.time %10 == 0){
                this.scaleX += revers;
                this.scaleY += revers;
                
                revers *= -1;
            }
            this.time ++;
            
            
            //牛メイクアップ
            if(game.params.Cow.weight >= weight_beauty && 
            		game.params.Cow.muscle >= muscle_beauty)
            {
            	this.frame = beauty;
            }
            else if(game.params.Cow.weight >= weight_beauty || 
            		game.params.Cow.muscle >= muscle_beauty)
            {
            	this.frame = faty;
            }
        });
        
    
    }//initialize
});//class

//エサボタンクラス
var ESA = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,BTNw,BTNh);
        this.image = game.assets[IMG_BTN];
        this.frame = 0;
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
            
            //シーンの追加
            game.pushScene(createFeedScene());
        });
        
    
    }//initialize
});//class
