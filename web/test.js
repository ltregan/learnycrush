/**
 * Created by loic on 10/7/2015.
 */






var QUnit = require("./bower_components/qunit/qunit/qunit.js");
var sequence = require("./Sequence");
var card = require("./card");


var data = {
    "1": "ein",
    "2": "zwei",
/*    "3": "drei", */
    "4": "vier",
    "5": "fünf",
    "6": "sechs",
    "7": "sieben",
    "8": "acht",
    "9": "neun"
};


    var lesson  = new card.Lesson( data );
    for( var g in data ) {
        console.log( "data="+g+" "+data[g] );
        var test = lesson.nextTest();
        console.log( "test="+test.question+" "+test.choices[0] );
    }







