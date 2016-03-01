/// TODO: clean this up, namespace it

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
function get_special_level() {
    var special_levels = shuffle([
	[
	    shuffle(["⚁", "⚂", "⚃"]), // 2, 3, 4
	    shuffle(["⚀", "⚄", "⚅"]), // 1, 5, 6
	    shuffle(["⚁", "⚂", "⚃"]), // 2, 3, 4
	    shuffle(["⚀", "⚄", "⚅"]), // 1, 5, 6
	    shuffle(["⚁", "⚂", "⚃"]), // 2, 3, 4
	    shuffle(["⚀", "⚄", "⚅"]), // 1, 5, 6
	    shuffle(["⚁", "⚂", "⚃"]), // 2, 3, 4
	    shuffle(["⚀", "⚄", "⚅"]), // 1, 5, 6
	    shuffle(["⚁", "⚂", "⚃"]), // 2, 3, 4
	    shuffle(["⚀", "⚄", "⚅"]), // 1, 5, 6
	],
	[
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	    shuffle(['x', 'y', 'z']),
	],
	[
	    shuffle(['m', 'j', 'o']),
	    shuffle(['n', 'i', 'a']),
	    shuffle(['m', 'j', 'o']),
	    shuffle(['n', 'i', 'a']),
	    shuffle(['m', 'j', 'o']),
	    shuffle(['n', 'i', 'a']),
	    shuffle(['m', 'j', 'o']),
	    shuffle(['n', 'i', 'a']),
	    shuffle(['m', 'j', 'o']),
	    shuffle(['n', 'i', 'a']),
	],
	[
	    shuffle(['a', 'B', 'd']),
	    shuffle(['A', 'b', 'D']),
	    shuffle(['a', 'B', 'd']),
	    shuffle(['A', 'b', 'D']),
	    shuffle(['a', 'B', 'd']),
	    shuffle(['A', 'b', 'D']),
	    shuffle(['a', 'B', 'd']),
	    shuffle(['A', 'b', 'D']),
	    shuffle(['a', 'B', 'd']),
	    shuffle(['A', 'b', 'D']),
	],
	[
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	    shuffle(["⛄", "⚓", "⚡"]), // anchor, lightning, snowman
	]
    ]);
    return special_levels[0];
}


function make_set(dimension_count) {
    var dimensions = [
        shuffle(["1", "2", "3"]),
        shuffle(["A", "B", "C"]),
        shuffle(["x", "y", "z"]),

        shuffle(["$", "@", "&"]),


        shuffle(["X", "Y", "Z"]),
        shuffle(["I", "O", "U"]),
        shuffle(["J", "K", "L"]),
        shuffle(["7", "8", "9"]),

        shuffle(["⛳", "⛵", "⛺"]), // flag, sailboat, tent
        shuffle(["⚁", "⚂", "⚃"]), // dice

        shuffle(["x", "y", "z"]),
        shuffle(["x", "y", "z"]),
        shuffle(["x", "y", "z"]),
        shuffle(["x", "y", "z"]),


    ];

    if(randint(0, 10) == 1) {
	dimensions = get_special_level();
    }

    if(dimension_count === undefined) {
	dimension_count = 3;
    }
    if(dimension_count < 2) {
	dimension_count = 2;
    }
    if(dimension_count > dimensions.length) {
	dimension_count = dimensions.length;
    }
    if(dimension_count > 10) {
	dimension_count = 10;
    }

    //var dimension_count = dimensions.length;


    var dimensions = shuffle(dimensions.slice(0, dimension_count));

    // must be at least two unstable stable dimensions
    var stable_dimensions = [false, false];
    while(stable_dimensions.length < dimension_count) {
	stable_dimensions.push(Boolean(randint(0, 1))); // random true or false
    }
    stable_dimensions = shuffle(stable_dimensions);
    console.log("stable:", stable_dimensions);

    var dimension_length = 3;
    
    var cards = [];
    for(var iteration=0; iteration < dimension_length; iteration++) {
        var card = "";
        for(var dimension_number=0; dimension_number < dimension_count; dimension_number++) {
            if(stable_dimensions[dimension_number]) {
                card += dimensions[dimension_number][0];
            } else {
                card += dimensions[dimension_number][iteration];

            }
        }
        cards.push(card);
    }
    
    var iter_count = 0;
    // assumes we will never have only one stable dimension
    nonset_card = cards[0];
    while(cards.indexOf(nonset_card) > -1) {
        nonset_card = "";
        for(var dimension_number=0; dimension_number < dimension_count; dimension_number++) {
            if(stable_dimensions[dimension_number]) {
                nonset_card += dimensions[dimension_number][0];
            } else {
                nonset_card += dimensions[dimension_number][Math.floor(Math.random()*dimension_length)];
            }
        }
        console.log("nonset card:", nonset_card);
        iter_count++;
        if(iter_count > 10) {
            return;
        }
    }

    console.log(cards, nonset_card);

    var index = randint(0, 4)
    cards.splice(index, 0, nonset_card); // insert nonset_card at a random index
    console.log("nonset card:", nonset_card);
    return {'cards': cards, 'target_index': index};

    //return {'set': cards, 'nonset': nonset_card};
}
