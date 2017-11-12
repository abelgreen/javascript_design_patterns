(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (win, $) {
    'use strict';
    const AbstractFactory = function () {
        function RedCircle() {

        }
        RedCircle.prototype.create = function () {
            this.item = $('<div class="circle">circ</div>');
            return this;
        };
        function BlueCircle() {

        }
        BlueCircle.prototype.create = function () {
            this.item = $('<div class="circle" style="background: blue">circ</div>');
            return this;
        };

        let CircleFactory = function () {
            this.types = {};
            this.create = function (type) {
                return new this.types[type]().create();
            };
            this.register = function (type, cls) {
                if (cls.prototype.create) {
                    this.types[type] = cls;
                }
            };
        };
        return {
            RedCircle: RedCircle,
            BlueCircle: BlueCircle,
            CircleFactory: CircleFactory
        };
    }();
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = AbstractFactory;
    }
    else {
        window.AbstractFactory = AbstractFactory;      
       
    }
})(window, jQuery);
},{}],2:[function(require,module,exports){
const AbstractFactory = require('./abstractFactory.js');

(function(){
    'use strict';
    //require(['./abstractFactory.js'], function (AbstractFactory) {
        //AbstractFactory is now loaded.
    
const CircleGeneratorSinglton = (function () {
    let instance;
    function init() {
        let _aCircle = [],
            _stage = $('.advert'),
            _cf = new AbstractFactory.CircleFactory();
            _cf.register('red',AbstractFactory.RedCircle);
            _cf.register('blue',AbstractFactory.BlueCircle);
        function _position(circle, left, top) {
            circle.css('left', left);
            circle.css('top', top);
        }
        function create(left, top, type) {
            const circle = _cf.create(type).item;
            _position(circle, left, top);
            return circle;
        }
        function add(circle) {
            _stage.append(circle);
            _aCircle.push(circle);
        }
        function index() {
            return _aCircle.length;
        }
        return {
            index: index,
            create: create,
            add: add
        };
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
module.exports = CircleGeneratorSinglton;
}
else{
window.CircleGeneratorSinglton = CircleGeneratorSinglton;

}
//});
})();
},{"./abstractFactory.js":1}],3:[function(require,module,exports){

const CircleGeneratorSinglton = require('./singlton.js');

(function (win, $) {
    'use strict';
   // require(['./singlton.js'], function (CircleGeneratorSinglton) {
        //CircleGeneratorSinglton is now loaded.
     
$(win.document).ready(function () {
    $('.history').click(function (e) {
        // create the reference to the object
        const cg = CircleGeneratorSinglton.getInstance();
        
        //creation of real object
        const circle = cg.create(e.pageX - 25, e.pageY - 25, 'red');
        // Add the created object to the dom
        cg.add(circle);
    });
    $(document).keypress(function (e) {
        if (e.key === 'a') {
            const cg = CircleGeneratorSinglton.getInstance();
            //creation of real object
            const circle = cg.create(Math.floor(Math.random() * 900),
                Math.floor(Math.random() * 900), 'blue');
            // Add the created object to the dom
            cg.add(circle);
        }
    });
});
//}); 
})(window, jQuery);
},{"./singlton.js":2}]},{},[3]);
