//var c = document.getElementsByTagName('canvas')[0];
//var cx = c.getContext('2d');

//var pc = document.getElementById('pseudocanvas');
//cx.fillRect(4,4,50,50);
var c = $('#pseudocanvas');
var CENTER = {X: c.width() /2, Y: c.height() / 2};


function Enemy (id) {
	
	var imgWidth = 50,
		imgHeight = 50,
		img_el,
		html_el,
		element_id = 'enemy' + id,
		coords = {x: 0, y: 0},
		rotation = 0;

	// init position
	(function init(w, h) {
		var q = Math.floor(Math.random() * 4);
		var w = c.width(),
			h = c.height();

		switch (q){
			case 0:
				coords.x = Math.random() * w;
				break;
			case 1:
				coords.x = w;
				coords.y = Math.random() * h;
				rotation = 90;
				break;
			case 2:
				coords.x = Math.random() * w;
				coords.y = h;
				rotation = 180;
				break;
			case 3:
				coords.y = Math.random() * h;
				rotation = 270;
				break;
		}
		coords.x -= imgWidth / 2;
		coords.y -= imgHeight / 2;
		
	})();

	// init html
	//(function init_html(){
	var	img_el = $('<img>', {
					"id": element_id,
					"class": "enemy",
					src: 'files/img/lebka.png',
					width: imgWidth
					//"height": imgHeight
				}).css({
					top: coords.x,
					left: coords.y
				});
	var	word_el = $('<div>').addClass('word')
						.css({
								top: coords.x,
								left: coords.y
						}).text('skdjflsjdflkj');
	
		c.append(img_el);	
		c.append(word_el);
	//})();
	this.refresh = function (angle, length) {
		var move = function() {
						img_el.animate(	{
							top: coords.y,
							left: coords.x
						}, {
							duration: 200
						});
						word_el.animate(	{
							top: coords.y - 10,
							left: coords.x
						}, {
							duration: 200
						});
					};

		rotation += angle;

		coords.x += Math.cos(Math.PI*(rotation+90)/180) * length;
		coords.y += Math.sin(Math.PI*(rotation+90)/180) * length;
		
		// wrap
		coords.x = coords.x > c.width() - imgWidth/2	? 0-imgWidth/2: coords.x;
		coords.x = coords.x < -imgWidth/2				? c.width() - imgWidth/2: coords.x;
		coords.y = coords.y > c.height() -imgHeight/2 	? 0-imgHeight/2: coords.y;
		coords.y = coords.y < -imgHeight/2 				? c.height() - imgHeight/2: coords.y;

		img_el.rotate({
					animateTo: rotation,
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
			cur_enemy.refresh(Math.random()*20-10, 10);
		}
	},
	addEnemy: function () {
		GAME.enemies.push(new Enemy(GAME.enemies.length));
	}

};

//GAME.addEnemy();

var refresh = window.setInterval(GAME.refresh_all, 700);
//var	addEnemy_timer = window.setInterval(GAME.addEnemy, 5000);


