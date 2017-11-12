(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (win, $) {
    'use strict';
 let Observer = (function(){      
    function eventDispatcherDecorator(o){
        let list = {};
        o.addEvent = function(type,listener){
            if(!list[type]){
                list[type]= [];
            }
            if(list[type].indexOf(listener) === -1){
                list[type].push(listener);
            }
        };
        o.removeEvent = function(type,listener){
            let a =list[type]; 
            if(a){
                let index = a.indexOf(listener);
                if(index>-1){
                    a.splice(index,1);
                }
            }           
        };
        o.dispatchEvent = function(e){
            let aList = list[e.type];
            if(aList){
                if(!e.target){
                    e.target = this;
                }
                for (let index in aList) {
                    if (aList.hasOwnProperty(index)) {
                         aList[index](e);                        
                    }
                }
            }
        };
    }
    
   
    return {
        eventDispatcherDecorator:eventDispatcherDecorator  
    };
})();
        module.exports = Observer;
})(window, jQuery);
},{}],2:[function(require,module,exports){
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
},{"./observer":1}]},{},[2]);
