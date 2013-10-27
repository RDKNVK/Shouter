// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


// from: http://stackoverflow.com/questions/6524288/jquery-event-for-user-pressing-enter-in-a-textbox
//use it:
//$('textarea').pressEnter(function(){alert('here')})
$.fn.pressEnter = function(fn) {  

    return this.each(function() {  
        $(this).bind('enterPress', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 13)
            {
              $(this).trigger("enterPress");
            }
        })
    });  
 }; 



var c = $('#pseudocanvas');
var CENTER_BOX = {X: 235, Y: 235};
var WORDS = ['Acinetobacter infections', 'Actinomycosis', 'Amebiasis', 'Anaplasmosis', 'Anthrax', 'Ascariasis', 'Aspergillosis', 'Astrovirus infection', 'Babesiosis', 'Bacterial pneumonia', 'Bacteroides infection', 'Balantidiasis', 'Baylisascaris infection', 'Black piedra', 'Blastomycosis', 'Borrelia infection', 'Brucellosis', 'Bubonic plague', 'Burkholderia infection', 'Buruli ulcer', 'Campylobacteriosis', 'Cat-scratch disease', 'Cellulitis', 'Chancroid', 'Chickenpox', 'Chlamydia', 'Cholera', 'Chromoblastomycosis', 'Clonorchiasis', 'Coccidioidomycosis', 'Cryptococcosis', 'Cryptosporidiosis', 'Cyclosporiasis', 'Cysticercosis', 'Cytomegalovirus infection', 'Dengue fever', 'Dientamoebiasis', 'Diphtheria', 'Diphyllobothriasis', 'Dracunculiasis', 'Echinococcosis', 'Ehrlichiosis', 'Enterococcus infection', 'Enterovirus infection', 'Epidemic typhus', 'Fasciolopsiasis', 'Fasciolosis', 'Filariasis', 'Fusobacterium infection', 'Geotrichosis', 'Giardiasis', 'Glanders', 'Gnathostomiasis', 'Gonorrhea', 'Hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Herpes simplex', 'Histoplasmosis', 'Hookworm infection', 'Hymenolepiasis', 'Influenza', 'Isosporiasis', 'Kawasaki disease', 'Keratitis', 'Kuru', 'Lassa fever', 'Leishmaniasis', 'Leprosy', 'Leptospirosis', 'Listeriosis', 'Lymphocytic choriomeningitis', 'Malaria', 'Measles', 'Meningitis', 'Meningococcal disease', 'Metagonimiasis', 'Microsporidiosis', 'Monkeypox', 'Mumps', 'Mycoplasma pneumonia', 'Mycetoma', 'Myiasis', 'Nocardiosis', 'Paragonimiasis', 'Pasteurellosis', 'Plague', 'Pneumococcal infection', 'Pneumonia', 'Poliomyelitis', 'Prevotella infection', 'Psittacosis', 'Q fever', 'Rabies', 'Rat-bite fever', 'Rhinosporidiosis', 'Rhinovirus infection', 'Rickettsial infection', 'Rickettsialpox', 'Rotavirus infection', 'Rubella', 'Salmonellosis', 'Scabies', 'Schistosomiasis', 'Sepsis', 'Smallpox', 'Sporotrichosis', 'Staphylococcal infection', 'Strongyloidiasis', 'Syphilis', 'Taeniasis', 'Tetanus', 'Tinea nigra', 'Trinochccliasis', 'Trichinlosis', 'Trichomoniasis', 'Tuberculosis', 'Tularemia', 'Valley fever', 'Viral pneumonia', 'Yersiniosis', 'Yellow fever', 'Zygomycosis']

function Enemy (id) {
	
	var imgWidth = 50,
		imgHeight = 69,
		img_el,
		html_el,
		element_id = 'enemy' + id,
		coords = {x: 0, y: 0},
		rotation = 0,
		this_word = WORDS[Math.floor(WORDS.length * Math.random())];

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
						}).text(this_word);
	
		c.append(img_el);	
		c.append(word_el);
	//})();
	var collision = function (x, y) {
		var x1 = (c.width() - CENTER_BOX.X)/2,
			x2 = x1 + CENTER_BOX.X,
			y1 = (c.height() - CENTER_BOX.Y)/2,
			y2 = y1 + CENTER_BOX.Y;

		if (x < x2 && x > x1 && y < y2 && y > y1)
			return true;
		else 
			return false;
	}
	// test
	/*for(var i = 0, ii = 810; i < ii; i+=10) {
		for(var j = 0, jj = 810; j < jj; j+=10) {
			collision(i,j) ? console.log(i,j,collision(i,j)): ; 
		}}*/

	var move = function(length) {
		length = length || 10;

		coords.x += Math.cos(Math.PI*(rotation+90)/180) * length;
		coords.y += Math.sin(Math.PI*(rotation+90)/180) * length;
		
		// will we wrap?
		var wrap =	coords.x > c.width() - imgWidth/2 	|| 
					coords.x < -imgWidth/2 				|| 
					coords.y > c.height() -imgHeight/2 	||
					coords.y < -imgHeight/2 			? true : false;

		if (wrap) {
			// first wrap coords
			coords.x = coords.x > c.width() - imgWidth/2	? 0-imgWidth/2: coords.x;
			coords.x = coords.x < -imgWidth/2				? c.width() - imgWidth/2: coords.x;
			coords.y = coords.y > c.height() -imgHeight/2 	? 0-imgHeight/2: coords.y;
			coords.y = coords.y < -imgHeight/2 				? c.height() - imgHeight/2: coords.y;
			// then move without animation
			img_el.css({top: coords.y, left: coords.x});
			word_el.css({top: coords.y, left: coords.x});
			
		} else {

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

			if (collision(coords.x, coords.y))
				console.log('CHCIP!');
		}
	};

	var rotate = function (angle, callb) {
		rotation = (rotation + angle) % 360;

		img_el.rotate({
					animateTo: rotation,
					callback: move(4),
					duration: 20
		});
	}

	this.refresh = function () {

		rotate(Math.random()*20-10, move(10));
	}
	this.getWord = function () {
		return this_word;
	}
	this.destroy = function () {
		// body...
	}

}

var GAME = {
	enemies: [],
	level: 1,	
	refreshAll: function () {
		for (var i = 0; i < GAME.enemies.length; i++){
			var cur_enemy = GAME.enemies[i];
			cur_enemy.refresh();
		}
	},
	addEnemy: function () {
		GAME.enemies.push(new Enemy(GAME.enemies.length));
	}, 
	tryWord: function (word) {
		for (var i = 0, ii = GAME.enemies.length; i < ii; i++){
			var cur = GAME.enemies[i];
			if (cur !== undefined && (cur.getWord() === word || cur.getWord().toLowerCase() === word)) {
				cur.destroy();
				GAME.enemies.remove(i);
			}
		}
	}

};

$('input').pressEnter(function(){
	var input = $(this);
	
	GAME.tryWord(input.val());
	input.val('');
	input.focus();
});

// input should always have focus
$(window).click(function () {
	$('input').focus();
});


var refresh = window.setInterval(GAME.refreshAll, 700);
//var	addEnemy_timer = window.setInterval(GAME.addEnemy, 5000);


