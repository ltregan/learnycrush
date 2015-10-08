/**
 * Created by loic on 10/7/2015.
 */

var seq = require("./Sequence");

var Lesson = function (questions, startQuestion) {
    console.log( questions );
    if( ! questions )
        console.log( "XXXXXXXXXXXXXXXX" );
    this.sequence = new seq.LinearSequence(  questions );
};


Lesson.prototype.nextTest = function() {
    return this.sequence.nextTest();
}


exports.Lesson = Lesson;

