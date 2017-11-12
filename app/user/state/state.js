(function (win, $) {
    'use strict';
 let State = (function(){   
    function RedState(obj){
        let on = 'red',
            off = 'rgba(255,0,0,0.25)',
            _nextState;
        this.nextState = function(ns){
            _nextState = ns;
        };
        this.start = function(){
            obj.color(on);
           // setTimeout(binder(_nextState,_nextState.start),1000);
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },3000);
        };
    }
    function YellowState(obj){
        let on = 'yellow',
            off = 'rgba(255,255,0,0.25)',
            _nextState;
        this.nextState = function(ns){
            _nextState = ns;
        };
        this.start = function(){
            obj.color(on);           
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },2000);
        };
    }
    function GreenState(obj){
        let on = 'green',
            off = 'rgba(0,255,0,0.25)',
            _nextState;
        this.nextState = function(ns){
            _nextState = ns;
        };
        this.start = function(){
            obj.color(on);          
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },4000);
        };
    }
    return {
        RedState:RedState,
        YellowState:YellowState,
        GreenState:GreenState               
    };
})();
        module.exports = State;
})(window, jQuery);