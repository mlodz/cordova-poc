



window.debug_text = "\nDEBUG:";


document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady(){
    // navigator.splashscreen is not defined until after documentReady event
    if(window.analytics) {
	// Google Analytics Plugin: https://github.com/danwilson/google-analytics-plugin
	window.analytics.startTrackerWithId('pub-2491043515341375');
    }

    var leaderboardId = "CgkI9YjW-eUWEAIQAA";
    if(window.game.setUp) {
	window.game.setUp();

	window.game.onLoginSucceeded = function(result) {
            var playerDetail = result;
            alert('onLoginSucceeded: ' + playerDetail['playerId'] + ' ' + playerDetail['playerDisplayName']);
	};  	
	window.game.onLoginFailed = function() {
            alert('onLoginFailed');
	};
    }


}

var pgame = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'phaser_game');

var bootState = {
    create: function() {
	console.log("Boot State: Create");
	pgame.physics.startSystem(Phaser.Physics.ARCADE); // maybe we don't need this
	pgame.state.start('load');
	initialize_adinterface();
	AdInterface.create_banner();
	AdInterface.prepare_interstitial();
	//AdInterface.show_interstitial();
    }
};

var loadState = {
    preload: function() {
	console.log("Load State: Preload");
	// load assets
	//pgame.load.image('background', 'assets/images/lemon_bg_1920x1200.jpg');
	// pgame.load.image('background', 'assets/images/whitestone.jpg');
	pgame.load.image('background', 'assets/images/painted-wood.jpg');

    },
    create: function() {
	console.log("LoadState: Create");
	pgame.state.start('play');
    }
};


pgame.state.add('boot', bootState);
pgame.state.add('load', loadState);
pgame.state.add('play', playState);

pgame.state.start('boot');


