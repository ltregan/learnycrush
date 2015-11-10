
"use strict";

/****************************
 *      AbstractSequence    *
 ****************************/

class AbstractSequence{
    constructor( questions, startQuestion ){
        if( ! questions )
            throw "questions == null";
        if( ! startQuestion )
            startQuestion = 0;
        this.questions = questions;
        this.currentQuestion = startQuestion;
        this.startQuestion = startQuestion;
    }
}

AbstractSequence.prototype.nextTest = function() {
    throw "nextTest not implemented.";
}


/****************************
 *        RandomSequence
 ******************************/

class RandomSequence extends AbstractSequence {

    constructor(questions, currentQuestion, choiceCount, iterator) {
        super(questions, currentQuestion);

        this.choiceCount = choiceCount;
        this.rightAnswerCountByQuestion = [];
        this.rightAnswerCountTotal = 0;
        this.iterator = getRandomInt;

        let questionsExtract = {};
        let keys = Object.keys(questions);
        let max = currentQuestion + RandomSequence.TEST_SET >= questions.length ? questions.length : currentQuestion + RandomSequence.TEST_SET;
        for (let i = this.currentQuestion; i < max; i++) {
            questionsExtract[keys[i]] = questions[keys[i]];
            this.rightAnswerCountByQuestion[keys[i]] = 0;
        }
        this.questions = questionsExtract;
        this.questionsLeft = Object.keys(questionsExtract);
    }

    getProgress(question, userAnswer) {
        return Math.floor(this.rightAnswerCountTotal*100 / (RandomSequence.TEST_SET*RandomSequence.REPEAT_SUCCESS));
    }

    test(question, userAnswer) {

        let keys = Object.keys( this.questions );

        let answer = this.questions[ question ];
        if( answer === userAnswer ){
            this.rightAnswerCountTotal++;
            let c = ++this.rightAnswerCountByQuestion[ question ];
            if( c == RandomSequence.REPEAT_SUCCESS ) {
                let pos = this.questionsLeft.indexOf(question);
                this.questionsLeft.splice(pos,1);
            }return true;
        } else
            return false;

    }

    done() {
        return this.questionsLeft.length == 0;
    }

    nextTest() {
        if (this.done())
            throw "Done.";

        let questionPos = this.iterator( this.questionsLeft.length );
        let question = this.questionsLeft[  questionPos ];
        console.log( this.rightAnswerCountByQuestion );

        let answerPos = this.iterator( this.choiceCount );

        let choices = [];
        let bag = Object.keys( this.questions );
        for( let i= 0; i < this.choiceCount; i++ ) {
            let x = -1;
            if (i == answerPos) // make sure the right question is selected at least once
                x = bag.indexOf(question);
            if(  x == -1 ) // -1 means it is not the turn of our question, or it is but has been
                x = this.iterator(bag.length);
            choices.push( this.questions[ bag[x] ] );
            bag.splice( x,1 );
        }
        let useKeyBoard = this.rightAnswerCountByQuestion[ question ] > RandomSequence.SWITCH_TO_KEYBOARD ;
        console.log(this.rightAnswerCountByQuestion[ question ]);

        return { "question": question, "choices": choices, "progress": this.getProgress(),
            keyboard: useKeyBoard };
    }

}


RandomSequence.TEST_SET = 5;
RandomSequence.REPEAT_SUCCESS = 2;

RandomSequence.SWITCH_TO_KEYBOARD = -1;





function getRandomInt(max) {
    let result = Math.floor(Math.random() * max);
    return result;
}



exports.RandomSequence = RandomSequence;
exports.getRandomInt = getRandomInt;

