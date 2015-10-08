

/****************************
 *        AbstractSequence
 ******************************/

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
 *        LinearSequence
 ******************************/

var LinearSequence = function( questions, currentQuestion ){
    AbstractSequence.call(this, questions, currentQuestion) ;
}

LinearSequence.prototype = Object.create( AbstractSequence.prototype );


LinearSequence.prototype.nextTest = function() {
    if( this.done() ){
        throw "Done.";
    }
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

var TEST_SET = 5;
var REPEAT_SUCCESS = 2;

var RandomSequence =  function( questions, currentQuestion, choiceCount ){
    AbstractSequence.call(this, questions, currentQuestion);

}

RandomSequence.prototype = Object.create( AbstractSequence.prototype );


RandomSequence.prototype.init = function() {
    if( this._init )
        return;
    this._init = true;
    var questionsExtract = [];
    var keys = Object.keys(this.questions);
    for( var i = currentQuestion; i < TEST_SET && i < questions.lenght; i++) {
        questionsExtract[keys[i]] = questions[keys[i]];
        this.viewCount[keys[i]] = 0;
    }
    this.choiceCount = choiceCount;
    this.questions = questionsExtract;
}


RandomSequence.prototype.test = function(question, userAnswer) {

    var keys = Object.keys( this.questions );

    var answer = this.questions[ question ];
    if( answer === userAnswer ){
        var c = this.rightAnswer[ question ]++;
        if( c == REPEAT_SUCCESS )
            this.missingQuestion.remove( question );
        return true;
    } else
        return false;
}

RandomSequence.prototype.done = function() {
    return this.missingQuestions.length == 0;

}

RandomSequence.prototype.nextTest = function() {
    init();
    if (this.done())
        throw "Done.";


    var questionPos = Math.random( this.questions.length );
    var rightAnswerPos = Math.random( this.choices );
    var choice = [];

    var bag = Object.keys(this.questions);
    var question = bag[ questionPos ];
    for( var i= 0; i < this.choices; i++ ){
        var choice;
        if( i == rightAnswerPos )
            choice = this.questions[ bag[questionPos] ];
        else {
            var x = Math.random(bag.length);
            choice = this.questions[bag[x]];
        }
        bag.remove( choice );
        choices.push( choice );
    }
    return { 'question': question, 'choices': choices};
}

exports.LinearSequence = LinearSequence;
exports.RandomSequence = RandomSequence;




