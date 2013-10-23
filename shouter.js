//var c = document.getElementsByTagName('canvas')[0];
//var cx = c.getContext('2d');

//var pc = document.getElementById('pseudocanvas');
//cx.fillRect(4,4,50,50);
var c = $('#pseudocanvas');

function Enemy (id) {
	
	var imgWidth = 50;
	var imgHeight = 50;

	this.coords = {x: 0, y: 0};
	this.rotation = 0;

	this.id = 'enemy' + id;

	// init position

	(function init(th, w, h, imgW, imgH) {
		var q = Math.floor(Math.random() * 4);
		
		switch (q){
			case 0:
				th.coords.x = Math.random() * w;
				break;
			case 1:
				th.coords.x = w;
				th.coords.y = Math.random() * h;
				th.rotation = 90;
				break;
			case 2:
				th.coords.x = Math.random() * w;
				th.coords.y = h;
				th.rotation = 180;
				break;
			case 3:
				th.coords.y = Math.random() * h;
				th.rotation = 270;
				break;
		}
		th.coords.x -= imgWidth / 2;
		th.coords.y -= imgHeight / 2;
		
	})(this, c.width(), c.height(), imgWidth, imgHeight);

	// init html
	var that = this;
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

			
	// enemy object methods

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


