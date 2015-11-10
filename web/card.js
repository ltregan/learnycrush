/**
 * Created by loic on 10/7/2015.
 */

"use strict";

let sequence = require("./Sequence");

let data = {
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


let randomSequence;
let test;

function paint(randomSequence){
    if( randomSequence.done() ){
        let x = document.getElementById('card');
        x.innerHTML = "<h1><br><br><br>Done !<br><br><br></h1><meter value=\"100\" max=\"100\"></meter>";
    }else {
        let test = randomSequence.nextTest();
        dust.render('card', test, function (err, out) {
            let x = document.getElementById('card');
            x.innerHTML = out;
            let a = document.getElementById("answer");
            if( a )
                a.focus();_
        });
    }
}

exports.init = function(){
    randomSequence = new sequence.RandomSequence( data, 0, 4);
    paint( randomSequence );
}


exports.choiceOnClick = function  choiceOnClick(obj){
    let id = document.getElementById("question");
    if( ! randomSequence.test( id.innerHTML, obj.innerHTML ) ) {
        $(obj).removeClass("openChoice");
        $(obj).addClass("wrongChoice");
    } else {
        paint(randomSequence);
    }

}

exports.choiceKeyUp = function(event){
    if( event.keyCode != 13)
        return;
    let q = document.getElementById("question");
    let a = document.getElementById("answer");
    if( randomSequence.test( q.innerHTML, a.value ) ) {
        paint(randomSequence);
    }
};



$.get( "card.dust", function(dust_template) {
    let compiled = dust.compile(dust_template, 'card');
    dust.loadSource(compiled);
    exports.init();
});


