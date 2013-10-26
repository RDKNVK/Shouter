//var c = document.getElementsByTagName('canvas')[0];
//var cx = c.getContext('2d');

//var pc = document.getElementById('pseudocanvas');
//cx.fillRect(4,4,50,50);
var c = $('#pseudocanvas');
var CENTER = {X: c.width() /2, Y: c.height() / 2};
var WORDS = ['Acinetobacter infections', 'Actinomycosis', 'Amebiasis', 'Anaplasmosis', 'Anthrax', 'Ascariasis', 'Aspergillosis', 'Astrovirus infection', 'Babesiosis', 'Bacterial pneumonia', 'Bacteroides infection', 'Balantidiasis', 'Baylisascaris infection', 'Black piedra', 'Blastomycosis', 'Borrelia infection', 'Brucellosis', 'Bubonic plague', 'Burkholderia infection', 'Buruli ulcer', 'Campylobacteriosis', 'Cat-scratch disease', 'Cellulitis', 'Chancroid', 'Chickenpox', 'Chlamydia', 'Cholera', 'Chromoblastomycosis', 'Clonorchiasis', 'Coccidioidomycosis', 'Cryptococcosis', 'Cryptosporidiosis', 'Cyclosporiasis', 'Cysticercosis', 'Cytomegalovirus infection', 'Dengue fever', 'Dientamoebiasis', 'Diphtheria', 'Diphyllobothriasis', 'Dracunculiasis', 'Echinococcosis', 'Ehrlichiosis', 'Enterococcus infection', 'Enterovirus infection', 'Epidemic typhus', 'Fasciolopsiasis', 'Fasciolosis', 'Filariasis', 'Fusobacterium infection', 'Geotrichosis', 'Giardiasis', 'Glanders', 'Gnathostomiasis', 'Gonorrhea', 'Hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Herpes simplex', 'Histoplasmosis', 'Hookworm infection', 'Hymenolepiasis', 'Influenza', 'Isosporiasis', 'Kawasaki disease', 'Keratitis', 'Kuru', 'Lassa fever', 'Leishmaniasis', 'Leprosy', 'Leptospirosis', 'Listeriosis', 'Lymphocytic choriomeningitis', 'Malaria', 'Measles', 'Meningitis', 'Meningococcal disease', 'Metagonimiasis', 'Microsporidiosis', 'Monkeypox', 'Mumps', 'Mycoplasma pneumonia', 'Mycetoma', 'Myiasis', 'Nocardiosis', 'Paragonimiasis', 'Pasteurellosis', 'Plague', 'Pneumococcal infection', 'Pneumonia', 'Poliomyelitis', 'Prevotella infection', 'Psittacosis', 'Q fever', 'Rabies', 'Rat-bite fever', 'Rhinosporidiosis', 'Rhinovirus infection', 'Rickettsial infection', 'Rickettsialpox', 'Rotavirus infection', 'Rubella', 'Salmonellosis', 'Scabies', 'Schistosomiasis', 'Sepsis', 'Smallpox', 'Sporotrichosis', 'Staphylococcal infection', 'Strongyloidiasis', 'Syphilis', 'Taeniasis', 'Tetanus', 'Tinea nigra', 'Trinochccliasis', 'Trichinlosis', 'Trichomoniasis', 'Tuberculosis', 'Tularemia', 'Valley fever', 'Viral pneumonia', 'Yersiniosis', 'Yellow fever', 'Zygomycosis']

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
						}).text(WORDS[Math.floor(WORDS.length * Math.random())]);
	
		c.append(img_el);	
		c.append(word_el);
	//})();

	var move = function(length) {
		length = length || 10;

		coords.x += Math.cos(Math.PI*(rotation+90)/180) * length;
		coords.y += Math.sin(Math.PI*(rotation+90)/180) * length;
		
		// will we wrap?
		var wrap =	coords.x > c.width() - imgWidth/2 || 
					coords.x < -imgWidth/2 || 
					coords.y > c.height() -imgHeight/2 ||
					coords.y < -imgHeight/2 ? true : false;

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
		}
	};

	var rotate = function (angle, callb) {
		rotation += angle;

		img_el.rotate({
					animateTo: rotation,
					callback: move(4),
					duration: 20
		});
	}

	this.refresh = function () {

		rotate(Math.random()*20-10, move(10));
	}
	
}

var GAME = {
	enemies: [],
	level: 1,	
	refresh_all: function () {
		for (var i = 0; i < GAME.enemies.length; i++){
			var cur_enemy = GAME.enemies[i];
			cur_enemy.refresh();
		}
	},
	addEnemy: function () {
		GAME.enemies.push(new Enemy(GAME.enemies.length));
	}

};


var refresh = window.setInterval(GAME.refresh_all, 700);
//var	addEnemy_timer = window.setInterval(GAME.addEnemy, 5000);


