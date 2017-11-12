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