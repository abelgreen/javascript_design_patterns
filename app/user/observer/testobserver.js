const Observer = require('./observer');

(function (win, $) {
   'use strict';
   $(win.document).ready(function () {
   let ulElem = $('.advert');
   let btnChecktEvent = $('#checkEvent');
   const fun = function(){
    ulElem.append('<li>It`s over!!!</li>');
    };
    Observer.eventDispatcherDecorator(btnChecktEvent);
    $('#btnAdd').click(function () {       
        btnChecktEvent.addEvent('over',fun);
    });
    $('#btnRemove').click(function () {      
        btnChecktEvent.removeEvent('over',fun);
    });
    btnChecktEvent.click(function(){
        btnChecktEvent.dispatchEvent({type:'over'});
    });
});
})(window, jQuery);