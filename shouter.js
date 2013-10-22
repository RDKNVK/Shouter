//var c = document.getElementsByTagName('canvas')[0];
//var cx = c.getContext('2d');

//var pc = document.getElementById('pseudocanvas');
//cx.fillRect(4,4,50,50);
var c = $('#pseudocanvas');


function Enemy (id) {
	
	var imgWidth = 50;
	var imgHeight = 50;
	
	this.coords = 	(function start (w, h, imgW, imgH) {
					var x = Math.random()*w;
					var y = Math.random()*h;
					
					if ( Math.random() < 0.5){
						x = -imgW/2;
						x += Math.random() < 0.5 ? w : 0;
					} else {
						y = -imgH/2;
						y += Math.random() < 0.5 ? h : 0;
					}
					
					return {x: x, y: y};
				})(c.width(), c.height(), imgWidth, imgHeight);

	var htmlEl = $('<img>', {
					"id": this.id,
					"class": "enemy",
					src: 'files/img/lebka.png',
					width: imgWidth
					
					//"height": imgHeight
				}).css({
					//position: 'absolute',
					top: this.coords.x,
					left: this.coords.y
				});

	c.append(htmlEl);				


	this.id = 'enemy' + id;

	this.rotation = 0;

	this.refresh = function (angle, length) {
		var that = this;
		var move = function() {
						htmlEl.animate(	{
							top: that.coords.y,
							left: that.coords.x
						}, {
							duration: 200
						});
					};

		this.rotation += angle;

		this.coords.x += Math.cos(Math.PI*(this.rotation+90)/180) * length;
		this.coords.y += Math.sin(Math.PI*(this.rotation+90)/180) * length;

				
		htmlEl.rotate({
					animateTo: this.rotation,
					callback: move,
					duration: 20
		});

	}

}

//var en = new Enemy();
//en.draw();

var GAME = {
	enemies: [],
	level: 1,	
	refresh_all: function () {
		for (var i = 0; i < GAME.enemies.length; i++){
			var cur_enemy = GAME.enemies[i];
			//cur_enemy.rotate(10);
			//cur_enemy.move(0.01,0.01);
			cur_enemy.refresh(5, 5);
		}
	},
	addEnemy: function () {
		GAME.enemies.push(new Enemy(GAME.enemies.length));
	}

};

//GAME.addEnemy();

var refresh = window.setInterval(GAME.refresh_all, 1700);
//var	addEnemy_timer = window.setInterval(GAME.addEnemy, 5000);


