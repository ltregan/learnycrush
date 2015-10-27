/**
 * Created by loic on 10/7/2015.
 */


var sequence = require("../Sequence");
var mocha = require("mocha");
var assert = require("assert");


var data = {
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



/*
describe('Sequential', function() {
    var lesson  = new card.Lesson( data );
    var c =0;
    for( var g in data ) {
        var test = lesson.nextTest();
        it(c, function(){
            test.question.should.equal( c.toString() );
            test.choices[0].should.equal( data[c] );
        });
        c++;
    }
});
*/



describe("RandomSequence", function() {

    describe("stress-test normal random iterator", function() {
        var randomSequence = new sequence.RandomSequence(data, 1, 4);
        var i = 0;
        while (!randomSequence.done()) {
            var test = randomSequence.nextTest();
            randomSequence.test(test.question, data[test.question]);
            i++;
        }
        it( "should take 10 questions before exhausting the lesson", function(){
            assert.equal(i, sequence.RandomSequence.TEST_SET * sequence.RandomSequence.REPEAT_SUCCESS);
        });
    });

    describe("mocked-out iterator", function() {
        // test should go to next question after 2 tries
        var randomSequence = new sequence.RandomSequence(data, 1, 4);
        randomSequence.iterator = function () {
            return 1;
        };
        var test;
        it("first choice presented REPEAT_SUCCESS time", function(){
            for (var i = 0; i < sequence.RandomSequence.REPEAT_SUCCESS; i++) {
                test = randomSequence.nextTest();
                assert.equal(test.question, "13", "try #" + i + ": same question");
                randomSequence.test("13", "dreizehn");
            }
            test = randomSequence.nextTest();
            assert.equal(test.question, "14", "try #" + i + ":move next question.");
        });
    });
});


