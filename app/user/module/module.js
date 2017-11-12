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