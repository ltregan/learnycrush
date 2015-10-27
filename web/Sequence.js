

/****************************
 *      AbstractSequence    *
 ****************************/

var AbstractSequence = function( questions, startQuestion ){
    if( ! questions )
        throw "questions == null";
    if( ! startQuestion )
        startQuestion = 0;
    this.questions = questions;
    this.currentQuestion = startQuestion;
    this.startQuestion = startQuestion;
}

AbstractSequence.prototype.nextTest = function() {
    throw "nextTest not implemented.";
}

/****************************
 *        LinearSequence    *
 ****************************/

var LinearSequence = function( questions, currentQuestion ){
    AbstractSequence.call(this, questions, currentQuestion) ;
}

LinearSequence.prototype = Object.create( AbstractSequence.prototype );


LinearSequence.prototype.nextTest = function() {
    if( this.done() )
        throw "Done.";
    var result = {};
    var key = Object.keys( this.questions)[ this.currentQuestion ];
    result.question = key;
    result.choices = [];
    result.choices.push(  this.questions[key]  );

    this.currentQuestion = this.currentQuestion + 1;
    return result;
}

LinearSequence.prototype.done = function() {

    return this.currentQuestion == this.questions.length;
}


/****************************
 *        RandomSequence
 ******************************/

var RandomSequence =  function( questions, currentQuestion, choiceCount, iterator ){
    AbstractSequence.call(this, questions, currentQuestion);

    this.choiceCount = choiceCount;
    this.viewCount = [];
    this.rightAnswerCount = [];
    this.iterator =  getRandomInt;

    var questionsExtract = {};
    var keys = Object.keys(questions);
    var max =  currentQuestion + RandomSequence.TEST_SET >= questions.length ? questions.length : currentQuestion + RandomSequence.TEST_SET ;
    for( var i = this.currentQuestion; i < max; i++) {
        questionsExtract[ keys[i] ] =  questions[ keys[i] ];
        this.rightAnswerCount[ keys[i] ] = 0;
        this.viewCount.push( 0 );
    }
    this.questions = questionsExtract;
    this.questionsLeft = Object.keys( questionsExtract );
}

RandomSequence.TEST_SET = 5;
RandomSequence.REPEAT_SUCCESS = 2;

RandomSequence.prototype = Object.create( AbstractSequence.prototype );


RandomSequence.prototype.test = function(question, userAnswer) {

    var keys = Object.keys( this.questions );

    var answer = this.questions[ question ];
    if( answer === userAnswer ){
        var c = ++this.rightAnswerCount[ question ];
        if( c == RandomSequence.REPEAT_SUCCESS ) {
            var pos = this.questionsLeft.indexOf(question);
            this.questionsLeft.splice(pos,1);
        }return true;
    } else
        return false;
}


RandomSequence.prototype.done = function() {
    return this.questionsLeft.length == 0;

}

function getRandomInt(max) {
    var result = Math.floor(Math.random() * max);
    return result;
}


RandomSequence.prototype.nextTest = function() {
    if (this.done())
        throw "Done.";


    var questionPos = this.iterator( this.questionsLeft.length );
    var question = this.questionsLeft[  questionPos ];
    console.log( this.rightAnswerCount );

    var answerPos = this.iterator( this.choiceCount );

    var choices = [];
    var bag = Object.keys( this.questions );
    for( var i= 0; i < this.choiceCount; i++ ) {
        var x = -1;
        if (i == answerPos) // make sure the right question is selected at least once
            x = bag.indexOf(question);
        if(  x == -1 ) // -1 means it is not the turn of our question, or it is but has been
            x = this.iterator(bag.length);
        choices.push( this.questions[ bag[x] ] );
        bag.splice( x,1 );
    }
    return { "question": question, "choices": choices};
}

exports.LinearSequence = LinearSequence;
exports.RandomSequence = RandomSequence;
exports.getRandomInt = getRandomInt;

