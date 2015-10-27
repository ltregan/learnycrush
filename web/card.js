/**
 * Created by loic on 10/7/2015.
 */

var sequence = require("./Sequence");


var data = {
    "10": "zehn",
    "11": "elf",
    "12": "zwölf",
    "13": "dreizehn",
    "14": "vierzehn",
    "15": "fünfzehn",
    "16": "sechzehn",
    "17": "siebzehn",
    "18": "achtzehn",
    "19": "neunzehn"
};


var randomSequence;
var test;

function paint(test){
    dust.render('card', test, function(err, out) {
        var x = document.getElementById('card');
        x.innerHTML = out;
    });
}

exports.init = function(){
    randomSequence = new sequence.RandomSequence( data, 0, 4);
    test = randomSequence.nextTest();
    paint( test );
}


exports.choiceOnClick = function  choiceOnClick(obj){
    var id = document.getElementById("question");
    if( ! randomSequence.test( id.innerHTML, obj.innerHTML ) ) {
        $(obj).removeClass("openChoice");
        $(obj).addClass("wrongChoice");
    } else {
        test = randomSequence.nextTest();
        paint(test);
    }
}

$.get( "card.dust", function(dust_template) {
    var compiled = dust.compile(dust_template, 'card');
    dust.loadSource(compiled);
    exports.init();
});

