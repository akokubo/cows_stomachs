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

//グループ
var gp0_ship = new Group();
var gp1_ship = new Group();
var gp2_ship = new Group();
var gp3_ship = new Group();
var gp4_ship = new Group();


var createShipScene = function() {
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
	var window = new WINDOW(0,
							division_before.y + divisionh);
	gp3_ship.addChild(window);
	
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
        this.image = game.assets[IMG_WINDOW];
        this.frame = 0;
        this.x = x;
        this.y = y;
        
        var text = new TEXT(this.x,this.y);
        gp4_ship.addChild(text);
    
    }//initialize
});//class

//テキストクラス
var TEXT = enchant.Class.create(enchant.Sprite,{
    initialize: function(x,y){
        
        enchant.Sprite.call(this,windoww,windowh);
        this.image = game.assets[IMG_WINDOW];
        this.x = x;
        this.y = y;
        this.massege = [[0,0],[12,3]];//[文字数,行数]
        this.timer = 0;
        
        var next = new Sprite(nextw,nexth);
        next.image = game.assets[IMG_NEXT];
        gp4_ship.addChild(next);
        
        var texter = [[0,0],[12,3]];
        var space = 10;
        
        console.log("texter [0][0] = " + texter[0][0]);
        console.log("texter [0][1] = " + texter[0][1]);
        console.log("texter [1][0] = " + texter[1][0]);
        console.log("texter [1][1] = " + texter[1][1]);
        
        this.on("enterframe",function(e){
        	this.frame = message;
        	next.x = this.x + fontw * texter[message][0] + space;
        	next.y = this.y + fonth * texter[message][1];
        	
        	if(this.timer % 10 > 5){
        		gp4_ship.removeChild(next);
        	}
        	else{gp4_ship.addChild(next);}
        	
        	this.timer++;
        });
    
    }//initialize
});//class

