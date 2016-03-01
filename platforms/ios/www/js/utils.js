window.make_WinLoseCounter = function(init_win, init_losses) {
    var wins = init_win || 0;
    var losses = init_losses || 0;
    console.log("wins:", wins);
    console.log("losses:", losses);
    function win() {
	wins++;
    };
    function lose() {
	losses++;
    };
    function message() {
	return wins + " / " + losses;
    };
    function get_wins() {
	return wins;
    }
    function get_losses() {
	return losses;
    }
    function get_score() {
	return wins - (2*losses);
    }
    function reset() {
	wins = 0;
	losses = 0;
    }

    return {
	win: win,
	lose: lose,
	wins: get_wins,
	losses: get_losses,
	score: get_score,
	reset: reset,
	total: function() { return wins + losses;},
	message: message
    };
};



window.randint = function(lower, upper) {
    // includes lower, but not upper
    return Math.round(Math.random()*(upper-lower) + lower);
}
