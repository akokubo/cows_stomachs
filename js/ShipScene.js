/*
 * 出荷画面
 */
 //グラフィックサイズ
 var divisionw = coresizex;
 var divisionh = 120;
 
 var windoww = coresizex;
 var windowh = 256;
 
 var nextw = 48;
 var nexth = 48;
 
 var fontw = 48;
 var fonth = 48;
 
//システム
var message = 1;

var beauty = 1;
var faty = 2;

//グループ
var gp0_ship = new Group();
var gp1_ship = new Group();
var gp2_ship = new Group();
var gp3_ship = new Group();
var gp4_ship = new Group();


var createShipScene = function(Cowstate) {
	var scene = new Scene();
	scene.index = SCENE_ENUM.SHIP;
	
	//グループの追加
	scene.addChild(gp0_ship);
	scene.addChild(gp1_ship);
	scene.addChild(gp2_ship);
	scene.addChild(gp3_ship);
	scene.addChild(gp4_ship);
	
	//背景
	var bg = new Sprite(coresizex, coresizey);
	bg.image = game.assets[IMG_FARM];
	gp0_ship.addChild(bg);
	
	
	//牛
	var cow = new COWsell((coresizex - COWw)/2,
							(coresizey - COWh)/2);
	cow.frame = Cowstate;
	gp1_ship.addChild(cow);
	
	//しきり
	//手前
	var division_before = new Sprite(divisionw,divisionh);
	division_before.image = game.assets[IMG_DIVISION];
	division_before.y = cow.y + COWh*0.75;
	gp2_ship.addChild(division_before);
	//奥
	var division_after = new Sprite(divisionw,divisionh);
	division_after.image = game.assets[IMG_DIVISION];
	division_after.y = cow.y+ COWh/4;
	gp0_ship.addChild(division_after);
	
	
	//テキストウインドウ
	var window = new WINDOW(0,division_before.y + divisionh);
	gp3_ship.addChild(window);
	
	var text = new TEXT(window.x,window.y);
    gp4_ship.addChild(text);
	
	//金額設定
	var COW_State = 10;
	if(Cowstate == beauty){COW_State *= 10;}
	if(Cowstate == faty){COW_State *= 5;}
	
	var moneys = split_num(game.params.Cow.weight * game.params.Cow.muscle * COW_State);
	var money_num = [];
	var space = 40;
	
	console.log(moneys);
	
	scene.on('enterframe',function(e){
		if(text.frame == text.end){
				for(var i in moneys){
				money_num[i] = new MONEY(fontw * i + space,window.y + fonth + space
											,moneys[i]);
				gp4_ship.addChild(money_num[i])
			}
		}
	});
	
	
	return scene;
};

//カウセルクラス
var COWsell = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,COWw,COWh);
        this.image = game.assets[IMG_COW];
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.time = 0;
        this.move = true;
        this.frame = Cow.frame;
        
        var move = 5;
        
        this.on('enterframe',function(e){
        	if(this.move == true){
        		if(this.x < 0 || this.x + COWw > coresizex){
	        		move *= -1;
		        	this.scaleX *= -1;
        		}
        		this.x -= move;
        	}
        })
    }//initialize
});//class

//ウィンドウクラス
var WINDOW = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,windoww,windowh);
        this.image = game.assets[IMG_TEXTWINDOW];
        this.frame = 0;
        this.x = x;
        this.y = y;
        
    
    }//initialize
});//class

//テキストクラス
var TEXT = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,windoww,windowh);
        this.image = game.assets[IMG_TEXTWINDOW];
        this.x = x;
        this.y = y;
        this.massege = [[0,0],[12,3]];//[文字数,行数]
        this.timer = 0;
        this.end = 3;
        
        /*
        var next = new Sprite(nextw,nexth);
        next.image = game.assets[IMG_NEXT];
        gp4_ship.addChild(next);
        */
        
        var texter = [[0,0],[12,3]];
        var space = 10;
        
        console.log("texter [0][0] = " + texter[0][0]);
        console.log("texter [0][1] = " + texter[0][1]);
        console.log("texter [1][0] = " + texter[1][0]);
        console.log("texter [1][1] = " + texter[1][1]);
        
        this.on("enterframe",function(e){
        	this.frame = message;
        	
        	/*
        	next.x = this.x + fontw * texter[message][0] + space;
        	next.y = this.y + fonth * texter[message][1];
        	
        	if(this.timer % 10 > 5){
        		gp4_ship.removeChild(next);
        	}
        	else{gp4_ship.addChild(next);}
        	
        	this.timer++;
        	*/
        });
        
        this.on("touchend",function(e){
        	if(this.frame == this.end){location.reload();}
        	message ++;
        });
    
    }//initialize
});//class

//マネークラス
var MONEY = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y,frame){
        
        enchant.Sprite.call(this,fontw,fonth);
        this.image = game.assets[IMG_FONTwhite];
        this.x = x;
        this.y = y;
        this.frame = frame;
    
    }//initialize
});//class
