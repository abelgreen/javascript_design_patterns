(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (win, $) {
    'use strict';
   
        const cyberTalk = (function () {
            
            var _leadself = 'Me: ',
                _leadcomputer = 'PC: ',
                _aSaid = ['This is a cyber chat'],
                _msgYes = 'Yes, That`s a great idea.',
                _msgNo = 'No, That`s must bea mistake.',
                _aSassystuff = ['Like mold on books, grow myths on history.',
                    'She move like a poem and smiled like a shpinx.',
                    'As long as we don`t die, this gonnoa be one hell of story',
                    'She laughed and the dessert sang.',
                    'You`ve got about as much charm as a dead slug.'
                ];
                 function _echo(msg) {
                    
                    _aSaid.push('<div>' + msg + '</div>');
                    let _aSaidlength = _aSaid.length,
                        start = Math.max(_aSaidlength - 6, 0),
                        out = '';
                    for (let i = start; i < _aSaidlength; i++) {
                        out += _aSaid[i];
                    }
                    $('.advert').html(out);
                    $('#talk span').text(msg);
            
                }
                function talk (msg) {
                    
                    _echo(_leadself + msg);
                }
                function replayYesNo () {
                    
                    const msg = Math.random > 0.5 ? _msgYes : _msgNo;
                    _echo(_leadcomputer + msg);
                }
                function saySassyStuff () {
                    
                    const msg = _aSassystuff[Math.floor(Math.random() * _aSassystuff.length)];
                    _echo(_leadcomputer + msg);
                }  
            return {
                talk:talk,
                replayYesNo:replayYesNo, 
                saySassyStuff:saySassyStuff 
            };
        }
        )();
    
        module.exports = cyberTalk;
})(window, jQuery);
},{}],2:[function(require,module,exports){
const cyberTalk = require('./module');
(function (win,doc, $) {
    'use strict';   
    $(doc).ready(function(){
        
        cyberTalk.talk("This is great");
        cyberTalk.replayYesNo();
        cyberTalk.saySassyStuff();
        cyberTalk.saySassyStuff();
        cyberTalk.saySassyStuff();
        cyberTalk.saySassyStuff();
        cyberTalk.saySassyStuff();
        cyberTalk.saySassyStuff();
    });
    if(!win.cyberTalk){
         win.cyberTalk=cyberTalk;
    }
})(window,document, jQuery);
},{"./module":1}]},{},[2]);
