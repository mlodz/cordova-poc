var playState = {
    preload: function() {

    },
    create: function() {
	if(window.analytics) {
	    window.analytics.trackView('Begin Game');
	}
	this.storage = window.localStorage;

	// create sprites
	var background = pgame.add.image(0, 0, 'background');
	//background.anchor.set(0.5);

	this.title_text = pgame.add.text(
	    pgame.world.centerX,
	    10,
	    " you'll figure it out ", 
	    {
		font: '24px courier',
		backgroundColor: "#ddd",
		fill: '#000'
	    }
	);
	this.title_text.anchor.set(0.5, 0);
	this.score_text = pgame.add.text(
	    pgame.world.centerX,
	    54,
	    "",
	    {
		font: '24px courier',
		backgroundColor: "#ddd",
		fill: '#000' 
	    }
	);
	this.score_text.anchor.set(0.5, 0);

	this.reset_text = pgame.add.text(
	    pgame.world.centerX,
	    98,
	    " reset score ",
	    {
		font: '18px courier',
		backgroundColor: "#ddd",
		fill: '#000' 
	    }
	);
	this.reset_text.anchor.set(0.5, 0);
	this.reset_text.inputEnabled = true;
	this.reset_text.events.onInputUp.add(this.reset_score, this);
	
	var wins = parseInt(this.storage.getItem("wins"));
	var losses = parseInt(this.storage.getItem("losses"));
	this.win_lose_counter = window.make_WinLoseCounter(wins, losses);


	if(navigator.splashscreen) {
	    navigator.splashscreen.hide();
	}

	var card_count = 4;
	this.cards = [];
	var font_size = 70;
	var y_start = 150;
	var y_diff = 90;
	for(var i=0;  i < card_count; i++) {
	    var y = y_start + i*y_diff;
	    
	    var card = pgame.add.text(
		pgame.world.centerX,
		y,
		"", 
		{
		    font: String(font_size)+"px courier",
		    backgroundColor: "#ddd",
		}
	    );
	    card.inputEnabled = true;
	    card.events.onInputUp.add(this.click_card(i), this)	    

	    this.cards.push(card);
	}
	this.begin_level();
    },
    begin_level: function() {
	var total_count = this.win_lose_counter.total();
	if(window.analytics) {
	    window.analytics.trackEvent('Level', 'start', 'score', this.win_lose_counter.total())
	}

	this.print_score();

	this.storage.setItem("wins", this.win_lose_counter.wins());
	this.storage.setItem("losses", this.win_lose_counter.losses());

	var characters = Math.floor(Math.sqrt(this.win_lose_counter.total()));
	var set = make_set(characters);
	var target_index = set['target_index'];
	var card_strings = set['cards'];
	
	this.target_card_index = target_index;

	for(var i=0; i < this.cards.length; i++) {
	    this.cards[i].setText(card_strings[i]);
	    this.cards[i].anchor.set(0.5, 0);
	}
	this.click_enabled = true;

    },
    click_card: function(card_number) {
	return function() {
	    if(!this.click_enabled) {
		return;
	    }
	    if(card_number == this.target_card_index) {
		this.win_level();
	    } else {
		this.lose_level();
	    }
	};
    },
    win_level: function() {
	this.win_lose_counter.win();

	this.cards[0].setText("Yes!");
	this.cards[1].setText("Yes!");
	this.cards[2].setText("Yes!");
	this.cards[3].setText("Yes!");

	var self = this;
	this.click_enabled = false;
	setTimeout(
	    function() { self.begin_level() },
	    500
	);
    },
    lose_level: function() {
	this.win_lose_counter.lose();

	this.cards[0].setText("WRONG");
	this.cards[1].setText("WRONG");
	this.cards[2].setText("WRONG");
	this.cards[3].setText("WRONG");

	var self = this;
	this.click_enabled = false;
	setTimeout(
	    function() { self.begin_level() },
	    500
	);
    },
    reset_score: function() {
	AdInterface.show_interstitial();
	this.win_lose_counter.reset();
	this.print_score();
	AdInterface.prepare_interstitial();
	this.begin_level();
    },

    print_score: function() {
	//var dimensions = "\nDimensions: " + pgame.width + " x " + pgame.height + " : " + window.devicePixelRatio;
	var wins = this.win_lose_counter.wins();
	var losses = this.win_lose_counter.losses();
	var score = this.win_lose_counter.score();
	//this.score_text.setText(" win: " + wins + "   lose: " + losses + " score:" + score + " ");
	this.score_text.setText(" score: " + score + " ");

    },
    update: function() {
    }
};


