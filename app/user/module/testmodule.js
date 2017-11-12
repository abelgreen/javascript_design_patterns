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