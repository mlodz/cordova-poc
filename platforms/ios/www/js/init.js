



window.debug_text = "\nDEBUG:";


document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady(){
    // navigator.splashscreen is not defined until after documentReady event
    if(window.analytics) {
	// Google Analytics Plugin: https://github.com/danwilson/google-analytics-plugin
	window.analytics.startTrackerWithId('pub-2491043515341375');
    }
    if(window.googleplaygame) {
	var auth_data = window.googleplaygame.auth();
	alert("attempting to authenticate googleplaygame");
	alert(JSON.stringify(auth_data));

	googleplaygame.showAllLeaderboards();

    }

}

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'game');

var bootState = {
    create: function() {
	console.log("Boot State: Create");
	game.physics.startSystem(Phaser.Physics.ARCADE); // maybe we don't need this
	game.state.start('load');
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
	//game.load.image('background', 'assets/images/lemon_bg_1920x1200.jpg');
	// game.load.image('background', 'assets/images/whitestone.jpg');
	game.load.image('background', 'assets/images/painted-wood.jpg');

    },
    create: function() {
	console.log("LoadState: Create");
	game.state.start('play');
    }
};


game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');


